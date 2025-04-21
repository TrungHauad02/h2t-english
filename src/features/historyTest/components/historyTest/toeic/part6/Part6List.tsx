import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart6,
  SubmitToeicAnswer,
  ToeicQuestion,
  AnswerEnum,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import Part6Item from './Part6Item';

type Props = {
  questionsPart6: number[];
  startIndex: number;
  submitToeicPart6: SubmitToeicAnswer[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const Part6List: React.FC<Props> = ({
  questionsPart6,
  startIndex,
  submitToeicPart6,
  currentIndex,
}) => {
  const [groups, setGroups] = useState<ToeicPart6[]>([]);
  const [questionMap, setQuestionMap] = useState<Record<number, ToeicQuestion[]>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const part6Groups = await testService.getToeicPart6ByIds(questionsPart6);
      setGroups(part6Groups);

      const allQIds = part6Groups
        .flatMap((g) => g.questions ?? [])
        .filter((id): id is number => typeof id === 'number');

      const toeicQuestions = await testService.getToeicQuestionsByIds(allQIds);

      const qMap: Record<number, ToeicQuestion[]> = {};
      part6Groups.forEach((group) => {
        if (group.questions) {
          qMap[group.id] = toeicQuestions.filter((q) =>
            group.questions?.includes(q.id)
          );
        } else {
          qMap[group.id] = [];
        }
      });
      setQuestionMap(qMap);

      const ansMap: Record<number, AnswerEnum> = {};
      const allAnswerIds = submitToeicPart6.map((s) => s.toeicAnswerId);
      const allAnswers = await testService.getToeicAnswersByIds(allAnswerIds);

      submitToeicPart6.forEach((sub) => {
        const ans = allAnswers.find((a) => a.id === sub.toeicAnswerId);
        if (ans) {
          ansMap[sub.toeicQuestionId] = ans.content as AnswerEnum;
        }
      });
      setUserAnswers(ansMap);
    };

    fetchData();
  }, [questionsPart6, submitToeicPart6]);

  if (groups.length === 0 || Object.keys(questionMap).length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentGroup = groups[currentIndex];
  const currentQuestions = questionMap[currentGroup.id] || [];

  return (
    <Box sx={{ gap: 4, px: 2, py: 4 }}>
      <Part6Item
        key={currentGroup.id}
        questionNumberStart={startIndex + currentIndex * 4}
        file={currentGroup.file}
        questions={currentQuestions}
        selectedAnswers={userAnswers}
      />
    </Box>
  );
};

export default Part6List;
