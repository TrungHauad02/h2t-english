import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart5 } from 'interfaces';
import {
  PartContainer,
  QuestionContent,
  AnswerOptionsGrid
} from '../common';
import Part5EditDialog from './Part5EditDialog';

interface Part5SectionProps {
  questions: ToeicPart5[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart5) => void;
}

export default function Part5Section({
  questions,
  onUpdateQuestion
}: Part5SectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveQuestion = (updatedQuestion: ToeicPart5) => {
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
        id="part5-section"
        title="Part 5: Incomplete Sentences"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={ handleOpenEditDialog }
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Question Content */}
            <QuestionContent 
              content={currentQuestion.content}
              explanation={currentQuestion.explanation}
              showExplanation={showExplanation}
              onToggleExplanation={toggleExplanation}
            />
            

            <AnswerOptionsGrid
              options={[
                currentQuestion.answer1,
                currentQuestion.answer2,
                currentQuestion.answer3,
                currentQuestion.answer4
              ]}
              correctAnswer={currentQuestion.correctAnswer}
            />
          </Grid>
        </Grid>
      </PartContainer>

      {/* Edit Dialog */}
      {currentQuestion && (
        <Part5EditDialog
          open={isEditDialogOpen}
          question={currentQuestion}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
        />
      )}
    </>
  );
}