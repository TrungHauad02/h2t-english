import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
  Fade,
  Zoom
} from "@mui/material";
import { Headphones, MusicNote, ImportContacts } from "@mui/icons-material";
import AnswerQuestionSectionHistory from "./common/answerQuestion/AnswerQuestionSectionHistory";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import AudioPlayer from "./common/AudioPlayer";
import TranscriptSection from "./common/TranscriptSection";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistoryListeningTest, { QuestionItemWithMeta } from "../../hooks/useHistoryListeningTest";

interface HistoryListeningTestProps {
  testListeningIds: number[];
  submitTestId: number;
  isCompetitionTest?: boolean;
}

interface GridQuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
  isCorrect?: boolean;
}

export default function HistoryListeningTest({
  testListeningIds,
  submitTestId,
  isCompetitionTest = false,
}: HistoryListeningTestProps) {
  // Hooks
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  
  // State
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Use a ref instead of state for questionRefs to avoid re-renders
  const questionRefsRef = useRef<Record<number, HTMLDivElement | null>>({});

  // Fetch listening test data
  const {
    loading,
    error,
    listeningItems,
    allQuestions,
    setQuestionRef
  } = useHistoryListeningTest({
    testListeningIds,
    submitTestId
  });

  // For scrolling to selected question
  useEffect(() => {
    if (selectedQuestionId && questionRefsRef.current[selectedQuestionId]) {
      questionRefsRef.current[selectedQuestionId]?.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      });
      
      // Trigger animation highlight for selected question
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [selectedQuestionId]);

  // Handle question reference setting - use useCallback to prevent infinite loops
  const handleSetQuestionRef = useCallback((id: number, el: HTMLDivElement | null) => {
    // Update the ref directly without causing re-renders
    questionRefsRef.current[id] = el;
    
    // Call the hook's setQuestionRef function
    setQuestionRef(id, el);
  }, [setQuestionRef]);

  // Handle question selection
  const handleQuestionSelect = useCallback((item: GridQuestionItem) => {
    setSelectedQuestionId(item.questionId);
  }, []);

  // Transform questions to the format expected by TestQuestionGridHistory
  const questionGridItems: GridQuestionItem[] = React.useMemo(() => {
    return allQuestions.map(q => ({
      serialNumber: q.serial,
      questionId: q.id,
      partType: TestPartTypeEnum.LISTENING,
      isAnswered: !!q.selectedAnswerId,
      isCorrect: q.isCorrect
    }));
  }, [allQuestions]);

  // Loading state
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "300px", 
          width: "100%" 
        }}
      >
        <CircularProgress 
          sx={{ 
            color: isDarkMode ? color.teal400 : color.teal600 
          }} 
        />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          width: "100%",
          color: isDarkMode ? color.red400 : color.red600
        }}
      >
        <Typography variant="h6">
          Failed to load listening test data. Please try again.
        </Typography>
      </Box>
    );
  }

  // Empty state
  if (!listeningItems.length) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "300px", 
          width: "100%",
          gap: 2
        }}
      >
        <MusicNote 
          sx={{ 
            fontSize: 60, 
            color: isDarkMode ? color.gray500 : color.gray400 
          }} 
        />
        <Typography variant="h6" color={isDarkMode ? color.gray400 : color.gray600}>
          No listening items found for this test
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={!loading} timeout={400}>
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", pb: 6 }}>
        <Grid container spacing={3}>
          {/* Main Content - Listening Items */}
          <Grid item xs={12} md={9}>
            <Stack spacing={4}>
              {listeningItems.map((listeningItem, index) => (
                <Zoom key={listeningItem.id} in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Paper
                    elevation={4}
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      bgcolor: isDarkMode ? color.gray800 : color.white,
                      boxShadow: isDarkMode 
                        ? '0 8px 32px rgba(0,0,0,0.3)'
                        : '0 8px 32px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Headphones sx={{ fontSize: 32 }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            opacity: 0.95,
                          }}
                        >
                          Listening Section {index + 1}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          opacity: 0.9,
                          px: 2,
                          py: 0.5,
                          borderRadius: '12px',
                          bgcolor: 'rgba(255,255,255,0.15)',
                        }}
                      >
                        Questions {listeningItem.startSerial} - {listeningItem.endSerial}
                      </Typography>
                    </Box>

                    {/* Audio Section */}
                    <Box 
                      sx={{ 
                        p: { xs: 2, sm: 3 },
                        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                        backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: { xs: 2, sm: 3 },
                          bgcolor: isDarkMode ? color.gray800 : color.white,
                          borderRadius: '12px',
                          boxShadow: isDarkMode 
                            ? '0 2px 8px rgba(0,0,0,0.2)' 
                            : '0 2px 8px rgba(0,0,0,0.05)',
                        }} 
                      >
                        <AudioPlayer src={listeningItem.audio} />
                        {listeningItem.transcript && (
                          <Box sx={{ mt: 3 }}>
                            <TranscriptSection transcript={listeningItem.transcript} />
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Questions Section */}
                    <Box sx={{ p: { xs: 2, sm: 3 } }}>
                      <AnswerQuestionSectionHistory
                        questions={listeningItem.questions}
                        startSerial={listeningItem.startSerial}
                        submitTestId={submitTestId}
                        partId={listeningItem.id}
                        selectedQuestionId={selectedQuestionId}
                        setQuestionRef={handleSetQuestionRef}
                        isCompetitionTest={isCompetitionTest}
                      />
                    </Box>
                  </Paper>
                </Zoom>
              ))}
            </Stack>
          </Grid>

          {/* Sidebar - Question Navigation (Desktop) */}
          <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Paper
              elevation={3}
              sx={{
                position: 'sticky',
                top: 16,
                p: 2,
                borderRadius: '16px',
                bgcolor: isDarkMode ? color.gray800 : color.white,
                boxShadow: isDarkMode 
                  ? '0 4px 20px rgba(0,0,0,0.25)'
                  : '0 4px 20px rgba(0,0,0,0.06)',
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: 600,
                  borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                  pb: 1
                }}
              >
                Question Navigator
              </Typography>
              <TestQuestionGridHistory
                questionItems={questionGridItems}
                onQuestionSelect={handleQuestionSelect}
                isTitle
              />
            </Paper>
          </Grid>

          {/* Mobile Question Grid */}
          {isSmallScreen && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  bgcolor: isDarkMode ? color.gray800 : color.white,
                  boxShadow: isDarkMode 
                    ? '0 4px 20px rgba(0,0,0,0.25)'
                    : '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2, 
                    color: isDarkMode ? color.teal300 : color.teal700,
                    fontWeight: 600,
                    borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                    pb: 1
                  }}
                >
                  Questions
                </Typography>
                <TestQuestionGridHistory
                  questionItems={questionGridItems}
                  onQuestionSelect={handleQuestionSelect}
                  isTitle
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Fade>
  );
}