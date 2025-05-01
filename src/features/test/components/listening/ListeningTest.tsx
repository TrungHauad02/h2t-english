import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { TestListening } from "interfaces";
import { testService } from "features/test/services/testServices";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import NavigationControls from "../common/NavigationControls";
import TestInstruction from "../common/TestInstruction";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestButton from "../common/SubmitTestButton"; 
interface ListeningTestProps {
  testListenings: TestListening[];
}

export default function ListeningTest({ testListenings }: ListeningTestProps) {
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
      <TestInstruction type="listening" />
       <TimeRemaining />
      <NavigationControls currentIndex={currentIndex} totalItems={totalListenings} onPrevious={handlePrevious} onNext={handleNext} />

      {loading ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>
      ) : error ? (
        <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>Cannot load data. Try again</Typography>
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
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Questions {currentListening.startSerial} - {currentListening.endSerial}
              </Typography>
              <audio autoPlay hidden>
                <source src={currentListening.audio} type="audio/mpeg" />
              </audio>
            </Box>

            <Box sx={{ width: "100%", p: 2, overflowY: "auto" }}>
   
              <SubmitTestButton />
            </Box>
          </Stack>
       
        )
      )}

 
    </Box>
  );
}
