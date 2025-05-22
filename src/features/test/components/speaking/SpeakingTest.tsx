import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  LinearProgress,
  Container,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestDialogSingle from "../common/SubmitTestDialog";
import ConfirmSubmitDialog from "../mixingAndCompetition/ConfirmSubmitDialog";
import IntroducePartTest from "../mixingAndCompetition/InroducePartTest";
import TestQuestionGrid from "../mixingAndCompetition/TestQuestionGrid";
import { TestPartTypeEnum } from "interfaces";
import useSpeakingTest from "../../hooks/useSpeakingTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { 
  QuestionCard, 
  RecordingControl, 
  NavigationFooter, 
  TestSpeakingHeader 
} from "../mixingAndCompetition/speakingSection/";
import { Test, SubmitTest } from "interfaces";
interface SpeakingTestProps {
  testSpeakings: number[];
  submitTest : SubmitTest
  test : Test,
}

export default function SpeakingTest({ testSpeakings, submitTest,test }: SpeakingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [speakingQuestions, setSpeakingQuestions] = useState<any[]>([]);
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Scroll to question if needed
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  
  const {
    currentIndex,
    questionsList,
    loading,
    error,
    allQuestions,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    handleNext,
    handlePrevious,
    startRecording,
    setQuestionRef,
    isRecording,
    recordingTime,
    audioURLs,
    hasRecording,
    saving,
    savedRecordings,
    stopRecording,
    setCurrentIndex,
    questionRefs,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog,
    getCurrentTest,
    getCurrentQuestion,
  } = useSpeakingTest(testSpeakings, submitTest.id,test.routeNodeId);

  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter(q => q.isAnswered).length;
  useEffect(() => {
    if (questionsList.length > 0) {

      const allQuestionsFlat: any[] = [];

      questionsList.forEach(item => {
        if (item.questions) {
          const testId = item.id;
     
          const questionsWithParent = item.questions.map((q: any, qIndex: number) => ({
            ...q,
            parentTestId: testId,
            parentTitle: item.title || 'Speaking Practice',
            serial: qIndex + 1,
            totalInParent: item.questions.length
          }));
          
          allQuestionsFlat.push(...questionsWithParent);
        }
      });
      
      setSpeakingQuestions(allQuestionsFlat);
    }
  }, [questionsList, currentIndex]);

  // Handle question selection
  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      

      const questionIndex = allQuestions.findIndex(q => q.id === selectedQuestionId);
      if (questionIndex !== -1) {
        setCurrentIndex(questionIndex);
        
      }
    }
  }, [selectedQuestionId, questionRefs, allQuestions, speakingQuestions,setQuestionRef]);

  // Recording functions
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Navigation with recording cleanup
  const handleNextQuestion = () => {
    if (isRecording) {
      stopRecording();
    }
    handleNext();
    
  };

  const handlePreviousQuestion = () => {
    if (isRecording) {
      stopRecording();
    }
    handlePrevious();
    
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px', 
        p: 4,
        gap: 2
      }}>
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{ 
            color: isDarkMode ? color.teal400 : color.teal600,
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500
          }}
        >
          Loading speaking test...
        </Typography>
      </Box>
    );
  }

  // Error state
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
        <Typography variant="h6">Error loading speaking test data</Typography>
      </Box>
    );
  }

  // Empty state
  if (speakingQuestions.length === 0 || !speakingQuestions[currentIndex]) {
    return (
      <Box 
        component={Paper}
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '1rem',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          mb: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
          No speaking questions available
        </Typography>
      </Box>
    );
  }


  const currentQuestion = getCurrentQuestion();
  const audioSource = audioURLs[currentIndex] || savedRecordings[currentIndex] || null;
  const currentTest = getCurrentTest()
  const progress = ((currentIndex + 1) / speakingQuestions.length) * 100;
  

  const questionCount = speakingQuestions.filter(q => q.parentTestId === currentQuestion.parentTestId).length;
  const questionIndex = speakingQuestions.filter(q => 
    q.parentTestId === currentQuestion.parentTestId && 
    speakingQuestions.indexOf(q) <= currentIndex
  ).length;
  
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
      <IntroducePartTest type={TestPartTypeEnum.SPEAKING} />
      
      <Grid container spacing={3}>
        {/* Top section with TimeRemaining and progress for both mobile and desktop */}
        <Grid item xs={12}>
        <TimeRemaining createAt={submitTest?.createdAt ? new Date(submitTest.createdAt) : new Date()}
        duration={test.duration}
        onTimeUp={handleSubmitTest} />
        </Grid>
  
        {/* Main content */}
        <Grid item xs={12} md={9} lg={8}>
          <Box
          ref={(el) => setQuestionRef(currentQuestion.id, el as HTMLDivElement)}
            component={Paper} 
            elevation={3} 
            sx={{
              bgcolor: isDarkMode ? color.gray800 : color.white,
              borderRadius: '16px',
              overflow: 'hidden',
              mx: 'auto',
              position: 'relative',
              border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
              transition: 'all 0.3s ease',
              boxShadow: isDarkMode
                ? '0 8px 24px rgba(0,0,0,0.2)'
                : '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
            <LinearProgress 
            
              variant="determinate" 
              value={progress} 
              sx={{
                height: 6,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                '& .MuiLinearProgress-bar': {
                  bgcolor: color.teal500,
                  transition: 'transform 0.4s ease',
                }
              }} 
            />
            
            {/* Test Speaking Header */}
            {currentTest && (
              <TestSpeakingHeader 
              
                test={currentTest}
                currentQuestionNumber={questionIndex}
                totalQuestions={questionCount}
              />
            )}
            
            <Box
       
              sx={{
                py: 1.5,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
              }}
            >
              <Box 
           
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: isDarkMode ? color.gray300 : color.gray700,
                  }}
                >
                  Question {allQuestions[currentIndex]?.serialNumber || currentIndex + 1}
                </Typography>
                
                <Chip
                  label={hasRecording(currentIndex) ? "Recorded" : "Not recorded"}
                  size="small"
                  sx={{
                    bgcolor: hasRecording(currentIndex) 
                      ? (isDarkMode ? color.green800 : color.green100)
                      : (isDarkMode ? color.gray600 : color.gray200),
                    color: hasRecording(currentIndex)
                      ? (isDarkMode ? color.green200 : color.green800)
                      : (isDarkMode ? color.gray300 : color.gray700),
                    borderRadius: '12px',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            </Box>
            
            <Container 
              maxWidth="md" 
              sx={{ 
                py: { xs: 2, sm: 4 },
                px: { xs: 2, sm: 3, md: 4 },
              }}
            >
   
            <QuestionCard 
              content={currentQuestion.content || ''} 
              isDarkMode={isDarkMode} 
            />
       
              
              {/* Recording controls */}
              <RecordingControl
                isRecording={isRecording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                recordingTime={recordingTime}
                formatTime={formatTime}
                saving={saving}
                audioSource={audioSource}
                isDarkMode={isDarkMode}
              />
             
            </Container>

            {/* Navigation footer */}
            <NavigationFooter
              handlePrevious={handlePreviousQuestion}
              handleNext={handleNextQuestion}
              currentIndex={currentIndex}
              totalQuestions={speakingQuestions.length}
              isDarkMode={isDarkMode}
            />
          </Box>
        </Grid>
        
        {/* Right sidebar with question grid for desktop */}
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
                  Recorded
                </Typography>
                
                <Box sx={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  bgcolor: isDarkMode ? color.gray700 : color.gray300,
                  mr: 1
                }} />
                <Typography variant="body2" sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}>
                  Not recorded
                </Typography>
              </Box>
            </Paper>
            
            <TestQuestionGrid 
              questionItems={allQuestions.map(q => ({
                serialNumber: q.serialNumber,
                questionId: q.id,
                partType: TestPartTypeEnum.SPEAKING,
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
                  partType: TestPartTypeEnum.SPEAKING,
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