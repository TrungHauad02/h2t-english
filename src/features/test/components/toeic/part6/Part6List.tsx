import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart6, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
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
  const [passages, setPassages] = useState<ToeicPart6[]>([]);
  const [questionsMap, setQuestionsMap] = useState<Record<number, ToeicQuestion[]>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const passages = await testService.getToeicPart6ByIds(questionsPart6);
      setPassages(passages);

      const questionData = await Promise.all(
        passages.map((p) => testService.getToeicQuestionsByIds(p.questions ?? []))
      );

      const map: Record<number, ToeicQuestion[]> = {};
      passages.forEach((p, i) => {
        map[p.id] = questionData[i] ?? [];
      });
      setQuestionsMap(map);
    };

    fetchData();
  }, [questionsPart6]);

  if (passages.length === 0 || !passages[currentIndex]) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentPassage = passages[currentIndex];
  const currentQuestions = questionsMap[currentPassage.id] || [];

  return (
    <Box sx={{ gap: 4, px: 2, py: 4 }}>
      <Part6Item
        key={currentPassage.id}
        questionNumberStart={startIndex + currentIndex * 4}
        passage={currentPassage}
        questions={currentQuestions}
        selectedAnswers={userAnswers}
        onChange={(id, val) => setUserAnswers((prev) => ({ ...prev, [id]: val }))}
      />
    </Box>
  );
};

export default Part6List;
