import React, { useState } from 'react';
import { Grid, Divider, Typography, Box } from '@mui/material';
import { ToeicPart7, ToeicPart7Question } from 'interfaces';
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { 
  PartContainer,
  TabNavigation,
  QuestionContent
} from '../common';
import Part7EditDialog from './Part7EditDialog';

interface Part7SectionProps {
  questions: ToeicPart7[];
  part7SubQuestions?: { [part7Id: number]: ToeicPart7Question[] };
  onUpdatePassage?: (updatedPassage: ToeicPart7, updatedQuestions: ToeicPart7Question[]) => void;
}

export default function Part7Section({
  questions,
  part7SubQuestions = {},
  onUpdatePassage
}: Part7SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentPassage = questions.length > 0 ? questions[currentPassageIndex] : null;
  const subQuestions = currentPassage ? part7SubQuestions[currentPassage.id] || [] : [];
  const currentQuestion = subQuestions.length > activeQuestionIndex ? subQuestions[activeQuestionIndex] : null;

  const onSelectPassage = (index: number) => {
    setCurrentPassageIndex(index);
    setActiveQuestionIndex(0);
    setShowExplanation(false);
  };

  const onNavigatePrevious = () => {
    if (currentPassageIndex > 0) {
      setCurrentPassageIndex(currentPassageIndex - 1);
      setActiveQuestionIndex(0);
      setShowExplanation(false);
    }
  };

  const onNavigateNext = () => {
    if (currentPassageIndex < questions.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
      setActiveQuestionIndex(0);
      setShowExplanation(false);
    }
  };

  const handleChangeQuestion = (newValue: number) => {
    setActiveQuestionIndex(newValue);
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

  const handleSavePassage = (updatedPassage: ToeicPart7, updatedQuestions: ToeicPart7Question[]) => {
    if (onUpdatePassage) {
      onUpdatePassage(updatedPassage, updatedQuestions);
    }
    handleCloseEditDialog();
  };

  if (!currentPassage || questions.length === 0) {
    return null;
  }

  // Generate tab labels for questions
  const questionTabs = subQuestions.map((_, index) => `Question ${index + 1}`);

  return (
    <>
      <PartContainer
        id="part7-section"
        title="Part 7: Reading Comprehension"
        subtitle={`Passage ${currentPassageIndex + 1} of ${questions.length}`}
        currentIndex={currentPassageIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectPassage}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog }
      >
        <Grid container spacing={3}>
          {/* Reading Passage */}
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: 'bold',
                }}
              >
                Reading Passage
              </Typography>
              
              <WEDocumentViewer 
                fileUrl={currentPassage.file}
                maxHeight="450px"
                padding="16px"
                sx={{
                  mb: 3,
                  border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`,
                  borderRadius: '0.75rem',
                }}
                fontFamily="'Times New Roman', serif"
                lineHeight="1.6"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ mb: 3 }} />
            
            {/* Questions Tabs */}
            {subQuestions.length > 0 && (
              <>
                <TabNavigation 
                  tabs={questionTabs}
                  activeTab={activeQuestionIndex}
                  onChange={handleChangeQuestion}
                  variant="scrollable"
                />
                
                {/* Question Content */}
                {currentQuestion && (
                  <QuestionContent 
                    content={currentQuestion.content}
                    questionNumber={activeQuestionIndex + 1}
                    explanation={currentQuestion.explanation}
                    showExplanation={showExplanation}
                    onToggleExplanation={toggleExplanation}
                    options={[
                      currentQuestion.answer1,
                      currentQuestion.answer2,
                      currentQuestion.answer3,
                      currentQuestion.answer4
                    ]}
                    correctAnswer={currentQuestion.correctAnswer}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </PartContainer>

      {/* Edit Dialog */}
      {currentPassage && (
        <Part7EditDialog
          open={isEditDialogOpen}
          passage={currentPassage}
          questions={subQuestions}
          onClose={handleCloseEditDialog}
          onSave={handleSavePassage}
        />
      )}
    </>
  );
}