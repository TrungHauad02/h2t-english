import { Box, Stack, Typography, Divider, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { TestReading } from "interfaces";
import { testService } from "features/test/services/testServices";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import TestInstruction from "../common/TestInstruction";
import NavigationControls from "../common/NavigationControls";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestButton from "../common/SubmitTestButton"; 
interface ReadingTestProps {
  testReadings: TestReading[];
}

export default function ReadingTest({ testReadings }: ReadingTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);
        let currentSerial = 1;
        const fetchedQuestions = await Promise.all(
          testReadings.map(async (reading) => {
            const questions = await testService.getQuestionsByIds(reading.questions);
            const startSerial = currentSerial;
            currentSerial += questions.length;
            return {
              file: reading.file,
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
  }, [testReadings]);

  const totalReadings = testReadings.length;
  const currentReading = questionsList[currentIndex];

  const handleNext = () => {
    if (currentIndex < totalReadings - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 3 } }}>
      <TestInstruction type="reading" />
      <Box
        sx={{
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "flex-end", 
          marginRight:"2%",
          px: 2,
          mt: 2,
        }}
      >
        <TimeRemaining />
      </Box>

      <NavigationControls
        currentIndex={currentIndex}
        totalItems={totalReadings}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {loading ? (
        <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>
      ) : error ? (
        <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>Cannot load data. Try again</Typography>
      ) : (
        currentReading && (
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            sx={{
              width: "100%",
              height: { xs: "auto", sm: "70vh" },
              border: "1px solid #ccc",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: isMobile ? "100%" : "50%", p: 2, overflowY: "auto" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Question {currentReading.startSerial} - {currentReading.endSerial}
              </Typography>
              <WEDocumentViewer fileUrl={currentReading.file} lineHeight="2" />
            </Box>

            {!isMobile && <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc" }} />}

            <Box sx={{ width: isMobile ? "100%" : "50%", p: 2, overflowY: "auto" }}>
              <AnswerQuestionSection questions={currentReading.questions} startSerial={currentReading.startSerial} />
             
            </Box>
          </Stack>
        )
      )}
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "50%", sm: "20%" },}}>
          <SubmitTestButton />
        </Box>
      </Box>

      
      
    </Box>
  );
}
