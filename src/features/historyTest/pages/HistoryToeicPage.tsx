import React from 'react';
import { Box, CircularProgress, Typography, Paper, Fade, Container } from '@mui/material';
import useToeicHistory from '../hooks/useToeicHistory';
import ToeicHistory from '../components/historyTest/toeic/ToeicHistory';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { MainPictureSection } from 'components/sections';

export default function ToeicHistoryPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { toeic, submitToeic, loading, error } = useToeicHistory();

  const siteInfo = {
    title: "Toeic History",
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
  };

  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor,
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
          backgroundColor,
          p: 2
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
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
        </Paper>
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
          backgroundColor,
          p: 2
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: backgroundColor,
        backgroundImage: isDarkMode
          ? `radial-gradient(${color.emerald900} 1px, transparent 1px)`
          : `radial-gradient(${color.emerald200} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        pt: 10,
        pb: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hiệu ứng background hình tròn */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.emerald700 + "30" : color.emerald300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? color.teal700 + "30" : color.teal300 + "30"
          } 0%, transparent 70%)`,
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Nội dung chính */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Box>
            <MainPictureSection siteInfo={siteInfo} />
          </Box>
        </Fade>

        <Box sx={{ mt: 6 }}>
          <ToeicHistory toeic={toeic} submitToeic={submitToeic} />
        </Box>
      </Container>
    </Box>
  );
}
