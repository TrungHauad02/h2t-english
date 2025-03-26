import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { testService } from '../../../services/testServices';
import { ToeicPart7, ToeicPart7Question, AnswerEnum } from 'interfaces/TestInterfaces';
import Part7Item from './Part7Item';

type Props = {
  questionsPart7: string;
  startIndex: number;
  onFinish: () => void;
};

const Part7List: React.FC<Props> = ({ questionsPart7, startIndex, onFinish }) => {
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicPart7Question[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const ids = testService.parseIds(questionsPart7);
      const part7s = await testService.getToeicPart7ByIds(ids);

      const result = await Promise.all(
        part7s.map(async (p7: ToeicPart7) => {
          const qIds = testService.parseIds(p7.questions);
          const questions = await testService.getToeicPart7QuestionsByIds(qIds);
          return { passage: p7, questions };
        })
      );

      setData(result);
    };

    fetchData();
  }, [questionsPart7]);

  if (data.length === 0) {
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
      {data.map((item, i) => (
        <Part7Item
          key={item.passage.id}
          passage={item.passage}
          questions={item.questions}
          questionNumberStart={
            startIndex + data.slice(0, i).reduce((acc, d) => acc + d.questions.length, 0)
          }
          selectedAnswers={userAnswers}
          onChange={(id, val) => setUserAnswers((prev) => ({ ...prev, [id]: val }))}
        />
      ))}
    </Box>
  );
};

export default Part7List;
