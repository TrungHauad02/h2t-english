import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ToeicPart3_4, ToeicQuestion, AnswerEnum, ToeicAnswer, SubmitToeicAnswer } from 'interfaces/TestInterfaces';
import { toeicPart3_4Service, submitToeicAnswerService, toeicQuestionService } from 'services';
import ListeningPart3And4HistoryItem from './ListeningPart3And4HistoryItem';

type Props = {
  questions: number[];
  submitToeicId: number;
  partNumber: 3 | 4;
};

const Part3And4History: React.FC<Props> = ({ questions, submitToeicId, partNumber }) => {
  const [data, setData] = useState<{ part: ToeicPart3_4; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const partData = (await toeicPart3_4Service.getByIdsAndStatus(questions, true)).data;
        
        const result = await Promise.all(
          partData.map(async (part: ToeicPart3_4) => {
            const questionIds = part.questions ?? [];
            const questions = (await toeicQuestionService.getByIdsAndStatus(questionIds, true)).data;
            return { part, questions };
          })
        );

        setData(result);

        // Fetch existing answers
        const allQuestionIds = partData.flatMap((p: ToeicPart3_4) => p.questions ?? []);
        if (submitToeicId && allQuestionIds.length > 0) {
          const existingAnswers = await submitToeicAnswerService.findBySubmitToeicIdAndQuestionIds(
            submitToeicId,
            allQuestionIds
          );

          const answersMap: Record<number, AnswerEnum> = {};
          if (existingAnswers && existingAnswers.data) {
            existingAnswers.data.forEach((answer: SubmitToeicAnswer) => {
              const allQuestions = result.flatMap(r => r.questions);
              const question = allQuestions.find(q => q.id === answer.toeicQuestionId);
              const selectedAnswer = question?.answers?.find((a: ToeicAnswer) => a.id === answer.toeicAnswerId);
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
  }, [questions, submitToeicId]);

  if (loading || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const startIndex = partNumber === 3 ? 32 : 71;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Part {partNumber} - {partNumber === 3 ? 'Short Conversations' : 'Short Talks'}
      </Typography>
      
      {data.map((item, index) => (
        <Box key={item.part.id} mb={4}>
          <ListeningPart3And4HistoryItem
            partData={item.part}
            questions={item.questions}
            questionNumberStart={startIndex + index * 3}
            userAnswers={userAnswers}
            isReview={true}
            partNumber={partNumber}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Part3And4History;