import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Divider,
  Card,
  alpha,
  useMediaQuery,
  useTheme
} from "@mui/material";
import TimeRemaining from "../common/TimeRemaining";
import SubmitTestDialogSingle from "../common/SubmitTestDialog";
import ConfirmSubmitDialog from "../mixingAndCompetition/ConfirmSubmitDialog";
import IntroducePartTest from "../mixingAndCompetition/InroducePartTest";
import TestQuestionGrid from "../mixingAndCompetition/TestQuestionGrid";
import { TestPartTypeEnum } from "interfaces";
import useWritingTest from "../../hooks/useWritingTest";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";

interface WritingTestProps {
  testWritings: number[];
  submitTestId: number;
}

export default function WritingTest({ testWritings, submitTestId }: WritingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // État local pour stocker les bài viết
  const [activeEssay, setActiveEssay] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  
  // Custom hook pour la logique principale du test
  const {
    currentIndex,
    questionsList,
    loading,
    error,
    allQuestions,
    timeUsed,
    isSubmitting,
    isSubmitDialogOpen,
    isConfirmDialogOpen,
    submissionResult,
    handleNext,
    handlePrevious,
    handleUpdateAnsweredQuestions,
    setQuestionRef,
    setCurrentIndex,
    questionRefs,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleSubmitTest,
    closeSubmitDialog,
    getWordCount,
    getCurrentPrompt,
    handleEssayChange,
    essays,
    getCurrentEssay
  } = useWritingTest(testWritings, submitTestId);

  // Statistiques pour le dialogue de confirmation
  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter(q => q.isAnswered).length;
  
  // Gérer la sélection des questions
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
  }, [selectedQuestionId, questionRefs, allQuestions, setCurrentIndex]);

  // Obtenir les informations actuelles
  const currentPrompt = getCurrentPrompt();
  const currentEssay = getCurrentEssay();
  const wordCount = getWordCount(currentEssay);
  const minWords = currentPrompt?.minWords || 200;
  const maxWords = currentPrompt?.maxWords || 500;
  const isUnderMinimum = wordCount < minWords;
  const isOverMaximum = maxWords && wordCount > maxWords;
  const currentSerialNumber = currentPrompt?.serialNumber || 1;

  // Calculer la couleur du compteur de mots
  const getWordCountColor = useCallback(() => {
    if (isUnderMinimum) return isDarkMode ? color.warningDarkMode : color.warning;
    if (isOverMaximum) return isDarkMode ? color.errorDarkMode : color.error;
    if (wordCount >= minWords && (!maxWords || wordCount <= maxWords)) 
      return isDarkMode ? color.successDarkMode : color.success;
    return isDarkMode ? color.gray400 : color.gray600;
  }, [isDarkMode, color, isUnderMinimum, isOverMaximum, wordCount, minWords, maxWords]);

  // État de chargement
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
          sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500
          }}
        >
          Loading writing test...
        </Typography>
      </Box>
    );
  }

  // État d'erreur
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
        <Typography variant="h6">Error loading writing test data</Typography>
      </Box>
    );
  }

  // État vide
  if (!currentPrompt || questionsList.length === 0) {
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
          No writing prompts available
        </Typography>
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
        mx: "auto",
      }}
    >
      <IntroducePartTest type={TestPartTypeEnum.WRITING} />
      
      <Grid container spacing={3}>
        {/* Section supérieure avec TimeRemaining */}
        <Grid item xs={12}>
          <TimeRemaining timeUsed={timeUsed} />
        </Grid>
  
        {/* Contenu principal */}
        <Grid item xs={12} md={9} lg={8}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: '1rem',
              overflow: 'hidden',
              position: 'relative',
              mb: 3,
              boxShadow: isDarkMode
                ? '0 8px 32px rgba(0,0,0,0.25)'
                : '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* En-tête du prompt */}
            <Box 
              sx={{ 
                p: { xs: 2, sm: 3 },
                backgroundColor: isDarkMode 
                  ? `linear-gradient(135deg, ${color.gray700} 0%, ${color.gray800} 100%)` 
                  : `linear-gradient(135deg, ${color.emerald50} 0%, ${color.green50} 100%)`,
                borderBottom: '1px solid',
                borderColor: isDarkMode ? color.gray700 : color.emerald100,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                }}>
                  <MenuBookIcon 
                    sx={{ 
                      color: isDarkMode ? color.emerald300 : color.emerald600
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: "bold",
                    color: isDarkMode ? color.emerald200 : color.emerald700,
                  }}
                >
                  Writing Task {currentSerialNumber} of {questionsList.length}
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  mt: 3, 
                  p: 3, 
                  borderRadius: '1rem', 
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  boxShadow: isDarkMode 
                    ? '0 4px 16px rgba(0, 0, 0, 0.25)' 
                    : '0 4px 16px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    fontWeight: 500,
                    color: isDarkMode ? color.gray200 : color.gray800,
                    mb: 3
                  }}
                >
                  {currentPrompt?.topic || "No topic available"}
                </Typography>
                
                <Divider sx={{ 
                  mb: 2,
                  borderColor: isDarkMode ? color.gray600 : color.gray300
                }} />
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
                    borderRadius: '8px',
                    p: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isDarkMode ? color.emerald800 : color.emerald100,
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, color: isDarkMode ? color.emerald200 : color.emerald700 }}>
                      i
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDarkMode ? color.emerald200 : color.emerald700,
                      fontWeight: 500
                    }}
                  >
                    {`Write at least ${minWords} words and at most ${maxWords} words.`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Section de rédaction */}
            <Box 
              sx={{ 
                p: { xs: 2, sm: 3 },
                backgroundColor: isDarkMode ? color.gray800 : color.white,
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2.5,
                gap: 1.5
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  flexShrink: 0
                }}>
                  <CreateIcon 
                    fontSize="small"
                    sx={{ 
                      color: isDarkMode ? color.emerald300 : color.emerald600
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: isDarkMode ? color.gray100 : color.gray900,
                  }}
                >
                  Your Response
                </Typography>
              </Box>
              
              <TextField 
                fullWidth 
                multiline 
                rows={isMobile ? 10 : 16}
                value={currentEssay} 
                onChange={(e) => handleEssayChange(e.target.value)} 
                placeholder="Start writing your response here..." 
                variant="outlined"
                sx={{ 
                  backgroundColor: isDarkMode ? alpha(color.gray900, 0.4) : alpha(color.gray50, 0.5),
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '8px',
                    color: isDarkMode ? color.gray200 : 'inherit',
                    '& fieldset': { 
                      borderColor: isDarkMode ? color.gray600 : color.gray300,
                      borderWidth: '1px',
                    }, 
                    '&:hover fieldset': { 
                      borderColor: isDarkMode ? color.emerald300 : color.emerald400,
                      borderWidth: '1px',
                    }, 
                    '&.Mui-focused fieldset': { 
                      borderColor: isDarkMode ? color.emerald400 : color.emerald500,
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    padding: '16px',
                  } 
                }} 
              />
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 2, 
                  mb: 1
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: isUnderMinimum || isOverMaximum ? 600 : 400,
                    color: getWordCountColor(),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ 
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    mr: 1,
                    bgcolor: getWordCountColor(),
                  }}/>
                  {`Word Count: ${wordCount}`}
                  {isUnderMinimum && (
                    <Box component="span" sx={{ 
                      ml: 1, 
                      color: isDarkMode ? color.warningDarkMode : color.warning,
                      fontWeight: 600,
                    }}>
                      {`(${minWords - wordCount} more needed)`}
                    </Box>
                  )}
                  {isOverMaximum && (
                    <Box component="span" sx={{ 
                      ml: 1, 
                      color: isDarkMode ? color.errorDarkMode : color.error,
                      fontWeight: 600,
                    }}>
                      {`(${wordCount - maxWords} over limit)`}
                    </Box>
                  )}
                </Typography>
                
                {saving && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress 
                      size={16} 
                      thickness={6}
                      sx={{ 
                        color: isDarkMode ? color.emerald400 : color.emerald600,
                        mr: 1
                      }} 
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isDarkMode ? color.emerald300 : color.emerald700,
                      }}
                    >
                      Saving...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            
            {/* Barre de navigation */}
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                p: 2,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                borderTop: '1px solid',
                borderTopColor: isDarkMode ? color.gray600 : color.gray200,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                sx={{
                  borderRadius: '8px',
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                  color: isDarkMode ? color.gray300 : color.gray600,
                  bgcolor: isDarkMode ? alpha(color.gray800, 0.5) : alpha(color.white, 0.8),
                  '&:hover': {
                    bgcolor: isDarkMode ? alpha(color.gray700, 0.8) : alpha(color.gray100, 0.8),
                    borderColor: isDarkMode ? color.gray500 : color.gray400,
                  },
                  '&.Mui-disabled': {
                    borderColor: isDarkMode ? color.gray700 : color.gray200,
                    color: isDarkMode ? color.gray600 : color.gray400,
                  },
                  px: 3,
                  py: 1
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                disabled={currentIndex === questionsList.length - 1}
                sx={{
                  borderRadius: '8px',
                  bgcolor: isDarkMode ? color.emerald600 : color.emerald500,
                  color: 'white',
                  '&:hover': {
                    bgcolor: isDarkMode ? color.emerald700 : color.emerald600,
                  },
                  '&.Mui-disabled': {
                    bgcolor: isDarkMode ? color.gray700 : color.gray300,
                    color: isDarkMode ? color.gray500 : color.gray500,
                  },
                  px: 4,
                  py: 1,
                  boxShadow: isDarkMode ? 
                    '0 4px 12px rgba(20, 184, 166, 0.3)' : 
                    '0 4px 12px rgba(20, 184, 166, 0.2)'
                }}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Barre latérale droite avec grille de questions pour desktop */}
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
                    color: isDarkMode ? color.emerald300 : color.emerald700,
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
                  bgcolor: isDarkMode ? color.emerald700 : color.emerald600,
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
                partType: TestPartTypeEnum.WRITING,
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
        
        {/* Grille de questions mobile en bas */}
        {isSmallScreen && (
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <TestQuestionGrid 
                questionItems={allQuestions.map(q => ({
                  serialNumber: q.serialNumber,
                  questionId: q.id,
                  partType: TestPartTypeEnum.WRITING,
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

      {/* Utilisation de SubmitTestDialogSingle au lieu de SubmitTestDialog */}
      <SubmitTestDialogSingle 
        open={isSubmitDialogOpen}
        onClose={closeSubmitDialog}
        isLoading={isSubmitting}
        result={submissionResult}
        testName="Writing"
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