import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { testService } from '../../../services/testServices';
import { ToeicPart5, AnswerEnum } from 'interfaces/TestInterfaces';
import Part5Item from './Part5Item';

type Props = {
  questionsPart5: string;
  startIndex: number;
  onFinish: () => void;
};

const Part5List: React.FC<Props> = ({ questionsPart5, startIndex, onFinish }) => {
  const [questions, setQuestions] = useState<ToeicPart5[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const ids = testService.parseIds(questionsPart5);
      const data = await testService.getToeicPart5ByIds(ids);
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

  return (
    <Box
      sx={{
        px: 2,
        py: 2,
        width:"90vw"
      }}
    >
      {questions.map((q, index) => (
        <Part5Item
          key={q.id}
          questionNumber={startIndex + index}
          question={q}
          selectedAnswer={userAnswers[q.id]}
          onChange={(val) =>
            setUserAnswers((prev) => ({ ...prev, [q.id]: val }))
          }
        />
      ))}
    </Box>
  );
};

export default Part5List;
