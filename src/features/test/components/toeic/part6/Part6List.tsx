import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart6, ToeicQuestion, AnswerEnum, ToeicAnswer } from 'interfaces/TestInterfaces';
import { toeicPart6Service, submitToeicAnswerService, toeicQuestionService } from 'services';
import Part6Item from './Part6Item';

type Props = {
  questionsPart6: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
  submitToeicId: number;
};

const Part6List: React.FC<Props> = ({
  questionsPart6,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
  submitToeicId
}) => {
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
            existingAnswers.data.forEach((answer: any) => {
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
  }, [questionsPart6, submitToeicId]);

  const handleAnswerChange = async (questionId: number, answer: AnswerEnum) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    try {
      const allQuestions = data.flatMap(d => d.questions);
      const question = allQuestions.find(q => q.id === questionId);
      
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

  if (loading || data.length === 0 || !data[currentIndex]) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentGroup = data[currentIndex];
  const questionNumberStart = startIndex + data
    .slice(0, currentIndex)
    .reduce((acc, d) => acc + d.questions.length, 0);

  return (
    <Box sx={{ gap: 4, px: 2, py: 4,   width: '100%', }}>
      <Part6Item
        key={currentGroup.passage.id}
        questionNumberStart={questionNumberStart}
        passage={currentGroup.passage}
        questions={currentGroup.questions}
        selectedAnswers={userAnswers}
        onChange={handleAnswerChange}
      />
    </Box>
  );
};

export default Part6List;