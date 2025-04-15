import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper,
  Fade,
  Zoom,
  Chip
} from '@mui/material';
import { ToeicQuestion, AnswerEnum, ToeicAnswer } from 'interfaces';
import {
  PartContainer,
  QuestionContent,
  AnswerOptionsGrid
} from '../common';
import Part5EditDialog from './Part5EditDialog';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SubjectIcon from '@mui/icons-material/Subject';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface Part5SectionProps {
  questions: ToeicQuestion[];
  onUpdateQuestion?: (updatedQuestion: ToeicQuestion) => void;
  onAddQuestion?: (newQuestion: ToeicQuestion) => void;
}

export default function Part5Section({
  questions,
  onUpdateQuestion,
  onAddQuestion
}: Part5SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const onSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
  };

  const onNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const onNavigateNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleOpenEditDialog = () => {
    setDialogMode('edit');
    setIsEditDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveQuestion = (updatedQuestion: ToeicQuestion) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  // Create empty question for add mode
  const createEmptyQuestion = (): ToeicQuestion => {
    const emptyAnswers: ToeicAnswer[] = Array(4).fill(null).map((_, index) => ({
      id: 0,
      content: '',
      correct: index === 0,
      questionId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    }));

    return {
      id: 0,
      content: '',
      explanation: '',
      toeicAnswers: emptyAnswers,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true
    };
  };

  if (!currentQuestion && questions.length === 0) {
    return null;
  }

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;

  return (
    <>
      <PartContainer
        id="part5-section"
        title="Part 5: Incomplete Sentences"
        subtitle="Choose the word or phrase that best completes the sentence"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
        onAddQuestion={handleOpenAddDialog}
      >
        {currentQuestion && (
          <Fade in={true} timeout={300}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: bgColor,
                borderRadius: '1rem',
                p: 3,
                mb: 2,
                border: `1px solid ${borderColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Zoom in={true}>
                <Chip
                  icon={<QuestionAnswerIcon />}
                  label={`Question ${currentQuestionIndex + 1}`}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: accentColor,
                    color: isDarkMode ? color.gray900 : color.white,
                    fontWeight: 'bold',
                    '& .MuiChip-icon': {
                      color: isDarkMode ? color.gray900 : color.white
                    }
                  }}
                />
              </Zoom>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* Question Content */}
                  <Box 
                    sx={{
                      mt: 2, 
                      mb: 3,
                      backgroundColor: cardBgColor,
                      borderRadius: '1rem',
                      border: `1px solid ${borderColor}`,
                      p: 3
                    }}
                  >
                    <Chip
                      icon={<FormatQuoteIcon />}
                      label="Question"
                      size="small"
                      sx={{
                        backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                        color: isDarkMode ? color.teal200 : color.teal800,
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    />
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 'medium',
                        mb: 2,
                        fontSize: '1.1rem',
                        color: isDarkMode ? color.gray200 : color.gray800
                      }}
                    >
                      {currentQuestion.content}
                    </Typography>
                  </Box>

                  <Box 
                    sx={{
                      backgroundColor: cardBgColor,
                      borderRadius: '1rem',
                      border: `1px solid ${borderColor}`,
                      p: 3
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                        color: isDarkMode ? color.teal300 : color.teal700
                      }}
                    >
                      <SubjectIcon />
                      Select the correct answer:
                    </Typography>

                    <AnswerOptionsGrid
                      options={currentQuestion.toeicAnswers.map((ans, i) => `(${String.fromCharCode(65 + i)}) ${ans.content}`)}
                      correctAnswer={
                        currentQuestion.toeicAnswers.findIndex(a => a.correct) === 0 ? AnswerEnum.A : 
                        currentQuestion.toeicAnswers.findIndex(a => a.correct) === 1 ? AnswerEnum.B : 
                        currentQuestion.toeicAnswers.findIndex(a => a.correct) === 2 ? AnswerEnum.C : 
                        AnswerEnum.D
                      } 
                    />
                    
                    {currentQuestion.explanation && showExplanation && (
                      <Box 
                        sx={{ 
                          mt: 3, 
                          pt: 3, 
                          borderTop: `1px solid ${borderColor}` 
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <TipsAndUpdatesIcon sx={{ color: accentColor }} />
                          <Typography 
                            fontWeight="bold" 
                            color={accentColor}
                          >
                            Explanation
                          </Typography>
                        </Box>
                        
                        <Typography 
                          sx={{ 
                            fontStyle: 'italic',
                            color: isDarkMode ? color.gray300 : color.gray700
                          }}
                        >
                          {currentQuestion.explanation}
                        </Typography>
                      </Box>
                    )}
                    
                    {currentQuestion.explanation && !showExplanation && (
                      <Box sx={{ textAlign: 'right', mt: 2 }}>
                        <Chip
                          icon={<TipsAndUpdatesIcon />}
                          label="Show Explanation"
                          onClick={toggleExplanation}
                          clickable
                          sx={{
                            backgroundColor: isDarkMode ? color.teal900 : color.teal50,
                            color: accentColor,
                            borderColor: accentColor,
                            border: '1px solid',
                            '&:hover': {
                              backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                            }
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}
      </PartContainer>

      {/* Edit/Add Dialog */}
      <Part5EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? (currentQuestion || createEmptyQuestion()) : createEmptyQuestion()}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        mode={dialogMode}
      />
    </>
  );
}