import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart5,
  AnswerEnum,
  SubmitToeicPart5,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part5Item from './Part5Item';

type Props = {
  questionsPart5: number[];
  startIndex: number;
  submitToeicPart5: SubmitToeicPart5[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const Part5List: React.FC<Props> = ({
  questionsPart5,
  startIndex,
  submitToeicPart5,
  currentIndex,
}) => {
  const [questions, setQuestions] = useState<ToeicPart5[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicPart5ByIds(questionsPart5);
      setQuestions(data);

      const initialAnswers: Record<number, AnswerEnum> = {};
      submitToeicPart5.forEach((item) => {
        initialAnswers[item.toeicPart5Id] = item.answer;
      });
      setUserAnswers(initialAnswers);
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
    <Box
      sx={{
        px: 2,
        py: 2,
        width: '90vw',
      }}
    >
      <Part5Item
        key={currentQuestion.id}
        questionNumber={startIndex + currentIndex}
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestion.id]}
      />
    </Box>
  );
};

export default Part5List;
