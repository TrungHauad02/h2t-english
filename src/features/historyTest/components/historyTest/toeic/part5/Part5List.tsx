import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicQuestion,
  SubmitToeicAnswer,
  AnswerEnum,
  ToeicAnswer,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part5Item from './Part5Item';

type Props = {
  questionsPart5: number[];
  startIndex: number;
  submitToeicPart5: SubmitToeicAnswer[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const Part5List: React.FC<Props> = ({
  questionsPart5,
  startIndex,
  submitToeicPart5,
  currentIndex,
}) => {
  const [questions, setQuestions] = useState<ToeicQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicQuestionsByIds(questionsPart5);
      setQuestions(data);

      const answerMap: Record<number, AnswerEnum> = {};
      submitToeicPart5.forEach((a) => {
        const question = data.find((q) => q.id === a.toeicQuestionId);
        const answer = question?.answers.find((ans) => ans.id === a.toeicAnswerId);
        if (answer) {
          answerMap[a.toeicQuestionId] = answer.content as AnswerEnum;
        }
      });

      setUserAnswers(answerMap);
    };

    fetchData();
  }, [questionsPart5, submitToeicPart5]);

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ px: 2, py: 2, width: '90vw' }}>
      <Part5Item
        questionNumber={startIndex + currentIndex}
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestion.id]}
      />
    </Box>
  );
};

export default Part5List;
