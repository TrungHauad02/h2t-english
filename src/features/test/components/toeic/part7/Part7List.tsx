import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { toeicPart7Service,toeicQuestionService ,submitToeicAnswerService } from 'services';
import { ToeicPart7, ToeicQuestion, AnswerEnum, ToeicAnswer } from 'interfaces/TestInterfaces';
import Part7Item from './Part7Item';

type Props = {
  questionsPart7: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
  submitToeicId: number;
};

const Part7List: React.FC<Props> = ({
  questionsPart7,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
  submitToeicId
}) => {
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const part7s = (await toeicPart7Service.getByIdsAndStatus(questionsPart7,true)).data;

        const result = await Promise.all(
          part7s.map(async (p7: ToeicPart7) => {
            const questionIds = p7.questions ?? [];
            const questions = (await toeicQuestionService.getByIdsAndStatus(questionIds,true)).data;
            return { passage: p7, questions };
          })
        );

        setData(result);

        // Fetch existing answers
        const allQuestionIds = part7s.flatMap((p : ToeicPart7) => p.questions ?? []);
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
  }, [questionsPart7, submitToeicId]);

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
    <Box sx={{ gap: 4, px: 2, py: 4 }}>
      <Part7Item
        key={currentGroup.passage.id}
        passage={currentGroup.passage}
        questions={currentGroup.questions}
        questionNumberStart={questionNumberStart}
        selectedAnswers={userAnswers}
        onChange={handleAnswerChange}
      />
    </Box>
  );
};

export default Part7List;