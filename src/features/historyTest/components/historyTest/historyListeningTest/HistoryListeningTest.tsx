import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { SubmitTestAnswer, TestListening } from "interfaces";
import { testService } from "features/test/services/testServices";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import NavigationControls from "../common/NavigationControls";
import CommentTest from "../common/CommentTest";
import ScoreDisplay from "../common/ScoreDisplay";
interface HistoryListeningTestProps {
  testListenings: TestListening[];
  submitAnswers: SubmitTestAnswer[];
}

export default function HistoryListeningTest({
  testListenings,
  submitAnswers,
}: HistoryListeningTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        let currentSerial = 1;
        const fetchedQuestions = await Promise.all(
          testListenings.map(async (listening) => {
            const questions = await testService.getQuestionsByIds(listening.questions);
            const startSerial = currentSerial;
            currentSerial += questions.length;
            return {
              audio: listening.audio,
              questions,
              startSerial,
              endSerial: currentSerial - 1,
            };
          })
        );
        setQuestionsList(fetchedQuestions);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [testListenings]);

  const totalListenings = testListenings.length;
  const currentListening = questionsList[currentIndex];

  const handleNext = () => {
    if (currentIndex < totalListenings - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ p: 2, marginX: "5%" }}>
      
        <ScoreDisplay score={42} total={50} />

      <NavigationControls
        currentIndex={currentIndex}
        totalItems={totalListenings}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
        <CommentTest 
        text = {"Please review your answer carefully and consider improving your grammar, structure, or coherence where needed."}
        />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>
          Cannot load data. Try again
        </Typography>
      ) : (
        currentListening && (
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: "100%",
              height: { xs: "auto", sm: "70vh" },
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">
                Questions {currentListening.startSerial} - {currentListening.endSerial}
              </Typography>
              <audio controls style={{ width: "100%", marginTop: 10 }}>
                <source src={currentListening.audio} type="audio/mpeg" />
              </audio>
            </Box>

            <Box sx={{ width: "100%", p: 2, overflowY: "auto" }}>
              <AnswerQuestionSection
                questions={currentListening.questions}
                startSerial={currentListening.startSerial}
                submitAnswers={submitAnswers}
              />
            </Box>
          </Stack>
        )
      )}
    </Box>
  );
}
