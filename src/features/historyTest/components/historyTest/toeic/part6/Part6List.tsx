import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart6,
  AnswerEnum,
  SubmitToeicPart6,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part6Item from './Part6Item';

type Props = {
  questionsPart6: number[];
  startIndex: number;
  submitToeicPart6: SubmitToeicPart6[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const Part6List: React.FC<Props> = ({
  questionsPart6,
  startIndex,
  submitToeicPart6,
  currentIndex,
}) => {
  const [questions, setQuestions] = useState<ToeicPart6[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicPart6ByIds(questionsPart6);
      setQuestions(data);

      const initialAnswers: Record<string, AnswerEnum> = {};
      submitToeicPart6.forEach((item) => {
        initialAnswers[`${item.toeicPart6Id}-1`] = item.answerQ1;
        initialAnswers[`${item.toeicPart6Id}-2`] = item.answerQ2;
        initialAnswers[`${item.toeicPart6Id}-3`] = item.answerQ3;
        initialAnswers[`${item.toeicPart6Id}-4`] = item.answerQ4;
      });
      setUserAnswers(initialAnswers);
    };

    fetchData();
  }, [questionsPart6, submitToeicPart6]);

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ gap: 4, px: 2, py: 4 }}>
      <Part6Item
        key={currentQuestion.id}
        questionNumberStart={startIndex + currentIndex * 4}
        question={currentQuestion}
        selectedAnswers={userAnswers}
      />
    </Box>
  );
};

export default Part6List;
