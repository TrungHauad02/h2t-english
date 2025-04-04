import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  useTheme,
} from '@mui/material';
import { AnswerEnum } from 'interfaces/TestInterfaces';
import CollapseScriptBox from '../common/CollapseScriptBox';

type ListeningPart1QuestionItemProps = {
  questionNumber: number;
  imageSrc: string;
  audioSrc: string;
  script: string;
  selectedAnswer?: AnswerEnum;
  correctAnswer?: AnswerEnum;
  onChange?: (value: AnswerEnum) => void;
};

const ListeningPart1QuestionItem: React.FC<ListeningPart1QuestionItemProps> = ({
  questionNumber,
  imageSrc,
  audioSrc,
  selectedAnswer,
  correctAnswer,
  script,
  onChange,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
        width: '100%',
      }}
    >
      <audio controls src={audioSrc} style={{ width: '90%' }} />

      <Box
        sx={{
          border: '2px solid #03a9f4',
          maxWidth: 600,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'white',
        }}
      >
        <img
          src={imageSrc}
          alt={`Question ${questionNumber}`}
          style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Box>

      <Box sx={{ minWidth: 280, flexShrink: 0, width: '100%', maxWidth: 400 }}>
        <Box
          sx={{
            border: '2px solid #03a9f4',
            borderRadius: 1,
            px: 3,
            py: 2,
            bgcolor: isDark ? '#1e1e1e' : 'white',
          }}
        >
          <Typography sx={{ mb: 1 }}>{questionNumber}.</Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              name={`question-${questionNumber}`}
              value={selectedAnswer || ''}
              onChange={(e) => onChange?.(e.target.value as AnswerEnum)}
            >
              {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((opt) => {
                const isCorrect = correctAnswer === opt;
                const isWrong = selectedAnswer === opt && selectedAnswer !== correctAnswer;

                let bgColor = 'transparent';
                let textColor = 'inherit';

                if (correctAnswer) {
                  if (isCorrect) {
                    bgColor = isDark ? '#004d60' : '#e0f7fa';
                    textColor = isDark ? '#b2ebf2' : '#01579b';
                  } else if (isWrong) {
                    bgColor = isDark ? '#3b1f1f' : '#ffebee';
                    textColor = isDark ? '#ef9a9a' : '#c62828';
                  }
                }

                return (
                  <Box
                    key={opt}
                    sx={{
                      bgcolor: bgColor,
                      color: textColor,
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      mb: 1,
                      width: '95%',
                    }}
                  >
                    <FormControlLabel
                      value={opt}
                      control={<Radio disabled={!!correctAnswer} />}
                      label={opt}
                      sx={{
                        width: '100%',
                        m: 0,
                        color: textColor,
                      }}
                    />
                  </Box>
                );
              })}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box mt={1}>
          <CollapseScriptBox script={script} />
        </Box>
      </Box>
    </Box>
  );
};

export default ListeningPart1QuestionItem;
