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
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
  onChange: (val: AnswerEnum) => void;
};

const Part5Item: React.FC<Props> = ({
  questionNumber,
  question,
  selectedAnswer,
  onChange,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        border: '2px solid #03a9f4',
        borderRadius: 1,
        bgcolor: 'white',
      }}
    >
      <Box sx={{ bgcolor: '#03a9f4', color: 'white', px: 2, py: 1 }}>
        <Typography fontWeight="bold">Choose the correct answer.</Typography>
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mb: 2 }}>
          {questionNumber}. {question.content}
        </Typography>
        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange(e.target.value as AnswerEnum)}
        >
          {question.answers.map((answer, idx) => (
            <FormControlLabel
              key={answer.id}
              value={(['A', 'B', 'C', 'D'][idx]) as AnswerEnum}
              control={<Radio />}
              label={`${(['A', 'B', 'C', 'D'][idx])}. ${answer.content}`}
            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default Part5Item;
