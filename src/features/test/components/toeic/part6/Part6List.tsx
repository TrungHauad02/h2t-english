import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart6, AnswerEnum } from 'interfaces/TestInterfaces';
import { testService } from '../../../services/testServices';
import Part6Item from './Part6Item';

type Props = {
  questionsPart6: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
};

const Part6List: React.FC<Props> = ({
  questionsPart6,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
}) => {
  const [questions, setQuestions] = useState<ToeicPart6[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicPart6ByIds(questionsPart6);
      setQuestions(data);
    };
    fetchData();
  }, [questionsPart6]);

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
        onChange={(key, val) =>
          setUserAnswers((prev) => ({ ...prev, [key]: val }))
        }
      />
    </Box>
  );
};

export default Part6List;
