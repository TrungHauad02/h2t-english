import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart3_4, AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';
import { testService } from '../../../services/testServices';
import ListeningPart3And4Item from './ListeningPart3And4Item';

interface ListeningPartProps {
  questions: number[];
  startIndex: number;
  onFinish: () => void;
}

const ListeningPartList: React.FC<ListeningPartProps> = ({
  questions,
  startIndex,
  onFinish
}) => {
  const [questionsList, setQuestionsList] = useState<ToeicPart3_4[]>([]);
  const [questionMap, setQuestionMap] = useState<Record<number, ToeicQuestion[]>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const partData = await testService.getToeicPart3_4ByIds(questions);
      setQuestionsList(partData);

      const allQuestionIds = partData
        .flatMap((part) => part.questions ?? [])
        .filter((id): id is number => typeof id === 'number');

      const questionsData = await testService.getToeicQuestionsByIds(allQuestionIds);

      const map: Record<number, ToeicQuestion[]> = {};
      partData.forEach((part) => {
        map[part.id] = questionsData.filter((q) => part.questions?.includes(q.id));
      });

      setQuestionMap(map);
    };

    fetchData();
  }, [questions]);

  const handleAudioEnded = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const currentPart = questionsList[currentIndex];
  const currentQuestions = currentPart?.id ? questionMap[currentPart.id] ?? [] : [];

  if (questionsList.length === 0 || currentQuestions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <ListeningPart3And4Item
        questionNumberStart={startIndex + currentIndex * 3}
        questions={currentQuestions}
        audio={currentPart.audio}
        selectedAnswers={userAnswers}
        onChange={(key, val) => setUserAnswers((prev) => ({ ...prev, [key]: val }))}
        onAudioEnded={handleAudioEnded}
      />
    </Box>
  );
};

export default ListeningPartList;
