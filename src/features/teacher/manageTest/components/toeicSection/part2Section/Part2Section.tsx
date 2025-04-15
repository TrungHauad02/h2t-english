import React, { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Fade,
  Zoom
} from '@mui/material';
import { ToeicPart2, AnswerEnum } from 'interfaces';
import {
  PartContainer,
  AudioPlayer,
  AnswerOptionsGrid,
  TranscriptBox
} from '../common';
import Part2EditDialog from './Part2EditDialog';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface Part2SectionProps {
  questions: ToeicPart2[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart2) => void;
  onAddQuestion?: (newQuestion: ToeicPart2) => void;
}

export default function Part2Section({
  questions,
  onUpdateQuestion,
  onAddQuestion
}: Part2SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const onSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const onNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const onNavigateNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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

  const handleSaveQuestion = (updatedQuestion: ToeicPart2) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  // Create empty question for add mode
  const createEmptyQuestion = (): ToeicPart2 => {
    return {
      id: 0,
      audio: '',
      transcript: '',
      correctAnswer: AnswerEnum.A,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  };

  if (!currentQuestion && questions.length === 0 && dialogMode !== 'add') {
    return null;
  }

  // Styling
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;

  // Map string correctAnswer to AnswerEnum
  const getCorrectAnswerEnum = (answer: string): AnswerEnum => {
    switch (answer) {
      case 'A': return AnswerEnum.A;
      case 'B': return AnswerEnum.B;
      case 'C': return AnswerEnum.C;
      case 'D': return AnswerEnum.D;
      default: return AnswerEnum.A;
    }
  };

  return (
    <>
      <PartContainer
        id="part2-section"
        title="Part 2: Question-Response"
        subtitle="Listen to a question and select the best response"
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

              <Grid container spacing={4}>
                {/* Audio Player */}
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      mb: 2,
                      color: isDarkMode ? color.teal300 : color.teal700,
                      fontWeight: 'bold'
                    }}
                  >
                    <HeadphonesIcon />
                    Listen to the Question
                  </Typography>
                  
                  <Box sx={{
                    backgroundColor: cardBgColor,
                    borderRadius: '1rem',
                    p: 2,
                    border: `1px solid ${borderColor}`,
                    mb: 3
                  }}>
                    <AudioPlayer 
                      audioUrl={currentQuestion.audio}
                    />
                  </Box>
                </Grid>

                {/* Answer Options */}
                <Grid item xs={12} md={7}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      mb: 2,
                      color: isDarkMode ? color.teal300 : color.teal700,
                      fontWeight: 'bold'
                    }}
                  >
                    <QuestionAnswerIcon />
                    Select the Correct Response
                  </Typography>
                  
                  <Box sx={{
                    backgroundColor: cardBgColor,
                    borderRadius: '1rem',
                    p: 3,
                    border: `1px solid ${borderColor}`,
                    height: '100%'
                  }}>
                    <AnswerOptionsGrid
                      options={["(A)", "(B)", "(C)"]}
                      correctAnswer={getCorrectAnswerEnum(currentQuestion.correctAnswer)}
                      columns={1}
                    />
                  </Box>
                </Grid>

                {/* Transcript */}
                <Grid item xs={12} md={5}>
                  {currentQuestion.transcript && (
                    <>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          mb: 2,
                          color: isDarkMode ? color.teal300 : color.teal700,
                          fontWeight: 'bold'
                        }}
                      >
                        <TextSnippetIcon />
                        Transcript
                      </Typography>
                      
                      <Box sx={{
                        backgroundColor: cardBgColor,
                        borderRadius: '1rem',
                        p: 3,
                        border: `1px solid ${borderColor}`,
                        height: '100%'
                      }}>
                        <TranscriptBox
                          transcript={currentQuestion.transcript}
                        />
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}
      </PartContainer>

      {/* Edit/Add Dialog */}
      <Part2EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? (currentQuestion || createEmptyQuestion()) : createEmptyQuestion()}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        mode={dialogMode}
      />
    </>
  );
}