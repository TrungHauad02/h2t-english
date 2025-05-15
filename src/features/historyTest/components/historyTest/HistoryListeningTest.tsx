import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Headphones } from "@mui/icons-material";
import AnswerQuestionSectionHistory from "./common/answerQuestion/AnswerQuestionSectionHistory";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import AudioPlayer from "./common/AudioPlayer";
import TranscriptSection from "./common/TranscriptSection";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryListeningTest from "../../hooks/useHistoryListeningTest";

interface HistoryListeningTestProps {
  testListeningIds: number[];
  submitTestId: number;
}

export default function HistoryListeningTest({
  testListeningIds,
  submitTestId,
}: HistoryListeningTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [questionRefs, setQuestionRefs] = useState<Record<number, HTMLDivElement | null>>({});

  const {
    loading,
    listeningItems,
    allQuestions
  } = useHistoryListeningTest({
    testListeningIds,   
    submitTestId,        
  });

  const setQuestionRef = (id: number, el: HTMLDivElement | null) => {
    setQuestionRefs((prev) => ({ ...prev, [id]: el }));
  };

  useEffect(() => {
    if (selectedQuestionId && questionRefs[selectedQuestionId]) {
      questionRefs[selectedQuestionId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedQuestionId, questionRefs]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Stack spacing={4}>
            {listeningItems.map((item, idx) => (
              <Paper
                key={item.id}
                elevation={4}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  bgcolor: isDarkMode ? color.gray800 : color.white,
                  boxShadow: isDarkMode 
                    ? '0 8px 32px rgba(0,0,0,0.3)'
                    : '0 8px 32px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDarkMode 
                      ? '0 12px 40px rgba(0,0,0,0.4)'
                      : '0 12px 40px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {/* Header Section */}
                <Box
                  sx={{
                    p: 3,
                    background: isDarkMode 
                      ? `linear-gradient(135deg, ${color.teal900}, ${color.teal800})`
                      : `linear-gradient(135deg, ${color.teal500}, ${color.teal600})`,
                    color: color.white,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Headphones sx={{ fontSize: 32 }} />
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                      }}
                    >
                      Listening {idx + 1}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ml: 'auto',
                        fontWeight: 600,
                        opacity: 0.95,
                      }}
                    >
                      Questions {item.startSerial} - {item.startSerial + item.questions.length - 1}
                    </Typography>
                  </Stack>
                </Box>

                {/* Audio Section */}
                <Box sx={{ p: 3, borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}` }}>
                  <AudioPlayer src={item.audio} />
                  {item.transcript && <TranscriptSection transcript={item.transcript} />}
                </Box>

                {/* Questions Section */}
                <Box sx={{ p: 3 }}>
                  <AnswerQuestionSectionHistory
                    questions={item.questions}
                    startSerial={item.startSerial}
                    submitTestId={submitTestId}
                    partId={item.id}
                    selectedQuestionId={selectedQuestionId}
                    setQuestionRef={setQuestionRef}
                    isCompetitionTest={false}
                  />
                </Box>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Right sidebar */}
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <TestQuestionGridHistory
            questionItems={allQuestions.map((q) => ({
              serialNumber: q.serial,
              questionId: q.id,
              partType: TestPartTypeEnum.LISTENING,
              isAnswered: true,
              isCorrect: q.isCorrect || false
            }))}
            onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
            isTitle
          />
        </Grid>

        {/* Mobile grid */}
        {isSmallScreen && (
          <Grid item xs={12}>
            <TestQuestionGridHistory
              questionItems={allQuestions.map((q) => ({
                serialNumber: q.serial,
                questionId: q.id,
                partType: TestPartTypeEnum.LISTENING,
                isAnswered: true,
                isCorrect: q.isCorrect || false
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