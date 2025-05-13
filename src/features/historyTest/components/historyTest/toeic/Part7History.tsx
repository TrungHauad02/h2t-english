import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ToeicPart7, ToeicQuestion, AnswerEnum, ToeicAnswer, SubmitToeicAnswer } from 'interfaces/TestInterfaces';
import { toeicPart7Service, toeicQuestionService, submitToeicAnswerService } from 'services';
import Part7HistoryItem from './Part7HistoryItem';

type Props = {
  questionsPart7: number[];
  submitToeicId: number;
};

const Part7History: React.FC<Props> = ({ questionsPart7, submitToeicId }) => {
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const part7s = (await toeicPart7Service.getByIdsAndStatus(questionsPart7, true)).data;

        const result = await Promise.all(
          part7s.map(async (p7: ToeicPart7) => {
            const questionIds = p7.questions ?? [];
            const questions = (await toeicQuestionService.getByIdsAndStatus(questionIds, true)).data;
            return { passage: p7, questions };
          })
        );

        setData(result);

        // Extract correct answers
        const correctAnswersMap: Record<number, string> = {};
        result.forEach(group => {
          group.questions.forEach((question : ToeicQuestion) => {
            const correctAnswer = question.answers.find(a => a.correct);
            if (correctAnswer) {
              const correctIndex = question.answers.indexOf(correctAnswer);
              correctAnswersMap[question.id] = ['A', 'B', 'C', 'D'][correctIndex];
            }
          });
        });
        setCorrectAnswers(correctAnswersMap);

        // Fetch existing answers
        const allQuestionIds = part7s.flatMap((p: ToeicPart7) => p.questions ?? []);
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
  }, [questionsPart7, submitToeicId]);

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
        Part 7 - Reading Comprehension
      </Typography>
      {data.map((group, groupIndex) => {
        const questionNumberStart = 147 + data
          .slice(0, groupIndex)
          .reduce((acc, d) => acc + d.questions.length, 0);

        return (
          <Box key={group.passage.id} mb={5}>
            <Part7HistoryItem
              passageNumber={groupIndex + 1}
              passage={group.passage}
              questions={group.questions}
              questionNumberStart={questionNumberStart}
              selectedAnswers={userAnswers}
              correctAnswers={correctAnswers}
              isReview={true}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Part7History;