import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart3_4, AnswerEnum } from 'interfaces/TestInterfaces';
import { testService } from '../../../services/testServices';
import ListeningPart3And4Item from './ListeningPart3And4Item';

interface ListeningPartProps {
  questions: string;
  startIndex: number;
  onFinish: () => void;
}

const ListeningPartList: React.FC<ListeningPartProps> = ({
  questions,
  startIndex,
  onFinish
}) => {
  const [questionsList, setQuestionsList] = useState<ToeicPart3_4[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const ids = testService.parseIds(questions);
      const data = await testService.getToeicPart3_4ByIds(ids);
      setQuestionsList(data);
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

  if (questionsList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questionsList[currentIndex];

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <ListeningPart3And4Item
        questionNumberStart={startIndex + currentIndex * 3}
        data={currentQuestion}
        selectedAnswers={userAnswers}
        onChange={(key, val) => setUserAnswers((prev) => ({ ...prev, [key]: val }))}
        onAudioEnded={handleAudioEnded}
      />
    </Box>
  );
};

export default ListeningPartList;
