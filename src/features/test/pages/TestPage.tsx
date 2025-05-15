import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { TestTypeEnum } from "interfaces";
import MixingTest from "../components/mixingAndCompetition/MixingTest";
import {
  ReadingTest,
  ListeningTest,
  SpeakingTest,
  WritingTest
} from "../components/";
import useStudentTest from "../hooks/useStudentTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function TestPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const {
    test,
    testParts,
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
          Loading test...
        </Typography>
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

  const renderTest = () => {
    if (!submitTest || !test) return null;

    switch (test.type) {
      case TestTypeEnum.MIXING:
        if (testParts && testParts.length > 0) {
          return (
            <MixingTest 
            test={test}
              mixingTestParts={testParts}
              submitTestId={submitTest.id}
            />
          );
        }
        break;
        
      case TestTypeEnum.READING:
        if (readingPart && readingPart.questions && readingPart.questions.length > 0) {
          return (
            <ReadingTest 
            test={test}
              testReadings={readingPart.questions}
              submitTestId={submitTest.id}
            />
          );
        }
        break;
        
      case TestTypeEnum.LISTENING:
        if (listeningPart && listeningPart.questions && listeningPart.questions.length > 0) {
          return (
            <ListeningTest 
            test={test}
              testListenings={listeningPart.questions}
              submitTestId={submitTest.id}
            />
          );
        }
        break;
        
      case TestTypeEnum.SPEAKING:
        if (speakingPart && speakingPart.questions && speakingPart.questions.length > 0) {
          return (
            <SpeakingTest 
            test={test}
              testSpeakings={speakingPart.questions}
              submitTestId={submitTest.id}
            />
          );
        }
        break;
        
      case TestTypeEnum.WRITING:
        if (writingPart && writingPart.questions && writingPart.questions.length > 0) {
          return (
            <WritingTest 
            test={test}
              testWritings={writingPart.questions}
              submitTestId={submitTest.id}
            />
          );
        }
        break;
        
      default:
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
              Unsupported test type
            </Typography>
            <Typography variant="body1">
              This test type is not yet supported or no content is available.
            </Typography>
          </Box>
        );
    }
    
    // Fallback in case the specific test part is not available
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
          Test content unavailable
        </Typography>
        <Typography variant="body1">
          The content for this test is not available. Please try another test.
        </Typography>
      </Box>
    );
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
        {renderTest()}
      </Box>
    </Box>
  );
}