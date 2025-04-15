import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { testService } from '../../../services/testServices';
import { ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import Part5Item from './Part5Item';

type Props = {
  questionsPart5: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
};

const Part5List: React.FC<Props> = ({
  questionsPart5,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
}) => {
  const [questions, setQuestions] = useState<ToeicQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicQuestionsByIds(questionsPart5);
      setQuestions(data);
    };
    fetchData();
  }, [questionsPart5]);

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
        onChange={(val) =>
          setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
        }
      />
    </Box>
  );
};

export default Part5List;
