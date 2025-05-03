import { Box, Stack, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import { testReadingService, questionService } from "services/test";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestReading } from "interfaces";

interface ReadingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
  isCompetitionTest?: boolean;
}

export default function ReadingSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
  setAnsweredQuestions,
  isCompetitionTest = false,
}: ReadingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [readingItems, setReadingItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchReadingItems() {
      try {
        setLoading(true);
        
        const readingItemsResponse = await testReadingService.getByIds(testItemIds);
        const items = readingItemsResponse.data || [];
        
        let currentSerial = startSerial;
        
        const readingItemsWithQuestions = await Promise.all(
          items.map(async (item: TestReading) => {
            if (item.questions && item.questions.length > 0) {
              const questionsResponse = await questionService.getByIds(item.questions);
              
              const itemStartSerial = currentSerial;
             
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
        
        setReadingItems(readingItemsWithQuestions);
      } catch (error) {
        console.error("Error fetching reading items:", error);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds && testItemIds.length > 0) {
      fetchReadingItems();
    }
  }, [testItemIds, startSerial]);

  const setQuestionRef = (id: number, element: HTMLDivElement | null) => {
    questionRefs.current[id] = element;
  };

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
      {readingItems.map((readingItem, index) => {
        const { file, questions, startSerial: itemStartSerial } = readingItem;
        
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
                Reading Passage {index + 1}
              </Typography>
              
              <Box sx={{ p: 1 }}>
                <WEDocumentViewer 
                  fileUrl={file} 
                  lineHeight="2" 
                  sx={{ 
                    my: 2,
                    p: 2,
                    bgcolor: isDarkMode ? color.gray900 : color.gray50,
                    borderRadius: '0.5rem'
                  }} 
                />
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
                partId={readingItem.id}
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