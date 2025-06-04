import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  alpha
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestoreIcon from '@mui/icons-material/Restore';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

interface ResumeDialogProps {
  open: boolean;
  onResume: () => void;
  onStartOver: () => void;
  resumeStep: number;
  resumeIndex: number;
}

export default function ResumeDialog({
  open,
  onResume,
  onStartOver,
  resumeStep,
  resumeIndex
}: ResumeDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getStepName = (step: number) => {
    switch (step) {
      case 3: return 'Listening Part 1';
      case 4: return 'Listening Part 2';
      case 5: return 'Listening Part 3';
      case 6: return 'Listening Part 4';
      case 7: return 'Reading Part 5';
      case 8: return 'Reading Part 6';
      case 9: return 'Reading Part 7';
      default: return 'Test';
    }
  };

  const getQuestionNumber = (step: number, index: number) => {
    const baseNumbers: Record<number, number> = {
      3: 1,   // Part 1: 1-6
      4: 7,   // Part 2: 7-31
      5: 32,  // Part 3: 32-70
      6: 71,  // Part 4: 71-100
      7: 101, // Part 5: 101-130
      8: 131, // Part 6: 131-146
      9: 147  // Part 7: 147-200
    };
    
    const base = baseNumbers[step] || 1;
    return base + index;
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          bgcolor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: isDarkMode ? color.gray900 : color.gray50,
          borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pb: 2
        }}
      >
        <RestoreIcon 
          sx={{ 
            color: isDarkMode ? color.teal400 : color.teal600,
            fontSize: 28 
          }} 
        />
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: isDarkMode ? color.white : color.gray900 }}
          >
            Resume Your Test
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            We found your previous progress
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box
          sx={{
            bgcolor: isDarkMode ? color.teal900 : color.teal50,
            p: 3,
            borderRadius: '0.75rem',
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            mb: 3
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ 
              color: isDarkMode ? color.teal200 : color.teal800,
              mb: 1
            }}
          >
            Last Position:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Chip
              label={getStepName(resumeStep)}
              sx={{
                bgcolor: isDarkMode ? color.teal700 : color.teal500,
                color: color.white,
                fontWeight: 600
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
            >
              Question {getQuestionNumber(resumeStep, resumeIndex)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ 
              color: isDarkMode ? color.teal300 : color.teal700,
              fontStyle: 'italic'
            }}
          >
            Click "Continue" to resume from where you left off
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ 
            color: isDarkMode ? color.gray400 : color.gray600,
            textAlign: 'center'
          }}
        >
          You can also start over if you prefer to begin from the beginning
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          pt: 0,
          gap: 2,
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
        }}
      >
        <Button
          onClick={onStartOver}
          variant="outlined"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            borderColor: isDarkMode ? color.gray600 : color.gray400,
            '&:hover': {
              borderColor: isDarkMode ? color.gray500 : color.gray500,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
            }
          }}
        >
          Start Over
        </Button>
        <Button
          onClick={onResume}
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            bgcolor: color.teal500,
            color: color.white,
            fontWeight: 600,
            px: 3,
            '&:hover': {
              bgcolor: color.teal600,
            }
          }}
        >
          Continue Test
        </Button>
      </DialogActions>
    </Dialog>
  );
}