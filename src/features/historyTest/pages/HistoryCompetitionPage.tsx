import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import HistoryCompetitionTest from "../components/historyTest/HistoryCompetitionTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryCompetitionTest from "../hooks/useHistoryCompetitionTest";

export default function HistoryCompetitionPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const {
    competition,
    loading,
  } = useHistoryCompetitionTest();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          height: '80vh',
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
          Loading competition history...
        </Typography>
      </Box>
    );
  }

  if (!competition) {
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
          { "Competition history not found"}
        </Typography>
        <Typography variant="body1">
          Please check the competition ID and try again.
        </Typography>
      </Box>
    );
  }

  const siteInfo: SiteInfo = {
    bgUrl:
      "http://138.2.91.94:9000/h2t-english/static%2Fmain_picture_competition.jpg",
    title: competition.title || "Competition History",
  };

  return (
    <Box 
      sx={{ 
        width: "100%",
        minHeight: '100vh',
        pt: 8,
        pb: 6,
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        transition: 'background-color 0.3s ease'
      }}
    >
      <MainPictureSection siteInfo={siteInfo} />
      
      <Box 
        sx={{ 
          mt: 4, 
          mb: 6,
          px: { xs: 2, md: 4 }
        }}
      >
        <HistoryCompetitionTest />
      </Box>
    </Box>
  );
}
