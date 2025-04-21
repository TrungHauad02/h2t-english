import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { testService } from '../../../services/testServices';
import { ToeicPart7, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import Part7Item from './Part7Item';

type Props = {
  questionsPart7: number[];
  startIndex: number;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
  onFinish: () => void;
};

const Part7List: React.FC<Props> = ({
  questionsPart7,
  startIndex,
  currentIndex,
  setCurrentIndex,
  onFinish,
}) => {
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const part7s = await testService.getToeicPart7ByIds(questionsPart7);

      const result = await Promise.all(
        part7s.map(async (p7: ToeicPart7) => {
          const questionIds = p7.questions ?? [];
          const questions = await testService.getToeicQuestionsByIds(questionIds);
          return { passage: p7, questions };
        })
      );

      setData(result);
    };

    fetchData();
  }, [questionsPart7]);

  if (data.length === 0 || !data[currentIndex]) {
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
        onChange={(id, val) => setUserAnswers((prev) => ({ ...prev, [id]: val }))}
      />
    </Box>
  );
};

export default Part7List;
