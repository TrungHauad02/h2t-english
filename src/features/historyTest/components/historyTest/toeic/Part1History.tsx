import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { ToeicPart1, AnswerEnum, SubmitToeicPart1 } from 'interfaces/TestInterfaces';
import { submitToeicPart1Service, toeicPart1Service } from 'services';
import ListeningPart1HistoryItem from './ListeningPart1HistoryItem';

type Props = {
  questionsPart1: number[];
  submitToeicId: number;
};

const Part1History: React.FC<Props> = ({ questionsPart1, submitToeicId }) => {
  const [questions, setQuestions] = useState<ToeicPart1[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        // Fetch questions
        const questionData = await toeicPart1Service.getByIdsAndStatus(questionsPart1, true);
        setQuestions(questionData.data);
        
        // Fetch existing answers
        if (submitToeicId && questionsPart1.length > 0) {
          const existingAnswers = await submitToeicPart1Service.findBySubmitToeicIdAndToeicPart1Ids(
            submitToeicId, 
            questionsPart1
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: SubmitToeicPart1) => {
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
        Part 1 - Picture Description
      </Typography>
      <Grid container spacing={3}>
        {questions.map((question, index) => (
          <Grid item xs={12} key={question.id}>
            <ListeningPart1HistoryItem
              questionNumber={index + 1}
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

export default Part1History;