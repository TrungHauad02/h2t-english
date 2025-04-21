import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart3_4,
  AnswerEnum,
  SubmitToeicAnswer,
  ToeicQuestion,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import ListeningPart3And4Item from './ListeningPart3And4Item';

interface ListeningPartProps {
  questions: number[];
  startIndex: number;
  submitToeicPart3_4: SubmitToeicAnswer[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
}

const ListeningPart3And4List: React.FC<ListeningPartProps> = ({
  questions,
  startIndex,
  submitToeicPart3_4,
  currentIndex,
}) => {
  const [groupList, setGroupList] = useState<ToeicPart3_4[]>([]);
  const [questionMap, setQuestionMap] = useState<Record<number, ToeicQuestion[]>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const groups = await testService.getToeicPart3_4ByIds(questions);
      setGroupList(groups);

      // Ensure all question IDs are defined numbers
      const allQuestionIds = groups
        .flatMap((g) => g.questions ?? [])
        .filter((id): id is number => typeof id === 'number');

      const allQuestions = await testService.getToeicQuestionsByIds(allQuestionIds);

      const grouped: Record<number, ToeicQuestion[]> = {};
      groups.forEach((group) => {
        if (group.questions) {
          grouped[group.id] = allQuestions.filter((q) =>
            group.questions?.includes(q.id)
          );
        } else {
          grouped[group.id] = [];
        }
      });
      setQuestionMap(grouped);

      const allAnswers = await testService.getToeicAnswersByIds(
        submitToeicPart3_4.map((a) => a.toeicAnswerId)
      );

      const answerMap: Record<number, AnswerEnum> = {};
      submitToeicPart3_4.forEach((a) => {
        const ans = allAnswers.find((ans) => ans.id === a.toeicAnswerId);
        if (ans) {
          answerMap[a.toeicQuestionId] = ans.content as AnswerEnum;
        }
      });
      setUserAnswers(answerMap);
    };

    fetchData();
  }, [questions, submitToeicPart3_4]);

  if (groupList.length === 0 || Object.keys(questionMap).length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentGroup = groupList[currentIndex];
  const currentQuestions = questionMap[currentGroup.id] || [];

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <ListeningPart3And4Item
        questionNumberStart={startIndex + currentIndex * 3}
        audio={currentGroup.audio}
        transcript={currentGroup.transcript}
        questions={currentQuestions}
        selectedAnswers={userAnswers}
      />
    </Box>
  );
};

export default ListeningPart3And4List;
