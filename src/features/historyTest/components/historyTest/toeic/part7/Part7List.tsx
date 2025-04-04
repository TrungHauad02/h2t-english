import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart7,
  ToeicPart7Question,
  AnswerEnum,
  SubmitToeicPart7,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part7Item from './Part7Item';

type Props = {
  questionsPart7: number[];
  startIndex: number;
  submitToeicPart7: SubmitToeicPart7[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const Part7List: React.FC<Props> = ({
  questionsPart7,
  startIndex,
  submitToeicPart7,
  currentIndex,
  setCurrentIndex,
}) => {
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicPart7Question[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const part7s = await testService.getToeicPart7ByIds(questionsPart7);

      const result = await Promise.all(
        part7s.map(async (p7) => {
          const questions = await testService.getToeicPart7QuestionsByIds(p7.questions);
          return { passage: p7, questions };
        })
      );
      setData(result);

      const answers: Record<number, AnswerEnum> = {};
      submitToeicPart7.forEach((item) => {
        answers[item.toeicPart7QuestionId] = item.answer;
      });
      setUserAnswers(answers);
    };

    fetchData();
  }, [questionsPart7, submitToeicPart7]);
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
        passage={currentGroup.passage}
        questions={currentGroup.questions}
        questionNumberStart={questionNumberStart}
        selectedAnswers={userAnswers}
      />
    </Box>
  );
};

export default Part7List;
