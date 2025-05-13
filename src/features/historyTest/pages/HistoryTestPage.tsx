import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { TestTypeEnum } from "interfaces";
import {
  HistoryListeningTest as ListeningTest,
  HistoryMixingTest as MixingTest,
  HistoryReadingTest as ReadingTest,
  HistorySpeakingTest as SpeakingTest,
  HistoryWritingTest as WritingTest,
} from "../components/historyTest";
import useHistoryTest from "../hooks/useHistoryTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import TestResultSummary from "../components/historyTest/common/resultSummary/TestResultSummary";

export default function HistoryTestPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const {
    test,
    submitTest,
    loading,
    error,
    readingPart,
    listeningPart,
    speakingPart,
    writingPart,
    testParts,
  } = useHistoryTest();


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          gap: 2,
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
            fontWeight: 500,
          }}
        >
          Loading test...
        </Typography>
      </Box>
    );
  }

  if (error || !test || !submitTest) {
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          mt: 4,
          maxWidth: "600px",
          mx: "auto",
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          color: isDarkMode ? color.gray100 : color.gray900,
        }}
      >
        <Alert
          severity="error"
          sx={{
            mb: 2,
            "& .MuiAlert-icon": {
              color: isDarkMode ? color.red400 : color.red600,
            },
            backgroundColor: isDarkMode ? color.gray700 : undefined,
          }}
        >
          Cannot load test history.
        </Alert>
        <Typography variant="body1">
          Please check the test or submission ID.
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
    switch (test.type) {
      case TestTypeEnum.MIXING:
        return (
          <MixingTest
            mixingTestParts={testParts}
            submitTestId={submitTest.id}
          />
        );

      case TestTypeEnum.READING:
        return (
          <ReadingTest
            testReadingIds={readingPart?.questions || []}
            submitTestId={submitTest.id}
          />
        );

      case TestTypeEnum.LISTENING:
        return (
          <ListeningTest
            testListeningIds={listeningPart?.questions || []}
            submitTestId={submitTest.id}
          />
        );

      case TestTypeEnum.SPEAKING:
        return (
          <SpeakingTest
            testSpeakingIds={speakingPart?.questions || []}
            submitTestId={submitTest.id}
          />
        );

      case TestTypeEnum.WRITING:
        return (
          <WritingTest
            testWritingIds={writingPart?.questions || []}
            submitTestId={submitTest.id}
          />
        );

      default:
        return (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Unsupported test type or no history available.
          </Typography>
        );
    }
  };

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
          maxWidth: "1200px",
          mx: "auto",
          mt: 4,
          mb: 6,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Test Result Summary */}
        <TestResultSummary
          score={submitTest?.score ?? 0}
          maxScore={100}
          comment={submitTest.comment}
        />

        <Box sx={{ display: "block" }}>{renderTest()}</Box>
      </Box>
    </Box>
  );
}
