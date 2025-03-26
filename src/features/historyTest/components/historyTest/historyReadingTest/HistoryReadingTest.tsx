import {
    Box,
    Stack,
    Typography,
    Divider,
    useMediaQuery,
    CircularProgress,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { SubmitTestAnswer, TestReading } from "interfaces";
  import { testService } from "features/test/services/testServices";
  import WEDocumentViewer from "components/display/document/WEDocumentViewer";
  import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
  import NavigationControls from "../common/NavigationControls";
  import CommentTest from "../common/CommentTest";
  import ScoreDisplay from "../common/ScoreDisplay";
  interface HistoryReadingTestProps {
    testReadings: TestReading[];
    submitAnswers: SubmitTestAnswer[];
  }
  
  export default function HistoryReadingTest({
    testReadings,
    submitAnswers,
  }: HistoryReadingTestProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionsList, setQuestionsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    const isMobile = useMediaQuery((theme: any) =>
      theme.breakpoints.down("md")
    );
  
    useEffect(() => {
      async function fetchQuestions() {
        try {
          setLoading(true);
          setError(false);
          let currentSerial = 1;
          const fetchedQuestions = await Promise.all(
            testReadings.map(async (reading) => {
              const questions = await testService.getQuestionsByIds(
                reading.questions
              );
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
        <ScoreDisplay score={42} total={50} />
     
        <NavigationControls
          currentIndex={currentIndex}
          totalItems={totalReadings}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
           <CommentTest 
        text = {"Please review your answer carefully and consider improving your grammar, structure, or coherence where needed."}
        />
  
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>
            Cannot load data. Try again
          </Typography>
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
              <Box
                sx={{
                  width: isMobile ? "100%" : "50%",
                  p: 2,
                  overflowY: "auto",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Questions {currentReading.startSerial} -{" "}
                  {currentReading.endSerial}
                </Typography>
                <WEDocumentViewer
                  fileUrl={currentReading.file}
                  lineHeight="2"
                />
              </Box>
  
              {!isMobile && (
                <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ccc" }} />
              )}
  
              <Box
                sx={{
                  width: isMobile ? "100%" : "50%",
                  p: 2,
                  overflowY: "auto",
                }}
              >
                <AnswerQuestionSection
                  questions={currentReading.questions}
                  startSerial={currentReading.startSerial}
                  submitAnswers={submitAnswers}
                />
              </Box>
            </Stack>
          )
        )}
      </Box>
    );
  }
  