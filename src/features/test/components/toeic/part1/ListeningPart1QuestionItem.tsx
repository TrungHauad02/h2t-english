import React from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AnswerEnum } from 'interfaces/TestInterfaces';

type ListeningPart1QuestionItemProps = {
  questionNumber: number;
  imageSrc: string;
  audioSrc: string;
  selectedAnswer?: AnswerEnum;
  onChange?: (value: AnswerEnum) => void;
  onAudioEnded?: () => void;
};

const ListeningPart1QuestionItem: React.FC<ListeningPart1QuestionItemProps> = ({
  questionNumber,
  imageSrc,
  audioSrc,
  selectedAnswer,
  onChange,
  onAudioEnded
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 4,
        px: 4,
        py: 3,
        flexWrap: 'wrap',
        width: '100%'
      }}
    >
      <audio src={audioSrc} autoPlay onEnded={onAudioEnded} style={{ display: 'none' }} />

      <Box
        sx={{
          border: '2px solid #03a9f4',
          maxWidth: 600,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'white'
        }}
      >
        <img
          src={imageSrc}
          alt={`Question ${questionNumber}`}
          style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>

      <Box
        sx={{
          border: '2px solid #03a9f4',
          borderRadius: 1,
          px: 3,
          py: 2,
          minWidth: 260,
          bgcolor: 'white',
          flexShrink: 0
        }}
      >
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          Choose the correct answer.
        </Typography>
        <Typography sx={{ mb: 1 }}>{questionNumber}.</Typography>
        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange?.(e.target.value as AnswerEnum)}
        >
          <FormControlLabel value="A" control={<Radio />} label="A" />
          <FormControlLabel value="B" control={<Radio />} label="B" />
          <FormControlLabel value="C" control={<Radio />} label="C" />
          <FormControlLabel value="D" control={<Radio />} label="D" />
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default ListeningPart1QuestionItem;
