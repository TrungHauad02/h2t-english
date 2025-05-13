import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { ToeicQuestion, AnswerEnum, ToeicAnswer, SubmitToeicAnswer } from 'interfaces/TestInterfaces';
import { submitToeicAnswerService, toeicQuestionService } from 'services';
import Part5HistoryItem from './Part5HistoryItem';

type Props = {
  questionsPart5: number[];
  submitToeicId: number;
};

const Part5History: React.FC<Props> = ({ questionsPart5, submitToeicId }) => {
  const [questions, setQuestions] = useState<ToeicQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        // Fetch questions
        const questionData = await toeicQuestionService.getByIdsAndStatus(questionsPart5, true);
        setQuestions(questionData.data);
        
        // Fetch existing answers
        if (submitToeicId && questionsPart5.length > 0) {
          const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeicId, 
            questionsPart5
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: SubmitToeicAnswer) => {
              const question = questionData.data.find((q: ToeicQuestion) => q.id === answer.toeicQuestionId);
              const selectedAnswer = question?.answers?.find((a: ToeicAnswer) => a.id === answer.toeicAnswerId);
              if (selectedAnswer && question) {
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

    fetchQuestionsAndAnswers();
  }, [questionsPart5, submitToeicId]);

  if (loading || questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Part 5 - Grammar
      </Typography>
      <Grid container spacing={3}>
        {questions.map((question, index) => (
          <Grid item xs={12} key={question.id}>
            <Part5HistoryItem
              questionNumber={101 + index}
              question={question}
              selectedAnswer={userAnswers[question.id]}
              isReview={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Part5History;