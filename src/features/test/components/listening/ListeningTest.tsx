import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Collapse,
  IconButton,
  Divider,
  Fade,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AnswerQuestionSection from "../common/answerQuestion/AnswerQuestionSection";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestDialogSingle from "../common/SubmitTestDialog";
import ConfirmSubmitDialog from "../mixingAndCompetition/ConfirmSubmitDialog";
import IntroducePartTest from "../mixingAndCompetition/InroducePartTest";
import TestQuestionGrid from "../mixingAndCompetition/TestQuestionGrid";
import { TestPartTypeEnum } from "interfaces";
import useListeningTest from "../../hooks/useListeningTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Test, SubmitTest } from "interfaces";
interface ListeningTestProps {
  testListenings: number[];
  submitTest : SubmitTest
  test: Test ;
}

export default function ListeningTest({ testListenings, submitTest,test }: ListeningTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  

  const [audioExpandedMap, setAudioExpandedMap] = useState<Record<number, boolean>>({});

  const [isPlayingMap, setIsPlayingMap] = useState<Record<number, boolean>>({});

  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
  
  const {
    questionsList,
    loading,
    error,
    allQuestions,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    questionRefs,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog
  } = useListeningTest(testListenings, submitTest.id);

  // Stats for confirm dialog
  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter(q => q.isAnswered).length;
  
  // Scroll to question if needed
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  
  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedQuestionId, questionRefs, loading]);
  
  // Initialize audio expanded states to true for all listenings
  useEffect(() => {
    if (questionsList && questionsList.length > 0) {
      const initialExpandedState: Record<number, boolean> = {};
      questionsList.forEach((_, index) => {
        initialExpandedState[index] = true;
      });
      setAudioExpandedMap(initialExpandedState);
    }
  }, [questionsList]);
  

  const toggleAudio = (index: number) => {
    setAudioExpandedMap(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;
    
    if (isPlayingMap[index]) {
      audio.pause();
      setIsPlayingMap(prev => ({
        ...prev,
        [index]: false
      }));
    } else {
 
      Object.keys(audioRefs.current).forEach(key => {
        const keyNum = Number(key);
        if (keyNum !== index && audioRefs.current[keyNum]) {
          audioRefs.current[keyNum]?.pause();
          setIsPlayingMap(prev => ({
            ...prev,
            [keyNum]: false
          }));
        }
      });
      
      audio.play();
      setIsPlayingMap(prev => ({
        ...prev,
        [index]: true
      }));
    }
  };
  
  // Register audio events
  useEffect(() => {
    if (!questionsList || !questionsList.length) return;
    
    questionsList.forEach((item, index) => {
      const audio = audioRefs.current[index];
      if (!audio) return;
      
      const updateProgress = () => {
        if (audio.duration) {
          setProgressMap(prev => ({
            ...prev,
            [index]: (audio.currentTime / audio.duration) * 100
          }));
        }
      };
      
      const handleEnded = () => {
        setIsPlayingMap(prev => ({
          ...prev,
          [index]: false
        }));
        setProgressMap(prev => ({
          ...prev,
          [index]: 0
        }));
      };
      
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    });
  }, [questionsList]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px', 
        p: 4 
      }}>
        <CircularProgress sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        component={Paper}
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '1rem',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          color: isDarkMode ? color.red500 : color.red600,
          mb: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6">Error loading listening test data</Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: '1rem',
        width: "100%",
        p: { xs: 2, sm: 3 },
        maxWidth: "1200px",
        mx: "auto"
      }}
    >
      <IntroducePartTest type={TestPartTypeEnum.LISTENING} />
      
      <Grid container spacing={3}>
  
        <Grid item xs={12}>
        <TimeRemaining createAt={submitTest?.createdAt ? new Date(submitTest.createdAt) : new Date()}
        duration={test.duration}
        onTimeUp={handleSubmitTest} />
        </Grid>
        
        {/* Main content */}
        <Grid item xs={12} md={9} lg={8}>
          {questionsList.map((listeningItem, index) => (
            <Paper 
              key={index}
              elevation={3}
              sx={{
                borderRadius: '1rem',
                overflow: 'hidden',
                bgcolor: isDarkMode ? color.gray800 : color.white,
                mb: 4,
                boxShadow: isDarkMode 
                  ? '0 8px 24px rgba(0,0,0,0.2)' 
                  : '0 8px 24px rgba(0,0,0,0.1)',
              }}
            >
              {/* Audio Player Section */}
              <Box 
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderBottom: '1px solid',
                  borderColor: isDarkMode ? color.gray700 : color.gray300,
                  background: isDarkMode 
                    ? `linear-gradient(135deg, ${color.gray700} 0%, ${color.gray800} 100%)` 
                    : `linear-gradient(135deg, ${color.teal50} 0%, ${color.emerald50} 100%)`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: "bold",
                      color: isDarkMode ? color.teal200 : color.teal700,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <HeadphonesIcon sx={{ mr: 1 }} />
                    Listening {index + 1} of {questionsList.length}
                  </Typography>
                  
                  <IconButton 
                    onClick={() => toggleAudio(index)} 
                    sx={{ 
                      color: isDarkMode ? color.teal300 : color.teal600,
                      backgroundColor: isDarkMode 
                        ? 'rgba(94, 234, 212, 0.1)' 
                        : 'rgba(20, 184, 166, 0.1)',
                      '&:hover': {
                        backgroundColor: isDarkMode 
                          ? 'rgba(94, 234, 212, 0.2)' 
                          : 'rgba(20, 184, 166, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                      transform: audioExpandedMap[index] ? 'rotate(0deg)' : 'rotate(180deg)'
                    }}
                  >
                    {audioExpandedMap[index] 
                      ? <KeyboardDoubleArrowUpIcon /> 
                      : <KeyboardDoubleArrowDownIcon />
                    }
                  </IconButton>
                </Box>

                <Collapse in={!!audioExpandedMap[index]} timeout="auto">
                  <Box 
                    sx={{ 
                      mt: 2, 
                      p: 2.5, 
                      borderRadius: '1rem', 
                      bgcolor: isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: isDarkMode 
                        ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <IconButton 
                        onClick={() => togglePlay(index)}
                        sx={{
                          color: 'white',
                          bgcolor: isDarkMode ? color.teal700 : color.teal600,
                          '&:hover': {
                            bgcolor: isDarkMode ? color.teal600 : color.teal500,
                          },
                          width: 56,
                          height: 56,
                          transition: 'transform 0.2s ease',
                          '&:active': {
                            transform: 'scale(0.95)'
                          }
                        }}
                      >
                        {isPlayingMap[index] ? <PauseIcon fontSize="medium" /> : <PlayArrowIcon fontSize="medium" />}
                      </IconButton>
                      
                      <Box 
                        sx={{ 
                          flex: 1, 
                          mx: 2, 
                          height: '12px', 
                          borderRadius: '6px', 
                          bgcolor: isDarkMode ? color.gray700 : color.gray200,
                          overflow: 'hidden',
                          position: 'relative',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Box 
                          sx={{ 
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${progressMap[index] || 0}%`,
                            bgcolor: isDarkMode 
                              ? `linear-gradient(90deg, ${color.teal600} 0%, ${color.teal400} 100%)` 
                              : `linear-gradient(90deg, ${color.teal700} 0%, ${color.teal500} 100%)`,
                            borderRadius: '6px',
                            transition: 'width 0.1s linear',
                            boxShadow: '0 0 4px rgba(94, 234, 212, 0.4)'
                          }}
                        />
                      </Box>
                      
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: isDarkMode ? color.gray300 : color.gray700,
                          ml: 1,
                          width: 50,
                          textAlign: 'right',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end'
                        }}
                      >
                        {(progressMap[index] || 0) === 100 
                          ? <CheckCircleOutlineIcon 
                              fontSize="small" 
                              sx={{ 
                                color: isDarkMode ? color.teal400 : color.teal600,
                                animation: 'pulse 1.5s ease-in-out'
                              }} 
                            /> 
                          : `${Math.round(progressMap[index] || 0)}%`}
                      </Typography>
                    </Box>
                    
                    <audio
                      ref={(el) => {
                        audioRefs.current[index] = el;
                      }}
                      src={listeningItem.audio}
                    />

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontStyle: 'italic', 
                        mt: 1.5, 
                        color: isDarkMode ? color.gray400 : color.gray600,
                        textAlign: 'center'
                      }}
                    >
                      Listen carefully and answer the questions below
                    </Typography>
                  </Box>
                </Collapse>
                
                {!audioExpandedMap[index] && (
                  <Fade in={!audioExpandedMap[index]}>
                    <Box 
                      sx={{ 
                        mt: 2, 
                        p: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderRadius: '0.5rem',
                        bgcolor: isDarkMode 
                          ? 'rgba(94, 234, 212, 0.1)' 
                          : 'rgba(20, 184, 166, 0.1)',
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: isDarkMode ? color.teal300 : color.teal700,
                          fontWeight: 500
                        }}
                      >
                        Click the button above to show audio controls
                      </Typography>
                    </Box>
                  </Fade>
                )}
              </Box>

              {/* Questions Section */}
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: "bold", 
                    mb: 2,
                    color: isDarkMode ? color.gray100 : color.gray900,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Box component="span" sx={{ 
                    color: isDarkMode ? color.teal400 : color.teal600,
                    mr: 1
                  }}>
                    Questions {listeningItem.startSerial}-{listeningItem.endSerial}
                  </Box>
                </Typography>
                
                <Divider sx={{ 
                  mb: 3,
                  borderColor: isDarkMode ? color.gray700 : color.gray300
                }} />
                
                <AnswerQuestionSection 
                  questions={listeningItem.questions} 
                  startSerial={listeningItem.startSerial} 
                  submitTestId={submitTest.id}
                  partId={listeningItem.id}
                  selectedQuestionId={selectedQuestionId}
                  setQuestionRef={setQuestionRef}
                  setAnsweredQuestions={handleUpdateAnsweredQuestions}
                />
              </Box>
            </Paper>
          ))}
        </Grid>
        
        {/* Right sidebar with question grid */}
        <Grid 
          item 
          md={3} 
          lg={4} 
          sx={{ 
            display: { xs: 'none', md: 'block' }, 
            position: 'sticky', 
            top: 16, 
            height: 'fit-content', 
            alignSelf: 'flex-start' 
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: '1rem',
                backgroundColor: isDarkMode 
                  ? 'rgba(31, 41, 55, 0.7)' 
                  : 'rgba(255, 255, 255, 0.9)',
                boxShadow: isDarkMode 
                  ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                mb: 3
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 1
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 600,
                    color: isDarkMode ? color.teal300 : color.teal700,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                  Navigation
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? color.gray300 : color.gray700,
                  mb: 1
                }}
              >
                Use the grid below to navigate between questions. Click on a question number to jump to it.
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 2,
                mb: 1
              }}>
                <Box sx={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  bgcolor: isDarkMode ? color.teal700 : color.teal600,
                  mr: 1
                }} />
                <Typography variant="body2" sx={{ mr: 2, color: isDarkMode ? color.gray300 : color.gray600 }}>
                  Answered
                </Typography>
                
                <Box sx={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  bgcolor: isDarkMode ? color.gray700 : color.gray300,
                  mr: 1
                }} />
                <Typography variant="body2" sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}>
                  Not yet answered
                </Typography>
              </Box>
            </Paper>
            
            <TestQuestionGrid 
              questionItems={allQuestions.map(q => ({
                serialNumber: q.serialNumber,
                questionId: q.id,
                partType: TestPartTypeEnum.READING,
                isAnswered: q.isAnswered
              }))}
              onQuestionSelect={(item) => {
                setSelectedQuestionId(item.questionId);
              }}
              onSubmitTest={handleOpenConfirmDialog}
              isTitle={true}
            />
          </Box>
        </Grid>
        
        {/* Mobile question grid at bottom */}
        {isSmallScreen && (
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <TestQuestionGrid 
                     key={submitTest.id}
                questionItems={allQuestions.map(q => ({
                  serialNumber: q.serialNumber,
                  questionId: q.id,
                  partType: TestPartTypeEnum.LISTENING,
                  isAnswered: q.isAnswered
                }))}
                onQuestionSelect={(item) => {
                  setSelectedQuestionId(item.questionId);
                }}
                onSubmitTest={handleOpenConfirmDialog}
                isTitle={true}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Sử dụng SubmitTestDialogSingle thay vì SubmitTestDialog */}
      <SubmitTestDialogSingle
        open={isSubmitDialogOpen}
        submitTestId={submitTest.id}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
      />

      {/* Confirm Submit Dialog */}
      <ConfirmSubmitDialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleSubmitTest}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
}