import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Stack, Fab, Grid, useMediaQuery } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TestSpeaking, Question } from "interfaces";
import { testService } from "features/test/services/testServices";
import TestSpeakingQuestionGrid from "./TestSpeakingQuestionGrid"; 
import TestInstruction from "../common/TestInstruction";
import useColor from "theme/useColor";
interface SpeakingTestProps {
  testSpeakings: TestSpeaking[];
}

export default function SpeakingTest({ testSpeakings }: SpeakingTestProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questionsList, setQuestionsList] = useState<Partial<Question>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const color = useColor();
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);

        const fetchedQuestions = await Promise.all(
          testSpeakings.flatMap(async (speaking) => {
            const questions = await testService.getQuestionsByIds(speaking.questions);
            return questions.map((question: Question) => ({
              content: question.content,
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
  }, [testSpeakings]);

  const totalSpeakings = questionsList.length;
  const currentQuestion = questionsList[currentIndex];

  return (
    <Box sx={{ margin: "5%", p: 2 }}>
      <TestInstruction type="speaking" />
      <Grid container spacing={2} direction={isMobile ? "column-reverse" : "row"}>
        <Grid item xs={12} sm={9}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              padding: "2%",
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
            ) : error ? (
              <Typography sx={{ textAlign: "center", color: "red" }}>Cannot load data. Try again.</Typography>
            ) : (
              <>
                <Typography variant="h5" sx={{ px: 4, fontWeight: "bold", alignSelf: "flex-start" }}>
                  Question {currentIndex + 1}
                </Typography>
                <Typography variant="h5" sx={{ textAlign: "center", px: 4, fontWeight: "bold" }}>
                  {currentQuestion?.content || "No content available"}
                </Typography>
              </>
            )}

            <Box sx={{ position: "relative", mt: 3 }}>
              <Fab
                color={isRecording ? "secondary" : "error"}
                aria-label="mic"
                onClick={isRecording ? () => mediaRecorderRef.current?.stop() : async () => {
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
                }}
                sx={{
                  width: isMobile ? 48 : 56,
                  height: isMobile ? 48 : 56,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <MicNoneIcon sx={{ fontSize: isMobile ? "2.5rem" : "3rem" }} />
              </Fab>
            </Box>

            {audioURL && (
              <Box sx={{ mt: 2 }}>
                <audio controls src={audioURL} />
              </Box>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ width: "80%", marginTop: "20px" }}>
              <Button   sx={{
                    bgcolor: color.emerald400,
                    "&:hover": {
                      bgcolor: color.emerald500,
                    },
                  }} variant="contained" startIcon={<ArrowBackIcon />} onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))} disabled={currentIndex === 0}>
                Previous
              </Button>

              <Button  
                  sx={{
                    bgcolor: color.emerald400,
                    "&:hover": {
                      bgcolor: color.emerald500,
                    },
                  }} variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, totalSpeakings - 1))} disabled={currentIndex === totalSpeakings - 1}>
                Next
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TestSpeakingQuestionGrid testSpeakings={testSpeakings} />
        </Grid>
      </Grid>
    </Box>
  );
}
