import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  ToeicPart1,
  AnswerEnum,
  SubmitToeicPart1
} from 'interfaces/TestInterfaces';
import ListeningPart1QuestionItem from './ListeningPart1QuestionItem';
import { testService } from '../../../../../test/services/testServices';




type Props = {
  questionsPart1: number[];
  startIndex: number;
  submitToeicPart1: SubmitToeicPart1[];
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const ListeningPart1List: React.FC<Props> = ({
  questionsPart1,
  startIndex,
  submitToeicPart1,
  currentIndex,
}) => {
  const [questions, setQuestions] = useState<ToeicPart1[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await testService.getToeicPart1ByIds(questionsPart1);

      setQuestions(data);

      const initialAnswers: Record<number, AnswerEnum> = {};
      submitToeicPart1.forEach((item) => {
        initialAnswers[item.toeicPart1Id] = item.answer;
      });
      setUserAnswers(initialAnswers);
    };

    fetchQuestions();
  }, [questionsPart1, submitToeicPart1]);

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  return (
    <ListeningPart1QuestionItem
    questionNumber={startIndex + currentIndex}
    imageSrc={currentQuestion.image}
    audioSrc={currentQuestion.audio}
    selectedAnswer={userAnswers[currentQuestion.id]}
    correctAnswer={correctAnswer}
    script = {currentQuestion.transcript}
  />
  );
};

export default ListeningPart1List;
