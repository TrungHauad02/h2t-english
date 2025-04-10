import React, { useState } from 'react';
import { Grid, Divider } from '@mui/material';
import { ToeicPart6, AnswerEnum } from 'interfaces';
import WEDocumentViewer from "components/display/document/WEDocumentViewer"; 
import { 
  PartContainer, 
  TabNavigation,
  QuestionContent
} from '../common';
import Part6EditDialog from './Part6EditDialog';

interface Part6SectionProps {
  questions: ToeicPart6[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart6) => void;
}

export default function Part6Section({
  questions,
  onUpdateQuestion
}: Part6SectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0); // 0, 1, 2, 3 for four sub-questions
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const onSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setActiveSubQuestion(0);
    setShowExplanation(false);
  };

  const onNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setActiveSubQuestion(0);
      setShowExplanation(false);
    }
  };

  const onNavigateNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveSubQuestion(0);
      setShowExplanation(false);
    }
  };

  const handleChangeSubQuestion = (newValue: number) => {
    setActiveSubQuestion(newValue);
    setShowExplanation(false);
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

  const handleSaveQuestion = (updatedQuestion: ToeicPart6) => {
    if (onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  const getSubQuestionContent = (index: number) => {
    if (!currentQuestion) return { content: '', answers: [], correctAnswer: AnswerEnum.A, explanation: '' };

    let content: string, answers: string[], correctAnswer: AnswerEnum, explanation: string;
    
    switch (index) {
      case 0:
        content = currentQuestion.contentQuestion1;
        answers = [
          currentQuestion.answer1Q1,
          currentQuestion.answer2Q1,
          currentQuestion.answer3Q1,
          currentQuestion.answer4Q1
        ];
        correctAnswer = currentQuestion.correctAnswer1;
        explanation = currentQuestion.explanationQuestion1;
        break;
      case 1:
        content = currentQuestion.contentQuestion2;
        answers = [
          currentQuestion.answer1Q2,
          currentQuestion.answer2Q2,
          currentQuestion.answer3Q2,
          currentQuestion.answer4Q2
        ];
        correctAnswer = currentQuestion.correctAnswer2;
        explanation = currentQuestion.explanationQuestion2;
        break;
      case 2:
        content = currentQuestion.contentQuestion3;
        answers = [
          currentQuestion.answer1Q3,
          currentQuestion.answer2Q3,
          currentQuestion.answer3Q3,
          currentQuestion.answer4Q3
        ];
        correctAnswer = currentQuestion.correctAnswer3;
        explanation = currentQuestion.explanationQuestion3;
        break;
      case 3:
        content = currentQuestion.contentQuestion4;
        answers = [
          currentQuestion.answer1Q4,
          currentQuestion.answer2Q4,
          currentQuestion.answer3Q4,
          currentQuestion.answer4Q4
        ];
        correctAnswer = currentQuestion.correctAnswer4;
        explanation = currentQuestion.explanationQuestion4;
        break;
      default:
        content = '';
        answers = [];
        correctAnswer = AnswerEnum.A;
        explanation = '';
    }

    return { content, answers, correctAnswer, explanation };
  };

  if (!currentQuestion || questions.length === 0) {
    return null;
  }

  const activeSubQuestionData = getSubQuestionContent(activeSubQuestion);

  return (
    <>
      <PartContainer
        id="part6-section"
        title="Part 6: Text Completion"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Document Viewer */}
            <WEDocumentViewer 
              fileUrl={currentQuestion.file}
              maxHeight="400px"
              padding="16px"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ mb: 3 }} />
            
            {/* Sub-Questions Tabs */}
            <TabNavigation 
              tabs={['Question 1', 'Question 2', 'Question 3', 'Question 4']}
              activeTab={activeSubQuestion}
              onChange={handleChangeSubQuestion}
              variant="fullWidth"
            />
            
            {/* Question Content */}
            <QuestionContent 
              content={activeSubQuestionData.content}
              questionNumber={activeSubQuestion + 1}
              explanation={activeSubQuestionData.explanation}
              showExplanation={showExplanation}
              onToggleExplanation={toggleExplanation}
              options={activeSubQuestionData.answers}
              correctAnswer={activeSubQuestionData.correctAnswer}
            />
          </Grid>
        </Grid>
      </PartContainer>

      {/* Edit Dialog */}
      {currentQuestion && (
        <Part6EditDialog
          open={isEditDialogOpen}
          question={currentQuestion}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
        />
      )}
    </>
  );
}