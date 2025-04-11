import React from 'react';
import { Grid, Box } from '@mui/material';
import { WETextField, WESelect } from 'components/input';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface AnswerOption {
  label: string;
  value: string;
}

interface AnswerOptionsEditorProps {
  answers: string[];
  correctAnswer: string;
  onAnswerChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (value: string | number) => void;
  answerOptions: AnswerOption[];
  optionLabels?: string[];
}

export default function AnswerOptionsEditor({
  answers,
  correctAnswer,
  onAnswerChange,
  onCorrectAnswerChange,
  answerOptions,
  optionLabels = ['A', 'B', 'C', 'D']
}: AnswerOptionsEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const textFieldBgColor = isDarkMode ? color.gray900 : color.white;
  const borderColor = isDarkMode ? color.gray600 : color.gray400;
  const focusBorderColor = isDarkMode ? color.emerald400 : color.emerald500;
  const labelColor = isDarkMode ? color.gray300 : color.gray700;
  const focusLabelColor = isDarkMode ? color.emerald400 : color.emerald600;

  return (
    <Grid container spacing={3}>
      {answers.map((answer, index) => (
        <Grid item xs={12} key={index}>
          <WETextField
            label={`Answer ${optionLabels[index]}`}
            type="text"
            value={answer}
            onChange={(e) => onAnswerChange(index, e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1rem",
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${borderColor}`,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: `2px solid ${focusBorderColor}`,
                },
                backgroundColor: textFieldBgColor,
              },
              "& .MuiInputLabel-root": {
                color: labelColor,
                "&.Mui-focused": {
                  color: focusLabelColor
                }
              }
            }}
          />
        </Grid>
      ))}
      
      <Grid item xs={12} sm={6} md={4}>
        <Box sx={{ mt: 2 }}>
          <WESelect
            showLabel
            label="Correct Answer"
            value={correctAnswer}
            options={answerOptions}
            onChange={onCorrectAnswerChange}
            required
            name="correctAnswer"
          />
        </Box>
      </Grid>
    </Grid>
  );
}