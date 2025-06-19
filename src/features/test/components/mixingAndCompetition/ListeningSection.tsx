import { Box, Stack, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import { testListeningService, questionService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestListening } from "interfaces";

interface ListeningSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
  isCompetitionTest?: boolean;
}

export default function ListeningSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
  setAnsweredQuestions,
  isCompetitionTest = false,
}: ListeningSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [listeningItems, setListeningItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchListeningItems() {
      try {
        setLoading(true);
    
        const listeningItemsResponse = await testListeningService.getByIdsAndStatus(testItemIds, true);
        const items = listeningItemsResponse.data || [];
        
        let currentSerial = startSerial;
        
        // Fetch questions for each listening item
        const listeningItemsWithQuestions = await Promise.all(
          items.map(async (item: TestListening) => {
            if (item.questions && item.questions.length > 0) {
              const questionsResponse = await questionService.getByIdsAndStatus(item.questions, true);
              const questions = questionsResponse.data || [];
              
              const itemStartSerial = currentSerial;
              const itemEndSerial = currentSerial + questions.length - 1;
              
              // Add serial number to each question
              const questionsWithSerial = questions.map((question: any, qIndex: number) => ({
                ...question,
                serialNumber: currentSerial + qIndex
              }));
              
              currentSerial += questions.length;
              
              return {
                ...item,
                questions: questionsWithSerial,
                startSerial: itemStartSerial,
                endSerial: itemEndSerial
              };
            }
            return {
              ...item,
              questions: [],
              startSerial: currentSerial,
              endSerial: currentSerial
            };
          })
        );
        
        setListeningItems(listeningItemsWithQuestions);
      } catch (error) {
        console.error("Error fetching listening items:", error);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds && testItemIds.length > 0) {
      fetchListeningItems();
    }
  }, [testItemIds, startSerial]);

  // Function to store references to each question element
  const setQuestionRef = (id: number, element: HTMLDivElement | null) => {
    questionRefs.current[id] = element;
  };

  // Scroll to selected question when it changes
  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId, loading]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  return (
    <Box>
      {listeningItems.map((listeningItem, index) => {
        const { audio, questions, startSerial: itemStartSerial, endSerial: itemEndSerial } = listeningItem;
        
        return (
          <Paper 
            key={index}
            elevation={3}
            sx={{
              mb: 4,
              borderRadius: '1rem',
              overflow: 'hidden',
              bgcolor: isDarkMode ? color.gray800 : color.white,
            }}
          >
            <Stack 
              sx={{ 
                p: { xs: 2, sm: 3 },
                borderBottom: '1px solid',
                borderColor: isDarkMode ? color.gray700 : color.gray300
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: "bold", 
                  mb: 2,
                  color: isDarkMode ? color.gray100 : color.gray900
                }}
              >
                Listening {index + 1}
              </Typography>
              
              <Box sx={{ p: 1 }}>
                <audio 
                  controls 
                  style={{ 
                    width: "100%", 
                    borderRadius: "8px", 
                    backgroundColor: isDarkMode ? color.gray900 : color.gray200,
                  }}
                >
                  <source src={audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Box>
            </Stack>

            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: "bold", 
                  mb: 2,
                  color: isDarkMode ? color.gray100 : color.gray900
                }}
              >
                Questions {itemStartSerial}{questions.length > 1 ? ` - ${itemEndSerial}` : ''}
              </Typography>
              
              <AnswerQuestionSection 
                questions={questions} 
                startSerial={itemStartSerial} 
                submitTestId={submitTestId}
                partId={partId}
                selectedQuestionId={selectedQuestionId}
                setQuestionRef={setQuestionRef}
                setAnsweredQuestions={setAnsweredQuestions}
                isCompetitionTest={isCompetitionTest}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}