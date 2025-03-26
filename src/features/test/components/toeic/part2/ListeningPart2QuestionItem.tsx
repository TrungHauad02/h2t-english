import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { AnswerEnum } from 'interfaces/TestInterfaces';

type Props = {
  questionNumber: number;
  audioSrc: string;
  selectedAnswer?: AnswerEnum;
  onChange?: (value: AnswerEnum) => void;
  onAudioEnded?: () => void;
};

const ListeningPart2QuestionItem: React.FC<Props> = ({
  questionNumber,
  audioSrc,
  selectedAnswer,
  onChange,
  onAudioEnded
}) => {
  return (
    <Box
      sx={{
        width: 400,
        bgcolor: 'white',
        border: '2px solid #03a9f4',
        borderRadius: 1,
        p: 2,
        boxShadow: 3
      }}
    >
      <audio
        src={audioSrc}
        autoPlay
        onEnded={onAudioEnded}
        style={{ display: 'none' }}
      />
      <Box sx={{ bgcolor: '#03a9f4', color: 'white', px: 2, py: 1 }}>
        <Typography fontWeight="bold">Choose the correct answer.</Typography>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography sx={{ mb: 1 }}>{questionNumber}.</Typography>
        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange?.(e.target.value as AnswerEnum)}
        >
          <FormControlLabel value="A" control={<Radio />} label="A" />
          <FormControlLabel value="B" control={<Radio />} label="B" />
          <FormControlLabel value="C" control={<Radio />} label="C" />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default ListeningPart2QuestionItem;
