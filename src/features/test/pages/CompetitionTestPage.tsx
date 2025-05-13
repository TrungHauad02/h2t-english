import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import CompetitionTest from "../components/mixingAndCompetition/CompetitionTest";
import CompetitionResults from "../components/mixingAndCompetition/CompetitionResults";
import CompetitionWaitingForResults from "../components/mixingAndCompetition/CompetitionWaitingForResults";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useCompetitionTest from "../hooks/useCompetitionTest";

export default function CompetitionTestPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
      
  const {
    competition,
    loading,
    error,
    userId,
    submitCompetition
  } = useCompetitionTest();

  const hasCompetitionEnded = () => {
    if (!competition) return false;
    const now = new Date();
    const endTime = new Date(competition.endTime);
    return now > endTime;
  };

  const hasCompletedTest = () => {
    return submitCompetition?.status === true;
  };

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
          Loading competition...
        </Typography>
      </Box>
    );
  }

  if (error || !competition) {
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
          {error || "Competition not found"}
        </Typography>
        <Typography variant="body1">
          Please check the competition ID and try again.
        </Typography>
      </Box>
    );
  }

  const siteInfo: SiteInfo = {
    bgUrl: "http://138.2.91.94:9000/h2t-english/static%2Fmain_picture_competition.jpg",
    title: competition.title || "Competition",
  };

  const renderContent = () => {
    // If competition has ended, show results
    if (hasCompetitionEnded()) {
      return (
        <CompetitionResults
          competition={competition}
          currentUserId={userId}
          submitCompetitionId={submitCompetition?.id}
        />
      );
    }

    // If user has completed the test but competition hasn't ended, show waiting screen
    if (hasCompletedTest() && !hasCompetitionEnded()) {
      return (
        <CompetitionWaitingForResults
          competition={competition}
          submitCompetitionId={submitCompetition.id}
          endTime={new Date(competition.endTime)}
        />
      );
    }

    // Otherwise, show the test
    return <CompetitionTest />;
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
          px: { xs: 2, md: 4 },
          maxWidth: '1400px',
          mx: 'auto'
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}