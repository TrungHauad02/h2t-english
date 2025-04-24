import React, { ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface FormSectionCardProps {
  title: string;
  children: ReactNode;
}

export default function FormSectionCard({
  title,
  children
}: FormSectionCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 4px 8px ${isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'}`
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}` }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 'bold',
            color: isDarkMode ? color.teal300 : color.teal700
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
}