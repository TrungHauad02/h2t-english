import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart3_4, AnswerEnum, ToeicQuestion, ToeicAnswer } from 'interfaces/TestInterfaces';
import { toeicPart3_4Service, submitToeicAnswerService, toeicQuestionService } from 'services';
import ListeningPart3And4Item from './ListeningPart3And4Item';

interface ListeningPartProps {
  questions: number[];
  startIndex: number;
  onFinish: () => void;
  submitToeicId: number;
  initialIndex?: number;
  volume?: number;
}

const ListeningPartList: React.FC<ListeningPartProps> = ({
  questions,
  startIndex,
  onFinish,
  submitToeicId,
  initialIndex = 0,
  volume = 0.5,
}) => {
  const [questionsList, setQuestionsList] = useState<ToeicPart3_4[]>([]);
  const [questionMap, setQuestionMap] = useState<Record<number, ToeicQuestion[]>>({});
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    if (initialIndex > 0) {
      setShouldAutoPlay(true);
      setHasStartedPlaying(true);
    }
  }, [initialIndex]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const partData = (await toeicPart3_4Service.getByIdsAndStatus(questions, true)).data;
        setQuestionsList(partData);

        const allQuestionIds = partData
          .flatMap((part: ToeicPart3_4) => part.questions ?? [])
          .filter((id: number): id is number => typeof id === 'number');

        const questionsData = (await toeicQuestionService.getByIdsAndStatus(allQuestionIds, true)).data;

        console.log(questionsData);
        
        const map: Record<number, ToeicQuestion[]> = {};
        partData.forEach((part: ToeicPart3_4) => {
          map[part.id] = questionsData.filter((q: ToeicQuestion) => part.questions?.includes(q.id));
        });
        
        setQuestionMap(map);

        if (submitToeicId && allQuestionIds.length > 0) {
          const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeicId,
            allQuestionIds
          );
        
          const answersMap: Record<string, AnswerEnum> = {};
        
          if (existingAnswers?.data) {
            existingAnswers.data.forEach((answer: any) => {
              const question = questionsData.find((q: ToeicQuestion) => q.id === answer.toeicQuestionId);
        
              if (question && Array.isArray(question.answers)) {
                const answerIndex = question.answers.findIndex(
                  (a: ToeicAnswer) => a.id === answer.toeicAnswerId
                );
        
                if (answerIndex !== -1) {
                  const answerLetter = ['A', 'B', 'C', 'D'][answerIndex] as AnswerEnum;
                  answersMap[`${answer.toeicQuestionId}`] = answerLetter;
                }
              }
            });
          }
        
          setUserAnswers(answersMap);
        }
        
      } catch (error) {
        console.error("Error fetching questions and answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questions, submitToeicId]);

  const handleAnswerChange = async (questionKey: string, answer: AnswerEnum) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionKey]: answer
    }));

    const questionId = parseInt(questionKey);
    
    try {
      const currentQuestions = Object.values(questionMap).flat();
      const question = currentQuestions.find(q => q.id === questionId);
    
      if (!question || !question.answers) return;

      const answerIndex = ['A', 'B', 'C', 'D'].indexOf(answer);
      const selectedAnswer = question.answers[answerIndex];
      
      if (!selectedAnswer) return;

      const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionId(
        submitToeicId,
        questionId
      );

      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        const existingAnswer = existingAnswers.data[0];
        await submitToeicAnswerService.update(existingAnswer.id, {
          ...existingAnswer,
          toeicAnswerId: selectedAnswer.id
        });
      } else {
        await submitToeicAnswerService.create({
          id: Date.now(),
          submitToeicId: submitToeicId,
          toeicQuestionId: questionId,
          toeicAnswerId: selectedAnswer.id,
          status: true,
        });
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const handleAudioEnded = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShouldAutoPlay(true);
    } else {
      onFinish();
    }
  };

  const handleAudioStarted = () => {
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true);
      setShouldAutoPlay(true);
    }
  };

  const currentPart = questionsList[currentIndex];
  const currentQuestions = currentPart?.id ? questionMap[currentPart.id] ?? [] : [];

  if (loading || questionsList.length === 0 || currentQuestions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <ListeningPart3And4Item
        questionNumberStart={startIndex + currentIndex * 3}
        questions={currentQuestions}
        audio={currentPart.audio}
        selectedAnswers={userAnswers}
        onChange={handleAnswerChange}
        onAudioEnded={handleAudioEnded}
        onAudioStarted={handleAudioStarted}
        autoPlay={shouldAutoPlay}
        volume={volume}
      />
    </Box>
  );
};

export default ListeningPartList;