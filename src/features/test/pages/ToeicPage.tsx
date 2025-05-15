import React from 'react';
import { Box, CircularProgress, Typography, Paper, Alert } from '@mui/material';
import useToeicPage from '../hooks/useToeicTest';
import { ToeicTest } from '../components';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

export default function ToeicPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const { toeic, submitToeic, loading, error } = useToeicPage();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
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
          Loading TOEIC test...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        component={Paper} 
        elevation={3}
        sx={{ 
          p: 4, 
          textAlign: "center", 
          mt: 4,
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
    );
  }

  if (!submitToeic) {
    return (
      <Box 
        component={Paper} 
        elevation={3}
        sx={{ 
          p: 4, 
          textAlign: "center", 
          mt: 4,
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
          Unable to create Toeic submission. Please try again.
        </Alert>
        <Typography variant="body1">
          There was an error preparing your Toeic test submission. Please refresh or contact support.
        </Typography>
      </Box>
    );
  }

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
      overflow: "hidden",}}>
      {toeic && <ToeicTest  />}
    </Box>
  );
}