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

  return (
    <Box
      sx={{
      }}
    >
    

      <Box
        sx={{
          p: 2.5,
          bgcolor: isDarkMode ? color.gray800 : color.white,
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: '0.95rem',
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
          }}
        >
          <Box
            component="span"
            sx={{
           
            }}
          >
            {questionNumber}
          </Box>
          <Box flex={1}>{question.content}</Box>
        </Typography>

        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange(e.target.value as AnswerEnum)}
          sx={{ ml: 5.5 }}
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
                    size="small"
                    sx={{
                      color: isDarkMode ? color.gray600 : color.gray400,
                      '&.Mui-checked': {
                        color: isDarkMode ? color.teal400 : color.teal600,
                      },
                      padding: '6px',
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
                        width: 26,
                        height: 26,
                        transition: 'all 0.2s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        color: isDarkMode ? color.gray200 : color.gray800,
                        fontWeight: isSelected ? 600 : 400,
                        fontSize: '0.85rem',
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
                  p: 1.25,
                  borderRadius: 1.5,
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