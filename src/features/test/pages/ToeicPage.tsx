import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import useToeicPage from '../hooks/useToeicTest';
import { ToeicTest } from '../components';
import LoadingScreen from '../components/common/LoadingScreen';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

export default function ToeicPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const { toeic, submitToeic, loading, error } = useToeicPage();

  // Show loading screen
  if (loading) {
    return (
      <LoadingScreen message="Loading TOEIC Test" />
    );
  }

  // Show error screen
  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          pt: 8,
          pb: 6,
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box 
          component={Paper} 
          elevation={3}
          sx={{ 
            p: 4, 
            textAlign: "center", 
            maxWidth: '600px',
            mx: 'auto',
            borderRadius: '1rem',
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.gray100 : color.gray900
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body1">
            Please check the test ID and try again.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Show submission error screen
  if (!submitToeic) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          pt: 8,
          pb: 6,
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box 
          component={Paper} 
          elevation={3}
          sx={{ 
            p: 4, 
            textAlign: "center", 
            maxWidth: '600px',
            mx: 'auto',
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
            Unable to create TOEIC submission. Please try again.
          </Alert>
          <Typography variant="body1">
            There was an error preparing your TOEIC test submission. Please refresh or contact support.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Show main TOEIC test content
  return (
    <Box sx={{ 
      width: "100%",
      backgroundImage: isDarkMode
        ? `radial-gradient(${color.emerald900} 1px, transparent 1px)`
        : `radial-gradient(${color.emerald200} 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
      pt: 10,
      height: "calc(100vh - 80px)", 
      pb: 8,
      position: "relative",
      overflow: "hidden",
    }}>
      {toeic && <ToeicTest />}
    </Box>
  );
}