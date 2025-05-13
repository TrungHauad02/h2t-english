import React from 'react';
import { Box, CircularProgress, Typography, Paper, Alert } from '@mui/material';
import useToeicHistory from '../hooks/useToeicHistory';
import ToeicHistory from '../components/historyTest/toeic/ToeicHistory';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

export default function ToeicHistoryPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { toeic, submitToeic, loading, error } = useToeicHistory();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          gap: 2
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: isDarkMode ? color.teal400 : color.teal600,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500
          }}
        >
          Loading TOEIC history...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          p: 2
        }}
      >
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            maxWidth: '600px',
            borderRadius: '1rem',
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.gray100 : color.gray900
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body1">
            Please check the submission ID and try again.
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!submitToeic || !toeic) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          p: 2
        }}
      >
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            maxWidth: '600px',
            borderRadius: '1rem',
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.gray100 : color.gray900
          }}
        >
          <Alert
            severity="error"
            sx={{
              mb: 2,
              '& .MuiAlert-icon': {
                color: isDarkMode ? color.red400 : color.red600
              },
              backgroundColor: isDarkMode ? color.gray700 : undefined
            }}
          >
            Unable to load TOEIC history. Please try again.
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? color.gray900 : color.gray50,
      backgroundImage: isDarkMode
        ? `radial-gradient(${color.emerald900} 1px, transparent 1px)`
        : `radial-gradient(${color.emerald200} 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
      }}>
        <ToeicHistory toeic={toeic} submitToeic={submitToeic} />
      </Box>
    </Box>
  );
}