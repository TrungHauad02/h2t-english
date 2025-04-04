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

type Props = {
  questionNumber: number;
  audioSrc: string;
  selectedAnswer?: AnswerEnum;
  correctAnswer?: AnswerEnum;
  script?: string;
};

const ListeningPart2QuestionItem: React.FC<Props> = ({
  questionNumber,
  audioSrc,
  selectedAnswer,
  correctAnswer,
  script,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        width: '80vw',
        border: '2px solid #03a9f4',
        borderRadius: 2,
        bgcolor: isDark ? '#1e1e1e' : 'white',
        boxShadow: 2,
        p: 2,
        mx: 'auto',
      }}
    >
      <audio src={audioSrc} autoPlay controls style={{ width: '100%' }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mt: 2,
        }}
      >
        <Box flex={3}>
          <Typography sx={{ mb: 1 }}>{questionNumber}.</Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              name={`question-${questionNumber}`}
              value={selectedAnswer || ''}
            >
              {(['A', 'B', 'C'] as AnswerEnum[]).map((opt) => {
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
                      width: '100%',
                    }}
                  >
                    <FormControlLabel
                      value={opt}
                      control={<Radio disabled />}
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

        <Box flex={7}>
          <CollapseScriptBox script={script} />
        </Box>
      </Box>
    </Box>
  );
};

export default ListeningPart2QuestionItem;
