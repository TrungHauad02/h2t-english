import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import CompetitionTest from "../components/mixingAndCompetition/CompetitionTest";
import CompetitionResults from "../components/mixingAndCompetition/CompetitionResults";
import CompetitionWaitingForResults from "../components/mixingAndCompetition/CompetitionWaitingForResults";
import LoadingScreen from "../components/common/LoadingScreen";
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
    submitCompetition,
    hasCompetitionEnded,
    hasCompletedTest
  } = useCompetitionTest();

  // Show loading screen
  if (loading) {
    return (
      <LoadingScreen message="Loading Competition" />
    );
  }

  // Show error screen
  if (error || !competition) {
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
            maxWidth: "600px",
            mx: "auto",
            borderRadius: "1rem",
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error || "Competition not found"}
          </Typography>
          <Typography variant="body1">
            Please check the competition ID and try again.
          </Typography>
        </Box>
      </Box>
    );
  }

  const siteInfo: SiteInfo = {
    bgUrl: "/h2t-english-competitions-banner.svg",
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
          submitCompetitionId={submitCompetition?.id}
          endTime={new Date(competition.endTime)}
        />
      );
    }

    // If competition has ended and user never participated, show a message
    if (hasCompetitionEnded() && !submitCompetition) {
      return (
        <Box
          component={Paper}
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "1rem",
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Competition Has Ended
          </Typography>
          <Typography variant="body1">
            This competition has ended and you did not participate.
          </Typography>
        </Box>
      );
    }

    // Otherwise, show the test (this includes cases where competition is active)
    return <CompetitionTest />;
  };

  // Show main content - will fade in after loading
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        pt: 8,
        pb: 6,
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        transition: "background-color 0.3s ease",
      }}
    >
      <MainPictureSection siteInfo={siteInfo} />
      
      <Box
        sx={{
          mt: 4,
          mb: 6,
          px: { xs: 2, md: 4 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}