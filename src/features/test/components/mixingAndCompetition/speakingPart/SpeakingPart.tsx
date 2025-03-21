import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Stack, Fab, Grid } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TestPart } from "interfaces";
import { testService } from "features/test/services/testServices";

interface SpeakingPartProps {
  testParts: TestPart[];
  startSerial: number;
}

export default function SpeakingPart({ testParts, startSerial }: SpeakingPartProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<{ content: string; serial: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);

        const speakingParts = testParts.filter((part) => part.type === "SPEAKING");
        const speakingTests = await testService.getTestSpeakingsByIds(
          speakingParts.flatMap((part) => part.questions as number[])
        );

        const fetchedQuestions = await Promise.all(
          speakingTests.flatMap(async (test) => {
            const questions = await testService.getQuestionsByIds(test.questions);
            return questions.map((q, idx) => ({
              content: q.content,
              serial: startSerial + idx,
            }));
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
  }, [testParts, startSerial]);

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
              <Typography sx={{ textAlign: "center", color: "red" }}>Cannot load data. Try again.</Typography>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    px: { xs: 1, sm: 3 },
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    alignSelf: "flex-start",
                  }}
                >
                  Question {startSerial + currentIndex}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    px: { xs: 1, sm: 3 },
                    fontWeight: "bold",
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {currentQuestion?.content || "No content available"}
                </Typography>
              </>
            )}

            <Box sx={{ position: "relative", mt: 3 }}>
              <Fab
                color={isRecording ? "secondary" : "error"}
                aria-label="mic"
                onClick={
                  isRecording
                    ? () => {
                        mediaRecorderRef.current?.stop();
                        setIsRecording(false);
                      }
                    : async () => {
                        try {
                          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                          const mediaRecorder = new MediaRecorder(stream);
                          audioChunks.current = [];

                          mediaRecorder.ondataavailable = (event) => {
                            audioChunks.current.push(event.data);
                          };

                          mediaRecorder.onstop = () => {
                            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
                            const url = URL.createObjectURL(audioBlob);
                            setAudioURL(url);
                          };

                          mediaRecorderRef.current = mediaRecorder;
                          mediaRecorder.start();
                          setIsRecording(true);
                        } catch (error) {
                          console.error("Error accessing microphone:", error);
                        }
                      }
                }
                sx={{
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  width: { xs: 48, sm: 56, md: 64 },
                  height: { xs: 48, sm: 56, md: 64 },
                }}
              >
                <MicNoneIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }} />
              </Fab>
            </Box>

            {audioURL && (
              <Box sx={{ mt: 2 }}>
                <audio controls src={audioURL} />
              </Box>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mt: 3, px: { xs: 1, sm: 3 } }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0}
                sx={{
                  backgroundColor: "#1B5E20",
                  color: "white",
                  px: { xs: 1.5, sm: 2.5 },
                  py: { xs: 0.6, sm: 1 },
                  fontSize: { xs: "0.75rem", sm: "0.9rem" },
                  fontWeight: "bold",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
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
                  backgroundColor: "#1B5E20",
                  color: "white",
                  px: { xs: 1.5, sm: 2.5 },
                  py: { xs: 0.6, sm: 1 },
                  fontSize: { xs: "0.75rem", sm: "0.9rem" },
                  fontWeight: "bold",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
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
