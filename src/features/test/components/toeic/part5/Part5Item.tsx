import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';

type Props = {
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
  onChange: (val: AnswerEnum) => void;
};

export default function Part5Item({
  questionNumber,
  question,
  selectedAnswer,
  onChange,
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 8px 24px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isDarkMode ? color.teal600 : color.teal400,
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: `0 4px 12px ${alpha(color.teal600, 0.2)}`,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Choose the correct answer.
        </Typography>
        <Chip
          label="Grammar"
          size="small"
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`,
          }}
        />
      </Box>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          bgcolor: isDarkMode ? color.gray800 : color.white,
        }}
      >
        <Typography
          sx={{
            mb: 3,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: isDarkMode ? color.teal800 : color.teal100,
              color: isDarkMode ? color.teal200 : color.teal700,
              fontWeight: 800,
              fontSize: '0.9rem',
            }}
          >
            {questionNumber}
          </Box>
          {question.content}
        </Typography>

        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange(e.target.value as AnswerEnum)}
          sx={{ ml: 1 }}
        >
          {question.answers.map((answer, idx) => {
            const optionLetter = (['A', 'B', 'C', 'D'][idx]) as AnswerEnum;
            const isSelected = selectedAnswer === optionLetter;

            return (
              <FormControlLabel
                key={answer.id}
                value={optionLetter}
                control={
                  <Radio
                    sx={{
                      color: isDarkMode ? color.gray600 : color.gray400,
                      '&.Mui-checked': {
                        color: isDarkMode ? color.teal400 : color.teal600,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={optionLetter}
                      size="small"
                      sx={{
                        bgcolor: isSelected
                          ? isDarkMode ? color.teal700 : color.teal500
                          : isDarkMode ? color.gray700 : color.gray200,
                        color: isSelected
                          ? color.white
                          : isDarkMode ? color.gray300 : color.gray700,
                        fontWeight: 600,
                        width: 28,
                        height: 28,
                        transition: 'all 0.2s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        color: isDarkMode ? color.gray200 : color.gray800,
                        fontWeight: isSelected ? 600 : 400,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {answer.content}
                    </Typography>
                  </Box>
                }
                sx={{
                  mb: 1.5,
                  ml: 0,
                  p: 1.5,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? alpha(color.teal900, 0.2)
                      : alpha(color.teal100, 0.5),
                  },
                  ...(isSelected && {
                    bgcolor: isDarkMode
                      ? alpha(color.teal900, 0.3)
                      : alpha(color.teal100, 0.8),
                    border: '1px solid',
                    borderColor: isDarkMode ? color.teal700 : color.teal300,
                  }),
                }}
              />
            );
          })}
        </RadioGroup>
      </Box>
    </Box>
  );
}