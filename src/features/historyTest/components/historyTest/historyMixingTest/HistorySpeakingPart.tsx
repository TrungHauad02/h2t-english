import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SubmitTestSpeaking, TestPart, TestPartTypeEnum } from "interfaces";
import { testService } from "features/test/services/testServices";

interface HistorySpeakingPartProps {
  testParts: TestPart[];
  startSerial: number;
  submitSpeakings: SubmitTestSpeaking[];
}

export default function HistorySpeakingPart({
  testParts,
  startSerial,
  submitSpeakings,
}: HistorySpeakingPartProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { isDarkMode } = useDarkMode();
  const color = useColor();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);

        const speakingParts = testParts.filter((part) => part.type === TestPartTypeEnum.SPEAKING);
        const speakingTests = await testService.getTestSpeakingsByIds(
          speakingParts.flatMap((part) => part.questions as number[])
        );

        const fetchedQuestions = await Promise.all(
          speakingTests.flatMap(async (test) => {
            const questions = await testService.getQuestionsByIds(test.questions);
            return questions.map((q, idx) => {
              const answer = submitSpeakings.find((s) => s.question_id === q.id);
              return {
                ...q,
                serial: startSerial + idx,
                answer,
              };
            });
          })
        );

        setQuestionsList(fetchedQuestions.flat());
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [testParts, startSerial, submitSpeakings]);

  const totalQuestions = questionsList.length;
  const currentQuestion = questionsList[currentIndex];

  return (
    <Box sx={{ margin: { xs: "2%", sm: "4%", md: "5%" }, p: { xs: 1, sm: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
              width: { xs: "100%", sm: "90%", md: "80%" },
              mx: "auto",
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
                    Question {currentQuestion?.serial}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Score: {currentQuestion?.answer?.score ?? "N/A"}
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
                  {currentQuestion?.answer?.file ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={currentQuestion.answer.file} type="audio/mpeg" />
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
                    {currentQuestion?.answer?.transcript || "No transcript submitted."}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    💬 Comment: {currentQuestion?.answer?.comment || "No comment provided."}
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
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
                disabled={currentIndex === totalQuestions - 1}
                sx={{
                  bgcolor: currentIndex === totalQuestions - 1 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald400,
                  color: "white",
                  fontWeight: "bold",
                  px: 2,
                  "&:hover": {
                    bgcolor: currentIndex === totalQuestions - 1 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald500,
                  },
                }}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}