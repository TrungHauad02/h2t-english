import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface SelectSpeakingPromptProps {
  isEditMode: boolean;
  handleAddSpeaking: () => void;
}

export default function SelectSpeakingPrompt({
  isEditMode,
  handleAddSpeaking
}: SelectSpeakingPromptProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 5,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${isDarkMode ? color.teal700 : color.teal400} 0%, ${isDarkMode ? color.emerald700 : color.emerald400} 100%)`
        }}
      />
      
      <MicIcon
        sx={{
          fontSize: 64,
          color: isDarkMode ? color.teal500 : color.teal500,
          mb: 3,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { 
              transform: 'scale(1)',
              opacity: 0.7 
            },
            '50%': { 
              transform: 'scale(1.1)',
              opacity: 1 
            },
            '100%': { 
              transform: 'scale(1)',
              opacity: 0.7 
            }
          }
        }}
      />
      
      <Typography
        variant="h5"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal600,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Select or Add a Speaking Topic
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          color: secondaryTextColor,
          textAlign: "center",
          maxWidth: "450px",
          mb: 4
        }}
      >
        Select a speaking topic from the left panel or add a new one to test students' verbal communication skills.
      </Typography>
      
      {isEditMode && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSpeaking}
          sx={{
            bgcolor: isDarkMode ? color.teal600 : color.teal500,
            color: color.white,
            "&:hover": {
              bgcolor: isDarkMode ? color.teal500 : color.teal400,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(20, 184, 166, 0.25)',
            },
            borderRadius: '0.75rem',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          Add Speaking Topic
        </Button>
      )}
      
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          color: isDarkMode ? color.gray400 : color.gray500,
        }}
      >
        <RecordVoiceOverIcon fontSize="small" />
        <Typography variant="body2">
          Each speaking topic can have multiple questions
        </Typography>
      </Box>
    </Box>
  );
}