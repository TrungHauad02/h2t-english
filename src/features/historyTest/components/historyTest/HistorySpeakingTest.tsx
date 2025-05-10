import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
  Alert
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistorySpeakingTest from "../../hooks/useHistorySpeakingTest";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPartTypeEnum } from "interfaces";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

interface HistorySpeakingTestProps {
  testSpeakingIds: number[];
  submitTestId: number;
}

export default function HistorySpeakingTest({
  testSpeakingIds,
  submitTestId,
}: HistorySpeakingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});
  const [expandedExplanation, setExpandedExplanation] = useState<Record<number, boolean>>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

  const {
    loading,
    error,
    questions,
    recordings,
    speakingTests
  } = useHistorySpeakingTest(testSpeakingIds, submitTestId);

  useEffect(() => {
    if (selectedQuestionId) {
      setExpandedAccordions({
        [`panel-${selectedQuestionId}`]: true
      });
      
      // Scroll to question
      const element = document.getElementById(`question-${selectedQuestionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedQuestionId]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [audioElements]);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [panel]: isExpanded
    }));
    
    // Pause any playing audio when closing the accordion
    if (!isExpanded && playingAudio && playingAudio.startsWith(`audio-${panel.replace('panel-', '')}`)) {
      const audio = audioElements[playingAudio];
      if (audio) {
        audio.pause();
      }
      setPlayingAudio(null);
    }
  };

  const toggleExplanation = (questionId: number) => {
    setExpandedExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const playAudio = (audioUrl: string, questionId: number) => {
    // Pause any currently playing audio
    if (playingAudio && playingAudio !== `audio-${questionId}`) {
      const currentAudio = audioElements[playingAudio];
      if (currentAudio) {
        currentAudio.pause();
      }
    }

    // Create or get audio element
    let audioElement = audioElements[`audio-${questionId}`];
    
    if (!audioElement) {
      audioElement = new Audio(audioUrl);
      audioElement.addEventListener('ended', () => {
        setPlayingAudio(null);
      });
      
      setAudioElements(prev => ({
        ...prev,
        [`audio-${questionId}`]: audioElement
      }));
    }

    // Play or pause based on current state
    if (playingAudio === `audio-${questionId}`) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      audioElement.play();
      setPlayingAudio(`audio-${questionId}`);
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return isDarkMode ? color.emerald400 : color.emerald600;
    if (percentage >= 60) return isDarkMode ? color.teal400 : color.teal600;
    if (percentage >= 40) return isDarkMode ? color.warning : color.warning;
    return isDarkMode ? color.red400 : color.red600;
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Satisfactory";
    if (percentage >= 40) return "Needs Improvement";
    return "Insufficient";
  };
  
  const calculateMaxScore = (totalQuestions: number) => {
    // Total points for Speaking is 100 (not divided by 6)
    const sectionTotalPoints = 100;
    // Each question's max score is proportional to total questions
    return sectionTotalPoints / totalQuestions;
  };

  if (loading) {
    return (
      <Box 
        component={Paper} 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          p: 3, 
          bgcolor: isDarkMode ? color.gray800 : color.white,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200
        }}
      >
        <CircularProgress size={40} thickness={4} sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  if (error || questions.length === 0) {
    return (
      <Box 
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: '1rem',
          p: 4,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          textAlign: 'center'
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Cannot load speaking test history.
        </Alert>
        <Typography variant="body1" sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}>
          Please check the test or submission ID.
        </Typography>
      </Box>
    );
  }
  
  // Calculate max score per question based on total questions
  const totalQuestions = questions.length;
  const maxScorePerQuestion = calculateMaxScore(totalQuestions);
  const totalMaxScore = 100; // Total speaking score

  // Group questions by speaking test
  const questionsByTest: Record<number, any[]> = {};
  questions.forEach(question => {
    if (!questionsByTest[question.parentTestId]) {
      questionsByTest[question.parentTestId] = [];
    }
    questionsByTest[question.parentTestId].push(question);
  });

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: '1rem',
        width: "100%",
        p: { xs: 2, sm: 3 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} lg={8}>
          {Object.entries(questionsByTest).map(([testIdStr, testQuestions]) => {
            const testId = Number(testIdStr);
            const test = speakingTests[testId];
            
            return (
              <Box key={testId} sx={{ mb: 4 }}>
                <Box 
                  sx={{
                    bgcolor: isDarkMode ? color.teal700 : color.teal500,
                    borderRadius: "8px 8px 0 0",
                    px: 3,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: color.white, 
                      fontWeight: 600,
                      fontSize: '1.5rem'
                    }}
                  >
                    {test?.title || 'Speaking Test'}
                  </Typography>
                  <Chip 
                    label={`${testQuestions.length} Questions`}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.25)',
                      color: color.white,
                      fontWeight: 500,
                      borderRadius: '16px',
                      px: 1
                    }}
                  />
                </Box>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    borderRadius: "0 0 8px 8px",
                    overflow: 'hidden',
                    border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                    borderTop: 'none'
                  }}
                >
                  {testQuestions.map((question, index) => {
                    const audioSource = recordings[questions.indexOf(question)];
                    const isPlaying = playingAudio === `audio-${question.id}`;
                    const isExplanationExpanded = expandedExplanation[question.id] || false;
                    const isPanelExpanded = expandedAccordions[`panel-${question.id}`] || false;
                    
                    return (
                      <Accordion 
                        key={question.id}
                        id={`question-${question.id}`}
                        expanded={isPanelExpanded}
                        onChange={handleAccordionChange(`panel-${question.id}`)}
                        disableGutters
                        elevation={0}
                        sx={{
                          borderBottom: index < testQuestions.length - 1 ? `1px solid ${isDarkMode ? color.gray700 : color.gray200}` : 'none',
                          '&:before': {
                            display: 'none',
                          },
                          boxShadow: selectedQuestionId === question.id 
                            ? `0 0 10px ${isDarkMode ? color.teal500 + "80" : color.teal400 + "80"}` 
                            : 'none',
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon 
                              sx={{ 
                                color: isDarkMode ? color.teal200 : color.teal700,
                                fontSize: 24
                              }} 
                            />
                          }
                          sx={{
                            px: 3,
                            py: 1.5,
                            minHeight: '48px',
                            '& .MuiAccordionSummary-content': {
                              margin: '8px 0',
                              display: 'flex',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: 1
                            }
                          }}
                        >
                          <Typography 
                            sx={{ 
                              fontWeight: 600, 
                              color: isDarkMode ? color.teal200 : color.teal700,
                              mr: 1,
                              fontSize: '1.1rem'
                            }}
                          >
                            Question {question.serialNumber}
                          </Typography>
                          
                          {audioSource && (
                            <Chip 
                              icon={<AudiotrackIcon fontSize="small" />}
                              label="Audio Response" 
                              size="small"
                              sx={{
                                bgcolor: isDarkMode ? 'rgba(94, 234, 212, 0.1)' : 'rgba(94, 234, 212, 0.2)',
                                color: isDarkMode ? color.teal200 : color.teal700,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                borderRadius: '16px'
                              }}
                            />
                          )}
                        </AccordionSummary>
                        
                        <AccordionDetails sx={{ p: 0 }}>
                          {isPanelExpanded && (
                            <>
                              {/* Question content */}
                              <Box 
                                sx={{ 
                                  bgcolor: isDarkMode ? color.gray700 : color.gray50,
                                  p: 3,
                                  mx: 3,
                                  mb: 3,
                                  borderRadius: 1,
                                  position: 'relative'
                                }}
                              >
                                <Box sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  mb: 1
                                }}>
                                  <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      color: isDarkMode ? color.teal200 : color.teal700
                                    }}
                                  >
                                    Question Prompt
                                  </Typography>
                                  
                                  {question.explanation && (
                                    <IconButton 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExplanation(question.id);
                                      }}
                                      size="small"
                                      sx={{
                                        color: isDarkMode ? color.teal300 : color.teal600
                                      }}
                                    >
                                      <InfoIcon fontSize="small" />
                                    </IconButton>
                                  )}
                                </Box>
                                
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    color: isDarkMode ? color.gray200 : color.gray800,
                                    whiteSpace: 'pre-wrap'
                                  }}
                                >
                                  {question.content}
                                </Typography>
                                
                                {isExplanationExpanded && question.explanation && (
                                  <Box 
                                    sx={{ 
                                      mt: 2,
                                      p: 2,
                                      bgcolor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                                      borderRadius: 1,
                                      borderLeft: `3px solid ${isDarkMode ? color.teal400 : color.teal500}`
                                    }}
                                  >
                                    <Typography 
                                      variant="subtitle2" 
                                      sx={{ 
                                        mb: 0.5,
                                        color: isDarkMode ? color.teal200 : color.teal700,
                                        fontWeight: 600
                                      }}
                                    >
                                      Explanation
                                    </Typography>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        color: isDarkMode ? color.gray300 : color.gray700
                                      }}
                                    >
                                      {question.explanation}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                              
                              <Grid container spacing={2} sx={{ px: 3, mb: 3 }}>
                                {/* Audio Response section */}
                                <Grid item xs={12}>
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      color: isDarkMode ? color.teal200 : color.teal700,
                                      mb: 2,
                                      ml: 1
                                    }}
                                  >
                                    Your Response
                                  </Typography>
                                  
                                  <Box 
                                    sx={{ 
                                      p: 3,
                                      bgcolor: isDarkMode ? color.gray800 : color.white,
                                      border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                                      borderRadius: 1,
                                      mb: 2,
                                      minHeight: '80px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    {audioSource ? (
                                      <>
                                        <IconButton 
                                          onClick={() => playAudio(audioSource, question.id)}
                                          size="medium"
                                          sx={{
                                            bgcolor: isPlaying ? color.teal500 : 'rgba(20, 184, 166, 0.1)',
                                            color: isPlaying ? color.white : (isDarkMode ? color.teal300 : color.teal600),
                                            mr: 2,
                                            p: 2,
                                            '&:hover': {
                                              bgcolor: isDarkMode ? color.teal600 : color.teal400
                                            }
                                          }}
                                        >
                                          {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                                        </IconButton>
                                        <Typography variant="body1" color={isDarkMode ? color.gray300 : color.gray700}>
                                          {isPlaying ? "Playing audio..." : "Click to play your recorded answer"}
                                        </Typography>
                                      </>
                                    ) : (
                                      <Typography 
                                        variant="body1" 
                                        sx={{ 
                                          color: isDarkMode ? color.gray400 : color.gray500,
                                          fontStyle: 'italic',
                                          textAlign: 'center'
                                        }}
                                      >
                                        No audio recording available
                                      </Typography>
                                    )}
                                  </Box>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Paper>
              </Box>
            );
          })}
        </Grid>

        <Grid item md={3} lg={4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TestQuestionGridHistory
            questionItems={questions.map(q => ({
              serialNumber: q.serialNumber,
              questionId: q.id,
              partType: TestPartTypeEnum.SPEAKING,
              isAnswered: !!recordings[questions.indexOf(q)],
              isCorrect: true
            }))}
            onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
            isTitle
          />
        </Grid>

        {isSmallScreen && (
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TestQuestionGridHistory
              questionItems={questions.map(q => ({
                serialNumber: q.serialNumber,
                questionId: q.id,
                partType: TestPartTypeEnum.SPEAKING,
                isAnswered: !!recordings[questions.indexOf(q)],
                isCorrect: true
              }))}
              onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
              isTitle
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}