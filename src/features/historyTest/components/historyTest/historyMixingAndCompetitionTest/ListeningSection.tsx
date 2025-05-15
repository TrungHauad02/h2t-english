import { Box, Stack, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { Headphones } from "@mui/icons-material";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSectionHistory";
import AudioPlayer from "../common/AudioPlayer";
import TranscriptSection from "../common/TranscriptSection";
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
  isCompetitionTest?: boolean;
}

export default function ListeningSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
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
        
        const listeningItemsWithQuestions = await Promise.all(
          items.map(async (item: TestListening) => {
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
      {listeningItems.map((listeningItem, index) => {
        const { audio, questions, startSerial: itemStartSerial, transcript } = listeningItem;
        
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
                  ? `linear-gradient(135deg, ${color.teal900}, ${color.teal800})`
                  : `linear-gradient(135deg, ${color.teal500}, ${color.teal600})`,
                color: color.white,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Headphones sx={{ fontSize: 32 }} />
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

            {/* Audio Section */}
            <Box sx={{ p: 3, borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}` }}>
              <AudioPlayer src={audio} />
              {transcript && <TranscriptSection transcript={transcript} />}
            </Box>

            {/* Questions Section */}
            <Box sx={{ p: 3 }}>
              <AnswerQuestionSection 
                questions={questions} 
                startSerial={itemStartSerial} 
                submitTestId={submitTestId}
                partId={partId}
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