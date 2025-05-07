// pages/HistoryTestPage.tsx
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { TestTypeEnum } from "interfaces";
// import MixingTest from "../components/mixingAndCompetition/MixingTest";
// import {
//   ReadingTest,
//   ListeningTest,
//   SpeakingTest,
//   WritingTest
// } from "../components/";
import useHistoryTest from "../hooks/useHistoryTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function HistoryTestPage() {
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
  } = useHistoryTest(); // khác useStudentTest ở điểm: KHÔNG tạo mới submitTest

  if (loading) {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        height: '80vh',
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
        <Typography variant="h6" sx={{ mt: 2, color: isDarkMode ? color.gray300 : color.gray700, fontWeight: 500 }}>
          Loading test...
        </Typography>
      </Box>
    );
  }

  if (error || !test || !submitTest) {
    return (
      <Box component={Paper} elevation={3} sx={{
        p: 4, textAlign: "center", mt: 4, maxWidth: '600px', mx: 'auto',
        borderRadius: '1rem',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        color: isDarkMode ? color.gray100 : color.gray900
      }}>
        <Alert severity="error" sx={{
          mb: 2,
          '& .MuiAlert-icon': { color: isDarkMode ? color.red400 : color.red600 },
          backgroundColor: isDarkMode ? color.gray700 : undefined
        }}>
          Cannot load test history.
        </Alert>
        <Typography variant="body1">
          Please check the test or submission ID.
        </Typography>
      </Box>
    );
  }

  const siteInfo: SiteInfo = {
    bgUrl: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: test.title || "Test",
  };

  const renderTest = () => {
    // switch (test.type) {
    //   case TestTypeEnum.MIXING:
    //     return (
    //       <MixingTest mixingTestParts={testParts} submitTestId={submitTest.id} isHistory />
    //     );

    //   case TestTypeEnum.READING:
    //     return (
    //       <ReadingTest testReadings={readingPart?.questions || []} submitTestId={submitTest.id} isHistory />
    //     );

    //   case TestTypeEnum.LISTENING:
    //     return (
    //       <ListeningTest testListenings={listeningPart?.questions || []} submitTestId={submitTest.id} isHistory />
    //     );

    //   case TestTypeEnum.SPEAKING:
    //     return (
    //       <SpeakingTest testSpeakings={speakingPart?.questions || []} submitTestId={submitTest.id} isHistory />
    //     );

    //   case TestTypeEnum.WRITING:
    //     return (
    //       <WritingTest testWritings={writingPart?.questions || []} submitTestId={submitTest.id} isHistory />
    //     );

    //   default:
    //     return (
    //       <Typography variant="body1" sx={{ textAlign: "center" }}>
    //         Unsupported test type or no history available.
    //       </Typography>
    //     );
    // }
  };

  return (
    <Box sx={{
      width: "100%",
      minHeight: '100vh',
      pt: 8,
      pb: 6,
      backgroundColor: isDarkMode ? color.gray900 : color.gray50,
      transition: 'background-color 0.3s ease'
    }}>
      <MainPictureSection siteInfo={siteInfo} />
      <Box sx={{ mt: 4, mb: 6, px: { xs: 2, md: 4 } }}>
        {/* {renderTest()} */}
      </Box>
    </Box>
  );
}
