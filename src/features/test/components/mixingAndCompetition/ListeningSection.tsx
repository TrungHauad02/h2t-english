import { Box, Stack, Typography, CircularProgress, Paper, Collapse, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import { testListeningService, questionService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { TestListening } from "interfaces";

interface ListeningSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
}

export default function ListeningSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial
}: ListeningSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [listeningItems, setListeningItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedTranscripts, setExpandedTranscripts] = useState<Record<number, boolean>>({});
  
  // Refs để scroll đến câu hỏi được chọn
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchListeningItems() {
      try {
        setLoading(true);
        
        // Fetch listening items
        const listeningItemsResponse = await testListeningService.getByIds(testItemIds);
        const items = listeningItemsResponse.data || [];
        
        let currentSerial = startSerial;
        
        // Fetch questions for each listening item
        const listeningItemsWithQuestions = await Promise.all(
          items.map(async (item: TestListening) => {
            if (item.questions && item.questions.length > 0) {
              const questionsResponse = await questionService.getByIds(item.questions);
              
              // Store current serial number for this item
              const itemStartSerial = currentSerial;
              
              // Update current serial for next item
              currentSerial += item.questions.length;
              
              return {
                ...item,
                questions: questionsResponse.data || [],
                startSerial: itemStartSerial
              };
            }
            return item;
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

  const toggleTranscript = (index: number) => {
    setExpandedTranscripts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
        const { audio, transcript, questions, startSerial: itemStartSerial } = listeningItem;
        
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
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <IconButton 
                    onClick={() => toggleTranscript(index)}
                    sx={{ 
                      color: isDarkMode ? color.teal400 : color.teal600,
                      mr: 1,
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(94, 234, 212, 0.1)' : 'rgba(20, 184, 166, 0.1)',
                      }
                    }}
                  >
                    <TextsmsIcon />
                  </IconButton>
                  <Typography 
                    variant="body2" 
                    sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                  >
                    {expandedTranscripts[index] ? 'Hide transcript' : 'Show transcript'}
                  </Typography>
                </Box>
                
                <Collapse in={expandedTranscripts[index]} timeout="auto" unmountOnExit>
                  <Box 
                    sx={{ 
                      mt: 2, 
                      p: 2, 
                      bgcolor: isDarkMode ? color.gray900 : color.gray50,
                      borderRadius: '0.5rem',
                      border: '1px solid',
                      borderColor: isDarkMode ? color.gray700 : color.gray300,
                    }}
                  >
                    <Typography sx={{ whiteSpace: 'pre-line', color: isDarkMode ? color.gray300 : color.gray700 }}>
                      {transcript}
                    </Typography>
                  </Box>
                </Collapse>
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
                Questions {itemStartSerial} - {itemStartSerial + questions.length - 1}
              </Typography>
              
              <AnswerQuestionSection 
                questions={questions} 
                startSerial={itemStartSerial} 
                submitTestId={submitTestId}
                partId={partId}
                selectedQuestionId={selectedQuestionId}
                setQuestionRef={setQuestionRef}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}