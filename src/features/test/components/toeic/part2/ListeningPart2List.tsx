import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart2, AnswerEnum } from 'interfaces/TestInterfaces';
import { toeicPart2Service, submitToeicPart2Service } from 'services';
import ListeningPart2QuestionItem from './ListeningPart2QuestionItem';

type Props = {
  questionsPart2: number[];
  onFinish: () => void;
  startIndex: number;
  submitToeicId: number;
  initialIndex?: number;
  volume?: number;
  manualControl?: boolean;
  onIndexChange?: (index: number) => void;
};

const ListeningPart2List: React.FC<Props> = ({
  questionsPart2,
  onFinish,
  startIndex,
  submitToeicId,
  initialIndex = 0,
  volume = 0.5,
  manualControl = false,
  onIndexChange,
}) => {
  const [questions, setQuestions] = useState<ToeicPart2[]>([]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    if (initialIndex > 0) {
      setShouldAutoPlay(true);
      setHasStartedPlaying(true);
    }
  }, [initialIndex, manualControl]);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        const data = await toeicPart2Service.getByIdsAndStatus(questionsPart2, true);
        setQuestions(data.data);

        if (submitToeicId && questionsPart2.length > 0) {
          const existingAnswers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Ids(
            submitToeicId,
            questionsPart2
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: any) => {
              answersMap[answer.toeicPart2Id] = answer.answer;
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

    fetchQuestionsAndAnswers();
  }, [questionsPart2, submitToeicId]);

  const handleAnswerChange = async (questionId: number, answer: AnswerEnum) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    try {
      const existingAnswers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Id(
        submitToeicId,
        questionId
      );

      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        const existingAnswer = existingAnswers.data[0];
        await submitToeicPart2Service.update(existingAnswer.id, {
          ...existingAnswer,
          answer: answer
        });
      } else {
        await submitToeicPart2Service.create({
          id: Date.now(),
          submitToeicId: submitToeicId,
          toeicPart2Id: questionId,
          answer: answer,
          status: true,
        });
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const handleAudioEnded = () => {
    // Always auto-advance to next question when audio ends, regardless of manual control
    if (currentIndex < questions.length - 1) {
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

  // Update parent component when index changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  if (loading || questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <ListeningPart2QuestionItem
        questionNumber={startIndex + currentIndex}
        audioSrc={currentQuestion?.audio}
        selectedAnswer={userAnswers[currentQuestion?.id]}
        onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
        onAudioEnded={handleAudioEnded}
        onAudioStarted={handleAudioStarted}
        autoPlay={shouldAutoPlay}
        volume={volume}
      />
    </Box>
  );
};

export default ListeningPart2List;