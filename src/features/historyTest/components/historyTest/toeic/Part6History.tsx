import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ToeicPart6, ToeicQuestion, AnswerEnum, ToeicAnswer, SubmitToeicAnswer } from 'interfaces/TestInterfaces';
import { toeicPart6Service, submitToeicAnswerService, toeicQuestionService } from 'services';
import Part6HistoryItem from './Part6HistoryItem';

type Props = {
  questionsPart6: number[];
  submitToeicId: number;
};

const Part6History: React.FC<Props> = ({ questionsPart6, submitToeicId }) => {
  const [data, setData] = useState<{ passage: ToeicPart6; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const part6s = (await toeicPart6Service.getByIdsAndStatus(questionsPart6, true)).data;

        const result = await Promise.all(
          part6s.map(async (p6: ToeicPart6) => {
            const questionIds = p6.questions ?? [];
            const questions = (await toeicQuestionService.getByIdsAndStatus(questionIds, true)).data;
            return { passage: p6, questions };
          })
        );

        setData(result);

        // Fetch existing answers
        const allQuestionIds = part6s.flatMap((p: ToeicPart6) => p.questions ?? []);
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

    fetchData();
  }, [questionsPart6, submitToeicId]);

  if (loading || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Part 6 - Text Completion
      </Typography>
      {data.map((group, groupIndex) => {
        const questionNumberStart = 131 + data
          .slice(0, groupIndex)
          .reduce((acc, d) => acc + d.questions.length, 0);

        return (
          <Box key={group.passage.id} mb={5}>
            <Part6HistoryItem
              passage={group.passage}
              questions={group.questions}
              questionNumberStart={questionNumberStart}
              selectedAnswers={userAnswers}
              isReview={true}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Part6History;