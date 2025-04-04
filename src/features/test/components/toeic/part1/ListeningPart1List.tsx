import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart1, AnswerEnum } from 'interfaces/TestInterfaces';
import ListeningPart1QuestionItem from './ListeningPart1QuestionItem';
import { testService } from '../../../services/testServices';

type Props = {
  questionsPart1: number[];
  startIndex: number;
  onFinish: () => void;
};

const ListeningPart1List: React.FC<Props> = ({ questionsPart1, startIndex, onFinish }) => {
  const [questions, setQuestions] = useState<ToeicPart1[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await testService.getToeicPart1ByIds(questionsPart1);
      setQuestions(data);
    };
    fetchQuestions();
  }, [questionsPart1]);

  const handleAudioEnded = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  if (questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <ListeningPart1QuestionItem
      questionNumber={startIndex + currentIndex}
      imageSrc={currentQuestion.image}
      audioSrc={currentQuestion.audio}
      selectedAnswer={userAnswers[currentQuestion.id]}
      onChange={(val) =>
        setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
      }
      onAudioEnded={handleAudioEnded}
    />
  );
};

export default ListeningPart1List;
