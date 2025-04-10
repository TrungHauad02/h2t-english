import React, { useState } from 'react';
import { Grid, Box, Tabs, Tab, CardMedia, Divider, Paper } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ToeicPart3_4, AnswerEnum } from 'interfaces';
import { 
  PartContainer, 
  AudioPlayer, 
  QuestionContent,
  AnswerOptionsGrid,
  TranscriptBox
} from '../common';
import Part3_4EditDialog from './Part3_4EditDialog';

interface Part3_4SectionProps {
  questions: ToeicPart3_4[];
  partNumber: 3 | 4; // To differentiate between Part 3 and Part 4
  onUpdateQuestion?: (updatedQuestion: ToeicPart3_4) => void;
}

export default function Part3_4Section({
  questions,
  partNumber,
  onUpdateQuestion
}: Part3_4SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0); // 0, 1, 2 for three sub-questions
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const onSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setActiveSubQuestion(0); // Reset to first sub-question
  };

  const onNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setActiveSubQuestion(0); // Reset to first sub-question
    }
  };

  const onNavigateNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveSubQuestion(0); // Reset to first sub-question
    }
  };

  const handleChangeSubQuestion = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSubQuestion(newValue);
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleSaveQuestion = (updatedQuestion: ToeicPart3_4) => {
    if (onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  // Get the correct sub-question content and answers
  const getSubQuestionContent = (index: number) => {
    if (!currentQuestion) return { content: '', answers: [], correctAnswer: AnswerEnum.A };

    let content: string, answers: string[], correctAnswer: AnswerEnum;
    
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
        break;
      default:
        content = '';
        answers = [];
        correctAnswer = AnswerEnum.A;
    }

    return { content, answers, correctAnswer };
  };

  if (!currentQuestion || questions.length === 0) {
    return null;
  }

  const activeSubQuestionData = getSubQuestionContent(activeSubQuestion);
  const partTitle = partNumber === 3 ? "Part 3: Conversations" : "Part 4: Talks";
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const bgColor = isDarkMode ? color.gray800 : color.gray50;
  const cardBgColor = isDarkMode ? color.gray900 : color.white;

  return (
    <>
      <PartContainer
        id={`part${partNumber}-section`}
        title={partTitle}
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
      >
        <Grid container spacing={3}>
          {/* Left Side - Audio and Transcript */}
          <Grid item xs={12} md={currentQuestion.image ? 6 : 12}>
              {/* Audio Player */}
              <AudioPlayer 
                audioUrl={currentQuestion.audio}
              />
              
              {/* Transcript */}
              <TranscriptBox 
                  transcript={currentQuestion.transcript}
                />
          </Grid>
          
          {/* Right Side - Image (if available) */}
          {currentQuestion.image && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{ 
                  backgroundColor: bgColor,
                  borderRadius: '1rem',
                  p: 3,
                  border: `1px solid ${borderColor}`,
                  height: '100%'
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: '100%',
                    minHeight: 300,
                    maxHeight: 400,
                    objectFit: 'contain',
                    backgroundColor: cardBgColor,
                    p: 2,
                    borderRadius: '0.75rem',
                    border: `1px solid ${borderColor}`
                  }}
                  image={currentQuestion.image}
                  alt="Reference Image"
                />
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ 
              my: 3,
              borderColor: borderColor
            }} />
            
            {/* Sub-Questions Container */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: bgColor,
                borderRadius: '1rem',
                border: `1px solid ${borderColor}`,
                overflow: 'hidden',
                mb: 3
              }}
            >
              {/* Sub-Questions Tabs */}
              <Tabs 
                value={activeSubQuestion} 
                onChange={handleChangeSubQuestion}
                variant="fullWidth"
                sx={{
                  borderBottom: `1px solid ${borderColor}`,
                  '& .MuiTabs-indicator': {
                    backgroundColor: accentColor,
                    height: 3
                  },
                  '& .MuiTab-root': {
                    color: isDarkMode ? color.gray400 : color.gray500,
                    fontWeight: 'bold',
                    py: 2,
                    '&.Mui-selected': {
                      color: accentColor,
                    },
                  },
                }}
              >
                <Tab label="Question 1" />
                <Tab label="Question 2" />
                <Tab label="Question 3" />
              </Tabs>
              
              {/* Question Content and Answer Options */}
              <Box sx={{ p: 3 }}>
                <QuestionContent 
                  content={activeSubQuestionData.content}
                  questionNumber={activeSubQuestion + 1}
                />
                
                {/* Answer Options */}
                <AnswerOptionsGrid
                  options={activeSubQuestionData.answers.map((answer, index) => 
                    `(${String.fromCharCode(65 + index)}) ${answer}`
                  )}
                  correctAnswer={activeSubQuestionData.correctAnswer}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </PartContainer>

      {/* Edit Dialog - Using Refactored Version */}
      {currentQuestion && (
        <Part3_4EditDialog
          open={isEditDialogOpen}
          question={currentQuestion}
          partNumber={partNumber}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
        />
      )}
    </>
  );
}