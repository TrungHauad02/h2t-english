import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart2 } from 'interfaces';
import {
  PartContainer,
  AudioPlayer,
  AnswerOptionsGrid,
  TranscriptBox
} from '../common';
import Part2EditDialog from './Part2EditDialog';

interface Part2SectionProps {
  questions: ToeicPart2[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart2) => void;
}

export default function Part2Section({
  questions,
  onUpdateQuestion
}: Part2SectionProps) {
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

  const handleSaveQuestion = (updatedQuestion: ToeicPart2) => {
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
        id="part2-section"
        title="Part 2: Question-Response"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Audio Player */}
            <AudioPlayer 
                audioUrl={currentQuestion.audio} 
              />
            
            {/* Answer Options */}
            <AnswerOptionsGrid
                options={["(A)", "(B)", "(C)"]}
                correctAnswer={currentQuestion.correctAnswer}
              />
            
            {/* Transcript */}
            {currentQuestion.transcript && (
               <TranscriptBox 
               transcript={currentQuestion.transcript} 
             />
            )}
          </Grid>
        </Grid>
      </PartContainer>

      {/* Edit Dialog */}
      {currentQuestion && (
        <Part2EditDialog
          open={isEditDialogOpen}
          question={currentQuestion}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
        />
      )}
    </>
  );
}