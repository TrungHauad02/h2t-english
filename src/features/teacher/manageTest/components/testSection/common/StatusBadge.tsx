import React from 'react';
import { Box, Typography } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface StatusBadgeProps {
  isActive: boolean;
  size?: 'small' | 'medium';
  showLabel?: boolean;
}

export  function StatusBadge({ 
  isActive, 
  size = 'medium',
  showLabel = true 
}: StatusBadgeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const badgeSize = size === 'small' ? 8 : 10;
  const paddingSize = size === 'small' ? { px: 1, py: 0.25 } : { px: 1.5, py: 0.5 };
  const fontSize = size === 'small' ? '0.7rem' : '0.75rem';
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '1rem',
        backgroundColor: isActive 
          ? (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
          : (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'),
        color: isActive
          ? (isDarkMode ? color.teal300 : color.teal600)
          : (isDarkMode ? color.red300 : color.red600),
        fontWeight: 500,
        ...paddingSize
      }}
    >
      <Box
        sx={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: '50%',
          backgroundColor: isActive
            ? (isDarkMode ? color.teal400 : color.teal500)
            : (isDarkMode ? color.red400 : color.red500),
          mr: showLabel ? 0.75 : 0
        }}
      />
      
      {showLabel && (
        <Typography
          variant="caption"
          sx={{
            fontSize: fontSize,
            lineHeight: 1
          }}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Typography>
      )}
    </Box>
  );
}