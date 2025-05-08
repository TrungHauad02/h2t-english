import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  useTheme,
  useMediaQuery
} from "@mui/material";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryWritingTest from "../../hooks/useHistoryWritingTest";

interface HistoryWritingTestProps {
  testWritingIds: number[];
  submitTestId: number;
}

export default function HistoryWritingTest({
  testWritingIds,
  submitTestId,
}: HistoryWritingTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [questionRefs, setQuestionRefs] = useState<Record<number, HTMLDivElement | null>>({});

  const {
    loading,
    writingItems,
    allQuestions
  } = useHistoryWritingTest({ testWritingIds, submitTestId });

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
            {writingItems.map((item, idx) => (
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
                  Writing {idx + 1}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, color: isDarkMode ? color.gray200 : color.gray800 }}
                >
                  {item.topic}
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  value={item.content}
                  inputRef={(el) => setQuestionRef(item.id, el)}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray900 : color.gray100,
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isDarkMode ? color.gray600 : color.gray300,
                      },
                    },
                  }}
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
              partType: TestPartTypeEnum.WRITING,
              isAnswered: q.isAnswered || false,
              isCorrect: false
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
                partType: TestPartTypeEnum.WRITING,
                isAnswered: q.isAnswered || false,
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
