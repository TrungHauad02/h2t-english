import { Box, Stack, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { MenuBook } from "@mui/icons-material";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSectionHistory";
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
  isCompetitionTest?: boolean;
}

export default function ReadingSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
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
        
        const readingItemsResponse = await testReadingService.getByIdsAndStatus(testItemIds, true);
        const items = readingItemsResponse.data || [];
        
        let currentSerial = startSerial;
        
        const readingItemsWithQuestions = await Promise.all(
          items.map(async (item: TestReading) => {
            if (item.questions && item.questions.length > 0) {
              const questionsResponse = await questionService.getByIdsAndStatus(item.questions, true);
              
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
    <Box sx={{ pb: 4 }}>
      {readingItems.map((readingItem, index) => {
        const { file, questions, startSerial: itemStartSerial } = readingItem;
        
        return (
          <Paper 
            key={index}
            elevation={4}
            sx={{
              mb: 5,
              borderRadius: '20px',
              overflow: 'hidden',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0,0,0,0.3)'
                : '0 8px 32px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: isDarkMode 
                  ? '0 12px 40px rgba(0,0,0,0.4)'
                  : '0 12px 40px rgba(0,0,0,0.12)',
              },
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                p: 3,
                background: isDarkMode 
                  ? `linear-gradient(135deg, ${color.emerald900}, ${color.emerald800})`
                  : `linear-gradient(135deg, ${color.emerald500}, ${color.emerald600})`,
                color: color.white,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <MenuBook sx={{ fontSize: 32 }} />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 'auto',
                    fontWeight: 600,
                    opacity: 0.95,
                  }}
                >
                  Questions {itemStartSerial} - {itemStartSerial + questions.length - 1}
                </Typography>
              </Stack>
            </Box>

            {/* Document Section */}
            <Box 
              sx={{ 
                p: 3,
                borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                backgroundColor: isDarkMode ? color.gray800 : color.gray50,
              }}
            >
              <WEDocumentViewer 
                fileUrl={file} 
                lineHeight="2" 
                sx={{ 
                  p: 3,
                  bgcolor: isDarkMode ? color.gray900 : color.white,
                  borderRadius: '12px',
                  boxShadow: isDarkMode 
                    ? '0 2px 8px rgba(0,0,0,0.2)' 
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  '& .document-viewer': {
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.1rem',
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }
                }} 
              />
            </Box>

            {/* Questions Section */}
            <Box sx={{ p: 3 }}>
              <AnswerQuestionSection 
                questions={questions} 
                startSerial={itemStartSerial} 
                submitTestId={submitTestId}
                partId={readingItem.id}
                selectedQuestionId={selectedQuestionId}
                setQuestionRef={setQuestionRef}
                isCompetitionTest={isCompetitionTest}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}