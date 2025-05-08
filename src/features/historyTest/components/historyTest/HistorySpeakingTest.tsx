import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Container,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistorySpeakingTest from "../../hooks/useHistorySpeakingTest";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPartTypeEnum } from "interfaces";
import {
  QuestionCard,
  RecordingControl,
  NavigationFooter,
  TestSpeakingHeader
} from "./historyMixingAndCompetitionTest/historySpeakingSection/";

interface HistorySpeakingTestProps {
  testSpeakingIds: number[];
  submitTestId: number;
}

export default function HistorySpeakingTest({
  testSpeakingIds,
  submitTestId,
}: HistorySpeakingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const {
    loading,
    error,
    questions,
    recordings,
    speakingTests
  } = useHistorySpeakingTest(testSpeakingIds, submitTestId);

  useEffect(() => {
    if (selectedQuestionId != null) {
      const index = questions.findIndex(q => q.id === selectedQuestionId);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [selectedQuestionId, questions]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>Loading speaking test...</Typography>
      </Box>
    );
  }

  if (error || questions.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="body1" color="error">
          Cannot load speaking test history.
        </Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];
  const audioSource = recordings[currentIndex];
  const currentTest = speakingTests[currentQuestion.parentTestId];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const questionCount = questions.filter(q => q.parentTestId === currentQuestion.parentTestId).length;
  const questionIndex = questions.filter(q => q.parentTestId === currentQuestion.parentTestId && questions.indexOf(q) <= currentIndex).length;

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: '1rem',
        width: "100%",
        p: { xs: 2, sm: 3 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} lg={8}>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              bgcolor: isDarkMode ? color.gray800 : color.white,
              borderRadius: '16px',
              overflow: 'hidden',
              mx: 'auto',
              position: 'relative',
              border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
              transition: 'all 0.3s ease',
              boxShadow: isDarkMode
                ? '0 8px 24px rgba(0,0,0,0.2)'
                : '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color.teal500,
                  transition: 'transform 0.4s ease',
                }
              }}
            />

            {currentTest && (
              <TestSpeakingHeader
                test={currentTest}
                currentQuestionNumber={questionIndex}
                totalQuestions={questionCount}
              />
            )}

            <Box
              sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: isDarkMode ? color.gray300 : color.gray700,
                  }}
                >
                  Question {currentQuestion.serial}
                </Typography>
                <Chip
                  label={audioSource ? "Recorded" : "Not recorded"}
                  size="small"
                  sx={{
                    bgcolor: audioSource
                      ? (isDarkMode ? color.green800 : color.green100)
                      : (isDarkMode ? color.gray600 : color.gray200),
                    color: audioSource
                      ? (isDarkMode ? color.green200 : color.green800)
                      : (isDarkMode ? color.gray300 : color.gray700),
                    borderRadius: '12px',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            </Box>

            <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
              <QuestionCard content={currentQuestion.content} isDarkMode={isDarkMode} />
              <RecordingControl
                isRecording={false}
                startRecording={() => {}}
                stopRecording={() => {}}
                recordingTime={0}
                formatTime={() => ''}
                saving={false}
                audioSource={audioSource}
                isDarkMode={isDarkMode}
              />
            </Container>

            <NavigationFooter
              handlePrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              handleNext={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              isDarkMode={isDarkMode}
            />
          </Box>
        </Grid>

        <Grid item md={3} lg={4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TestQuestionGridHistory
            questionItems={questions.map(q => ({
              serialNumber: q.serial,
              questionId: q.id,
              partType: TestPartTypeEnum.SPEAKING,
              isAnswered: true,
              isCorrect: false
            }))}
            onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
            isTitle
          />
        </Grid>

        {isSmallScreen && (
          <Grid item xs={12}>
            <TestQuestionGridHistory
              questionItems={questions.map(q => ({
                serialNumber: q.serial,
                questionId: q.id,
                partType: TestPartTypeEnum.SPEAKING,
                isAnswered: true,
                isCorrect: false
              }))}
              onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
              isTitle
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}