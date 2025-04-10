import React from 'react';
import { Box, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface ExplanationBoxProps {
  explanation: string;
}

export default function ExplanationBox({ explanation }: ExplanationBoxProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!explanation) return null;

  return (
    <Box 
      sx={{ 
        p: 2, 
        mb: 2,
        backgroundColor: isDarkMode ? 'rgba(45, 212, 191, 0.1)' : 'rgba(45, 212, 191, 0.05)',
        borderRadius: '0.5rem',
        border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`
      }}
    >
      <Typography 
        variant="subtitle2"
        sx={{ 
          color: isDarkMode ? color.teal300 : color.teal700,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          mb: 1
        }}
      >
        <LightbulbIcon sx={{ mr: 1, fontSize: 20 }} /> Explanation:
      </Typography>
      <Typography 
        variant="body2"
        sx={{ 
          color: isDarkMode ? color.gray300 : color.gray700,
          whiteSpace: 'pre-wrap'
        }}
      >
        {explanation}
      </Typography>
    </Box>
  );
}