import { Box, Container, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { TestTypeEnum } from "interfaces";
import {
  ReadingSection,
  ListeningSection,
  SpeakingSection,
  WritingSection,
  VocabularySection,
  GrammarSection
} from "../components/mixingAndCompetition/";
import MixingTest from "../components/mixingAndCompetition/MixingTest";
import useStudentTest from "../hooks/useStudentTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function TestPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const {
    test,
    testParts,
    vocabularyPart,
    grammarPart,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    submitTest,
    loading,
    error
  } = useStudentTest();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '80vh',
          backgroundColor: isDarkMode ? color.gray900 : color.gray50
        }}
      >
        <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  if (error || !test) {
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
          {error || "Test not found"}
        </Typography>
        <Typography variant="body1">
          Please check the test ID and try again.
        </Typography>
      </Box>
    );
  }

  if (!submitTest) {
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
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to create test submission. Please try again.
        </Alert>
        <Typography variant="body1">
          There was an error preparing your test submission. Please refresh or contact support.
        </Typography>
      </Box>
    );
  }

  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: test.title || "Test",
  };

  const renderMixingTest = () => {
    if (test.type === TestTypeEnum.MIXING && testParts && testParts.length > 0 && submitTest) {
      return (
        <MixingTest 
          mixingTestParts={testParts}
          submitTestId={submitTest.id}
        />
      );
    }
    return null;
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
            mb: 6
          }}
        >
          {renderMixingTest()}
        </Box>
    </Box>
  );
}