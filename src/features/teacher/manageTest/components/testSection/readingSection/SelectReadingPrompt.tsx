import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface SelectReadingPromptProps {
  isEditMode: boolean;
  handleAddReading: () => void;
}

export default function SelectReadingPrompt({ 
  isEditMode, 
  handleAddReading 
}: SelectReadingPromptProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
      }}
    >
      <BookIcon
        sx={{
          fontSize: 64,
          color: isDarkMode ? color.teal700 : color.teal500,
          mb: 3,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal600,
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Select or Add a Reading Passage
      </Typography>
      <Typography
        variant="body1"
        sx={{ 
          color: secondaryTextColor,
          textAlign: "center",
          maxWidth: "400px",
          mb: 3
        }}
      >
        Select a reading passage from the left panel or add a new one to get started.
      </Typography>
      
      {isEditMode && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddReading}
          sx={{
            bgcolor: isDarkMode ? color.teal600 : color.teal500,
            color: color.white,
            "&:hover": {
              bgcolor: isDarkMode ? color.teal500 : color.teal400,
            },
            borderRadius: '0.75rem',
            fontWeight: 600,
            px: 3,
            py: 1.2,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'none',
          }}
        >
          Add Reading Passage
        </Button>
      )}
    </Box>
  );
}