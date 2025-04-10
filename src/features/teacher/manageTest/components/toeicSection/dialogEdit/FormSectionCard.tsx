import React, { ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface FormSectionCardProps {
  title: string;
  children: ReactNode;
  sx?: object;
}

export default function FormSectionCard({ 
  title, 
  children,
  sx = {}
}: FormSectionCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const paperBg = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        backgroundColor: paperBg, 
        p: 3, 
        borderRadius: '1rem',
        border: `1px solid ${borderColor}`,
        ...sx
      }}
    >
      <Typography 
        variant="h6" 
        fontWeight="bold" 
        color={accentColor} 
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>
      
      <Box>
        {children}
      </Box>
    </Paper>
  );
}