import React from 'react';
import { Box, Typography, Chip, Stack, Paper } from '@mui/material';
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestSpeaking } from "interfaces";
import MicIcon from '@mui/icons-material/Mic';

interface TestSpeakingHeaderProps {
  test: TestSpeaking;
  currentQuestionNumber: number;
  totalQuestions: number;
}

export default function TestSpeakingHeader({
  test,
  currentQuestionNumber,
  totalQuestions
}: TestSpeakingHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: isDarkMode ? color.gray900 : color.teal50,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.teal200}`,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                backgroundColor: isDarkMode ? color.teal700 : color.teal200,
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <MicIcon 
                sx={{ 
                  color: isDarkMode ? color.white : color.teal800,
                  fontSize: 22
                }} 
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.white : color.gray900,
                flex: 1,
              }}
            >
              {test.title || 'Speaking Test'}
            </Typography>
          </Stack>

        </Box>

        <Chip
          label={`Question ${currentQuestionNumber}/${totalQuestions}`}
          sx={{
            bgcolor: isDarkMode ? color.teal800 : color.teal100,
            color: isDarkMode ? color.white : color.teal900,
            fontWeight: 500,
            fontSize: '0.875rem',
            borderRadius: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
      </Stack>
    </Box>
  );
}