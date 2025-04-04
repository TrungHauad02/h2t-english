import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart2,
  AnswerEnum,
  SubmitToeicPart2,
} from 'interfaces/TestInterfaces';
import { testService } from '../../../../../test/services/testServices';
import ListeningPart2QuestionItem from './ListeningPart2QuestionItem';

type Props = {
  questionsPart2: number[];
  startIndex: number;
  submitToeicPart2: SubmitToeicPart2[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const ListeningPart2List: React.FC<Props> = ({
  questionsPart2,
  startIndex,
  submitToeicPart2,
  currentIndex,
}) => {
  const [questions, setQuestions] = useState<ToeicPart2[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await testService.getToeicPart2ByIds(questionsPart2);
      setQuestions(data);

      const initialAnswers: Record<number, AnswerEnum> = {};
      submitToeicPart2.forEach((item) => {
        initialAnswers[item.toeicPart2Id] = item.answer;
      });
      setUserAnswers(initialAnswers);
    };
    fetchData();
  }, [questionsPart2, submitToeicPart2]);

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ mt: 2 }}>
      <ListeningPart2QuestionItem
        questionNumber={startIndex + currentIndex}
        audioSrc={currentQuestion.audio}
        script={currentQuestion.transcript}
        selectedAnswer={userAnswers[currentQuestion.id]}
        correctAnswer={currentQuestion.correctAnswer}
      />
    </Box>
  );
};

export default ListeningPart2List;
