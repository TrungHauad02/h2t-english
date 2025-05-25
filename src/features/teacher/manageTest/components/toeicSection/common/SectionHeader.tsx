import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  currentIndex: number;
  totalItems: number;
}

export default function SectionHeader({ 
  title, 
  subtitle,
  currentIndex, 
  totalItems 
}: SectionHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}
    >
      <Box>
        <Typography 
          variant="h4" 
          fontWeight="bold"
          color={isDarkMode ? color.gray200 : color.gray900}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="subtitle1"
            color={isDarkMode ? color.gray400 : color.gray600}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {totalItems > 0 && (
        <Chip 
          label={`Question ${currentIndex + 1} of ${totalItems}`}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal100,
            color: isDarkMode ? color.white : color.teal800,
            fontWeight: 'medium',
            p: 0.5
          }}
        />
      )}

    </Box>
  );
}