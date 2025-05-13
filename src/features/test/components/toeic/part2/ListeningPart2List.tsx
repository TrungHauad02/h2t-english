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
};

const ListeningPart2List: React.FC<Props> = ({ 
  questionsPart2, 
  onFinish, 
  startIndex,
  submitToeicId 
}) => {
  const [questions, setQuestions] = useState<ToeicPart2[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        // Fetch questions
        const data = await toeicPart2Service.getByIdsAndStatus(questionsPart2,true);
        setQuestions(data.data);

        // Fetch existing answers
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
      // Check if answer already exists
      const existingAnswers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Id(
        submitToeicId, 
        questionId
      );

      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        // Update existing answer
        const existingAnswer = existingAnswers.data[0];
        await submitToeicPart2Service.update(existingAnswer.id, {
          ...existingAnswer,
          answer: answer
        });
      } else {
        // Create new answer
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
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  if (loading || questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{marginTop:"1rem"}}>
      <ListeningPart2QuestionItem
        questionNumber={startIndex + currentIndex}
        audioSrc={currentQuestion?.audio}
        selectedAnswer={userAnswers[currentQuestion?.id]}
        onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
        onAudioEnded={handleAudioEnded}
      />
    </Box>
  );
};

export default ListeningPart2List;