import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart1, AnswerEnum } from 'interfaces/TestInterfaces';
import ListeningPart1QuestionItem from './ListeningPart1QuestionItem';
import { submitToeicPart1Service,toeicPart1Service } from 'services';

type Props = {
  questionsPart1: number[];
  startIndex: number;
  onFinish: () => void;
  submitToeicId: number;
};

const ListeningPart1List: React.FC<Props> = ({ 
  questionsPart1, 
  startIndex, 
  onFinish,
  submitToeicId 
}) => {
  const [questions, setQuestions] = useState<ToeicPart1[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        console.log(questionsPart1);
        
        // Fetch questions
        const questionData = await toeicPart1Service.getByIdsAndStatus(questionsPart1,true);
        setQuestions(questionData.data);
        console.log(questionData.data);
        
        // Fetch existing answers
        if (submitToeicId && questionsPart1.length > 0) {
          const existingAnswers = await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
            submitToeicId, 
            questionsPart1
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: any) => {
              answersMap[answer.toeicPart1Id] = answer.answer;
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
  }, [questionsPart1, submitToeicId]);

  const handleAnswerChange = async (questionId: number, answer: AnswerEnum) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    try {
      // Check if answer already exists
      const existingAnswers = await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Id(
        submitToeicId, 
        questionId
      );

      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        // Update existing answer
        const existingAnswer = existingAnswers.data[0];
        await submitToeicPart1Service.update(existingAnswer.id, {
          ...existingAnswer,
          answer: answer
        });
      } else {
        // Create new answer
        await submitToeicPart1Service.create({
          id: Date.now(),
          submitToeicId: submitToeicId,
          toeicPart1Id: questionId,
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
    <ListeningPart1QuestionItem
      questionNumber={startIndex + currentIndex}
      imageSrc={currentQuestion?.image}
      audioSrc={currentQuestion?.audio}
      selectedAnswer={userAnswers[currentQuestion?.id]}
      onChange={(val) => handleAnswerChange(currentQuestion?.id, val)}
      onAudioEnded={handleAudioEnded}
    />
  );
};

export default ListeningPart1List;