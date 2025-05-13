import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { ToeicPart2, AnswerEnum, SubmitToeicPart2 } from 'interfaces/TestInterfaces';
import { submitToeicPart2Service, toeicPart2Service } from 'services';
import ListeningPart2HistoryItem from './ListeningPart2HistoryItem';

type Props = {
  questionsPart2: number[];
  submitToeicId: number;
};

const Part2History: React.FC<Props> = ({ questionsPart2, submitToeicId }) => {
  const [questions, setQuestions] = useState<ToeicPart2[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      setLoading(true);
      try {
        // Fetch questions
        const questionData = await toeicPart2Service.getByIdsAndStatus(questionsPart2, true);
        setQuestions(questionData.data);
        
        // Fetch existing answers
        if (submitToeicId && questionsPart2.length > 0) {
          const existingAnswers = await submitToeicPart2Service.findBySubmitToeicIdAndToeicPart2Ids(
            submitToeicId, 
            questionsPart2
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: SubmitToeicPart2) => {
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
        Part 2 - Question Response
      </Typography>
      <Grid container spacing={3}>
        {questions.map((question, index) => (
          <Grid item xs={12} md={6} key={question.id}>
            <ListeningPart2HistoryItem
              questionNumber={7 + index} // Part 2 starts from question 7
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

export default Part2History;