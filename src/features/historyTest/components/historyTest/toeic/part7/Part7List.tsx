import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart7,
  ToeicQuestion,
  SubmitToeicAnswer,
  AnswerEnum,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part7Item from './Part7Item';

type Props = {
  questionsPart7: number[];
  startIndex: number;
  submitToeicPart7: SubmitToeicAnswer[];
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
  const [data, setData] = useState<{ passage: ToeicPart7; questions: ToeicQuestion[] }[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const passages = await testService.getToeicPart7ByIds(questionsPart7);

      const allQuestionIds = passages
        .flatMap((p) => p.questions ?? [])
        .filter((id): id is number => typeof id === 'number');

      const questions = await testService.getToeicQuestionsByIds(allQuestionIds);

      const grouped = passages.map((p) => ({
        passage: p,
        questions: p.questions
          ? questions.filter((q) => p.questions?.includes(q.id))
          : [],
      }));

      setData(grouped);

      const answerIds = submitToeicPart7.map((a) => a.toeicAnswerId);
      const answers = await testService.getToeicAnswersByIds(answerIds);

      const map: Record<number, AnswerEnum> = {};
      submitToeicPart7.forEach((sub) => {
        const ans = answers.find((a) => a.id === sub.toeicAnswerId);
        if (ans) {
          map[sub.toeicQuestionId] = ans.content as AnswerEnum;
        }
      });
      setUserAnswers(map);
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
