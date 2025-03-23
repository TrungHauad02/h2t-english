import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestSpeaking, Question, SubmitTestSpeaking } from "interfaces";
import { testService } from "features/test/services/testServices";
import TestSpeakingQuestionGrid from "./HistoryTestSpeakingQuestionGrid";
import CommentTest from "../common/CommentTest";
import ScoreDisplay from "../common/ScoreDisplay";
interface HistorySpeakingTestProps {
  testSpeakings: TestSpeaking[];
  submitSpeakings: SubmitTestSpeaking[];
}

export default function HistorySpeakingTest({
  testSpeakings,
  submitSpeakings,
}: HistorySpeakingTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const fetched = await Promise.all(
          testSpeakings.flatMap((s) => testService.getQuestionsByIds(s.questions))
        );
        setQuestionsList(fetched.flat());
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [testSpeakings]);

  const currentQuestion = questionsList[currentIndex];
  const currentAnswer = submitSpeakings.find((a) => a.question_id === currentQuestion?.id);

  return (
    <Box sx={{ margin: "5%", p: 2 }}>
      
      <ScoreDisplay score={42} total={50} />
      <CommentTest text="Please review your answer carefully and consider improving your grammar, structure, or coherence where needed." />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              padding: { xs: 1.5, sm: 2 },
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
            }}
          >
            {loading ? (
              <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
            ) : error ? (
              <Typography sx={{ textAlign: "center", color: "red" }}>
                Cannot load data. Try again.
              </Typography>
            ) : (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%", px: { xs: 1, sm: 3 } }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    Question {currentIndex + 1}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Score: {currentAnswer?.score ?? "N/A"}
                  </Typography>
                </Stack>

                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", px: { xs: 1, sm: 3 }, fontWeight: 500 }}
                >
                  {currentQuestion?.content || "No content available"}
                </Typography>

                <Box sx={{ mt: 2, width: "100%", px: { xs: 1, sm: 2 } }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    🔊 Your audio:
                  </Typography>
                  {currentAnswer?.file ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={currentAnswer.file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      No audio submitted.
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mt: 2, width: "100%", px: { xs: 1, sm: 2 } }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    📝 Your transcript:
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: "italic", whiteSpace: "pre-line" }}>
                    {currentAnswer?.transcript || "No transcript submitted."}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    💬 Comment: {currentAnswer?.comment || "No comment provided."}
                  </Typography>
                </Box>
              </>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ width: "80%", mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
                sx={{
                  bgcolor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald400,
                  color: "white",
                  fontWeight: "bold",
                  px: 2,
                  "&:hover": {
                    bgcolor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald500,
                  },
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questionsList.length - 1))}
                disabled={currentIndex === questionsList.length - 1}
                sx={{
                  bgcolor:
                    currentIndex === questionsList.length - 1
                      ? isDarkMode
                        ? "#757575"
                        : "#BDBDBD"
                      : color.emerald400,
                  color: "white",
                  fontWeight: "bold",
                  px: 2,
                  "&:hover": {
                    bgcolor:
                      currentIndex === questionsList.length - 1
                        ? isDarkMode
                          ? "#757575"
                          : "#BDBDBD"
                        : color.emerald500,
                  },
                }}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TestSpeakingQuestionGrid
            testSpeakings={testSpeakings}
            submitSpeakings={submitSpeakings}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </Grid>
      </Grid>
    </Box>
  );
}