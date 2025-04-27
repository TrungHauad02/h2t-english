import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface SelectWritingPromptProps {
  isEditMode: boolean;
  handleAddWriting: () => void;
}

export default function SelectWritingPrompt({
  isEditMode,
  handleAddWriting
}: SelectWritingPromptProps) {
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
      <EditNoteIcon
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
        Select or Add a Writing Task
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
        Select a writing task from the left panel or add a new one to get started.
      </Typography>

      {isEditMode && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddWriting}
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
          Add Writing Task
        </Button>
      )}
    </Box>
  );
}