import React, { useEffect, useState, useRef } from "react";
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
import AnswerQuestionSectionHistory from "./common/answerQuestion/AnswerQuestionSectionHistory";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
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
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: "1rem",
                  bgcolor: isDarkMode ? color.gray800 : color.white,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: isDarkMode ? color.teal200 : color.teal700 }}
                >
                  Listening {idx + 1}
                </Typography>

                <AnswerQuestionSectionHistory
                  questions={item.questions}
                  startSerial={item.startSerial}
                  submitTestId={submitTestId}
                  partId={item.id}
                  selectedQuestionId={selectedQuestionId}
                  setQuestionRef={setQuestionRef}
                  isCompetitionTest={false}
                />
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
