import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart3_4,
  AnswerEnum,
  SubmitToeicPart3_4
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import ListeningPart3And4Item from './ListeningPart3And4Item';

interface ListeningPartProps {
  questions: number[];
  startIndex: number;
  submitToeicPart3_4: SubmitToeicPart3_4[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
}

const ListeningPart3And4List: React.FC<ListeningPartProps> = ({
  questions,
  startIndex,
  submitToeicPart3_4,
  currentIndex,
}) => {
  const [questionsList, setQuestionsList] = useState<ToeicPart3_4[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicPart3_4ByIds(questions);
      setQuestionsList(data);

      const initialAnswers: Record<string, AnswerEnum> = {};
      submitToeicPart3_4.forEach((item) => {
        initialAnswers[`${item.toeicPart3_4Id}-1`] = item.answerQ1;
        initialAnswers[`${item.toeicPart3_4Id}-2`] = item.answerQ2;
        initialAnswers[`${item.toeicPart3_4Id}-3`] = item.answerQ3;
      });
      setUserAnswers(initialAnswers);
    };

    fetchData();
  }, [questions, submitToeicPart3_4]);

  if (questionsList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentGroup = questionsList[currentIndex];

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <ListeningPart3And4Item
        questionNumberStart={startIndex + currentIndex * 3}
        data={currentGroup}
        selectedAnswers={userAnswers}
      />
    </Box>
  );
};

export default ListeningPart3And4List;
