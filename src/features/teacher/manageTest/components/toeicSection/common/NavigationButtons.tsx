import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

export default function NavigationButtons({ 
  onPrevious, 
  onNext, 
  isPreviousDisabled, 
  isNextDisabled 
}: NavigationButtonsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        my: 3 
      }}
    >
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        sx={{
          borderColor: isDarkMode ? color.teal700 : color.teal500,
          color: isDarkMode ? color.teal500 : color.teal700,
          '&:hover': {
            borderColor: isDarkMode ? color.teal600 : color.teal400,
            backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.04)'
          }
        }}
      >
        Previous
      </Button>
      <Button 
        variant="outlined" 
        endIcon={<ArrowForwardIcon />}
        onClick={onNext}
        disabled={isNextDisabled}
        sx={{
          borderColor: isDarkMode ? color.teal700 : color.teal500,
          color: isDarkMode ? color.teal500 : color.teal700,
          '&:hover': {
            borderColor: isDarkMode ? color.teal600 : color.teal400,
            backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.04)'
          }
        }}
      >
        Next
      </Button>
    </Box>
  );
}