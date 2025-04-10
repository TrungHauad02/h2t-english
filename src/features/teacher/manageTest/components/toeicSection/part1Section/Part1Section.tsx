import React, { useState } from 'react';
import { 
  Grid, 
  CardMedia, 
  Box 
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ToeicPart1 } from 'interfaces';
import { 
  PartContainer, 
  AudioPlayer, 
  AnswerOptionsGrid, 
  TranscriptBox 
} from '../common';
import Part1EditDialog from './Part1EditDialog';

interface Part1SectionProps {
  questions: ToeicPart1[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart1) => void;
}

export default function Part1Section({ 
  questions,
  onUpdateQuestion
}: Part1SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveQuestion = (updatedQuestion: ToeicPart1) => {
    if (onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  if (!currentQuestion || questions.length === 0) {
    return null;
  }

  return (
    <>
      <PartContainer
        id="part1-section"
        title="Part 1: Photographs"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AudioPlayer audioUrl={currentQuestion.audio} />
            
            <AnswerOptionsGrid
              options={["(A)", "(B)", "(C)", "(D)"]}
              correctAnswer={currentQuestion.correctAnswer}
            />
            
            {currentQuestion.transcript && (
              <TranscriptBox transcript={currentQuestion.transcript} />
            )}
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              <CardMedia
                component="img"
                sx={{
                  height: '100%',
                  minHeight: 350,
                  objectFit: 'contain',
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  p: 2,
                  borderRadius: '0.5rem',
                  border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`
                }}
                image={currentQuestion.image || '/placeholder-image.jpg'}
                alt="Question Image"
              />
            </Box>
          </Grid>
        </Grid>
      </PartContainer>

      <Part1EditDialog
        open={isEditDialogOpen}
        question={currentQuestion}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
      />
    </>
  );
}