import { Box, Typography } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import React from 'react';

interface EmptyStateDisplayProps {
  icon: React.ReactNode;
  title: string;
  message: string;
}

export default function EmptyStateDisplay({
  icon,
  title,
  message
}: EmptyStateDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 6,
      color: isDarkMode ? color.gray400 : color.gray600
    }}>
      {icon}
      <Typography variant="h6">
        {title}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        {message}
      </Typography>
    </Box>
  );
}