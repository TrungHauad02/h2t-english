import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AnswerEnum, ToeicPart5 } from 'interfaces/TestInterfaces';

type Props = {
  questionNumber: number;
  question: ToeicPart5;
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
          <FormControlLabel value="A" control={<Radio />} label={`A. ${question.answer1}`} />
          <FormControlLabel value="B" control={<Radio />} label={`B. ${question.answer2}`} />
          <FormControlLabel value="C" control={<Radio />} label={`C. ${question.answer3}`} />
          <FormControlLabel value="D" control={<Radio />} label={`D. ${question.answer4}`} />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default Part5Item;
