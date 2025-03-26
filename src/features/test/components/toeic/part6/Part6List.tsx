import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart6, AnswerEnum } from 'interfaces/TestInterfaces';
import { testService } from '../../../services/testServices';
import Part6Item from './Part6Item';

type Props = {
  questionsPart6: string;
  startIndex: number;
  onFinish: () => void;
};

const Part6List: React.FC<Props> = ({ questionsPart6, startIndex, onFinish }) => {
  const [questions, setQuestions] = useState<ToeicPart6[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const ids = testService.parseIds(questionsPart6);
      const data = await testService.getToeicPart6ByIds(ids);
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

  return (
    <Box
      sx={{
   
        gap: 4,
        px: 2,
        py: 4,
      
      }}
    >
      {questions.map((q, index) => (
        <Part6Item
          key={q.id}
          questionNumberStart={startIndex + index * 4}
          question={q}
          selectedAnswers={userAnswers}
          onChange={(key, val) =>
            setUserAnswers((prev) => ({ ...prev, [key]: val }))
          }
        />
      ))}
    </Box>
  );
};

export default Part6List;
