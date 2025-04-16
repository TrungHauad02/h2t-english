import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';

type Props = {
  questionNumberStart: number;
  questions: ToeicQuestion[];
  audio: string;
  selectedAnswers: Record<string, AnswerEnum>;
  onChange: (questionKey: string, value: AnswerEnum) => void;
  onAudioEnded: () => void;
};

const ListeningPart3And4Item: React.FC<Props> = ({
  questionNumberStart,
  questions,
  audio,
  selectedAnswers,
  onChange,
  onAudioEnded
}) => {
  return (
    <Box
      sx={{
        width: '80vw',
        maxHeight: '60vh',
        overflowY: 'auto',
        border: '2px solid #03a9f4',
        borderRadius: 2,
        bgcolor: 'white',
        p: 3,
        boxShadow: 3,
      }}
    >
      <audio src={audio} autoPlay onEnded={onAudioEnded} style={{ display: 'none' }} />

      <Typography fontWeight="bold" mb={2}>
        Choose the correct answer.
      </Typography>

      {questions.map((question, index) => {
        const questionKey = `${question.id}`;
        return (
          <Box key={question.id} mb={3}>
            <Typography mb={1}>
              {questionNumberStart + index}. {question.content}
            </Typography>
            <RadioGroup
              name={questionKey}
              value={selectedAnswers[questionKey] || ''}
              onChange={(e) => onChange(questionKey, e.target.value as AnswerEnum)}
            >
              {question.toeicAnswers.map((answer, idx) => (
                <FormControlLabel
                  key={answer.id}
                  value={(['A', 'B', 'C', 'D'][idx]) as AnswerEnum}
                  control={<Radio />}
                  label={`${(['A', 'B', 'C', 'D'][idx])}. ${answer.content}`}
                />
              ))}
            </RadioGroup>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListeningPart3And4Item;
