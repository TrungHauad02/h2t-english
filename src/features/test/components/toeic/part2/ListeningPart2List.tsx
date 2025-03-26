import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ToeicPart2, AnswerEnum } from 'interfaces/TestInterfaces';
import { testService } from '../../../services/testServices';
import ListeningPart2QuestionItem from './ListeningPart2QuestionItem';

type Props = {
  questionsPart2: string;
  onFinish: () => void;
  startIndex: number;
};

const ListeningPart2List: React.FC<Props> = ({ questionsPart2, onFinish, startIndex }) => {
  const [questions, setQuestions] = useState<ToeicPart2[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, AnswerEnum>>({});

  useEffect(() => {
    const fetchData = async () => {
      const ids = testService.parseIds(questionsPart2);
      const data = await testService.getToeicPart2ByIds(ids);
      setQuestions(data);
    };
    fetchData();
  }, [questionsPart2]);

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
    <Box
    sx={{marginTop:"1rem"}}
    >
      <ListeningPart2QuestionItem
        questionNumber={startIndex + currentIndex}
        audioSrc={currentQuestion.audio}
        selectedAnswer={userAnswers[currentQuestion.id]}
        onChange={(val) =>
          setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }))
        }
        onAudioEnded={handleAudioEnded}
      />
    </Box>
  );
};

export default ListeningPart2List;
