import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface QuestionEmptyStateProps {
  isEditMode: boolean;
  onAddQuestion: () => void;
}

export default function QuestionEmptyState({
  isEditMode,
  onAddQuestion
}: QuestionEmptyStateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        minHeight: 240
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
        mb: 2
      }}
    >
      <QuestionMarkIcon
        sx={{
          fontSize: 32,
          color: isDarkMode ? color.teal300 : color.teal600
        }}
      />
    </Box>
    
    <Typography
      variant="body1"
      sx={{
        color: isDarkMode ? color.gray400 : color.gray600,
        textAlign: 'center',
        mb: 2
      }}
    >
      No questions have been added to this speaking topic yet.
    </Typography>
    
    {isEditMode && (
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAddQuestion}
        sx={{
          color: isDarkMode ? color.teal300 : color.teal600,
          borderColor: isDarkMode ? color.teal700 : color.teal300,
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
            borderColor: isDarkMode ? color.teal600 : color.teal500,
          },
          borderRadius: '0.75rem',
          textTransform: 'none'
        }}
      >
        Add First Question
      </Button>
    )}
  </Box>
);
}