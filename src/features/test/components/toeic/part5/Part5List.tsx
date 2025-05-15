import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { toeicQuestionService, submitToeicAnswerService } from 'services';
import { ToeicQuestion, AnswerEnum,ToeicAnswer } from 'interfaces/TestInterfaces';
import Part5Item from './Part5Item';

type Props = {
  questionsPart5: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
  submitToeicId: number;
};

const Part5List: React.FC<Props> = ({
  questionsPart5,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
  submitToeicId
}) => {
  const [questions, setQuestions] = useState<ToeicQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = (await toeicQuestionService.getByIdsAndStatus(questionsPart5,true)).data;
        setQuestions(data);

        // Fetch existing answers
        if (submitToeicId && questionsPart5.length > 0) {
          const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeicId,
            questionsPart5
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: any) => {
              const question = data.find((q: ToeicQuestion) => q.id === answer.toeicQuestionId);
              const selectedAnswer = question?.answers?.find((a:ToeicAnswer) => a.id === answer.toeicAnswerId);
              if (selectedAnswer) {
                const answerLetter = ['A', 'B', 'C', 'D'][question.answers.indexOf(selectedAnswer)] as AnswerEnum;
                answersMap[answer.toeicQuestionId] = answerLetter;
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
  }, [questionsPart5, submitToeicId]);

  const handleAnswerChange = async (questionId: number, answer: AnswerEnum) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    try {
      const question = questions.find(q => q.id === questionId);
      if (!question || !question.answers) return;

      const answerIndex = ['A', 'B', 'C', 'D'].indexOf(answer);
      const selectedAnswer = question.answers[answerIndex];
      
      if (!selectedAnswer) return;

      // Check if answer already exists
      const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionId(
        submitToeicId,
        questionId
      );

      if (existingAnswers && existingAnswers.data && existingAnswers.data.length > 0) {
        // Update existing answer
        const existingAnswer = existingAnswers.data[0];
        await submitToeicAnswerService.update(existingAnswer.id, {
          ...existingAnswer,
          toeicAnswerId: selectedAnswer.id
        });
      } else {
        // Create new answer
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

  if (loading || questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box >
      <Part5Item
        questionNumber={startIndex + currentIndex}
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestion.id]}
        onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
      />
    </Box>
  );
};

export default Part5List;