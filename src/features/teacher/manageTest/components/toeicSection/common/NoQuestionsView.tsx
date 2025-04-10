import React from 'react';
import { Paper, Typography } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface NoQuestionsViewProps {
  partNumber: number;
}

export default function NoQuestionsView({ partNumber }: NoQuestionsViewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 4,
        borderRadius: '1rem',
        textAlign: 'center',
        backgroundColor: isDarkMode ? color.gray700 : color.teal50,
        border: `1px dashed ${isDarkMode ? color.gray600 : color.teal300}`
      }}
    >
      <Typography 
        variant="h6"
        color={isDarkMode ? color.gray300 : color.gray600}
        gutterBottom
      >
        No questions in Part {partNumber}
      </Typography>
      <Typography 
        variant="body2"
        color={isDarkMode ? color.gray400 : color.gray500}
      >
        Add questions to start building your Part {partNumber} section
      </Typography>
    </Paper>
  );
}