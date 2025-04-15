import React, { useState } from 'react';
import { 
  Grid, 
  Divider, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Fade,
  Zoom
} from '@mui/material';
import { AnswerEnum, ToeicPart6, ToeicQuestion } from 'interfaces';
import WEDocumentViewer from "components/display/document/WEDocumentViewer"; 
import { 
  PartContainer, 
  TabNavigation,
  QuestionContent,
  AnswerOptionsGrid
} from '../common';
import Part6EditDialog from './Part6EditDialog';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArticleIcon from '@mui/icons-material/Article';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface Part6SectionProps {
  questions: ToeicPart6[];
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: ToeicPart6) => void;
  onAddQuestion?: (newQuestion: ToeicPart6) => void;
}

export default function Part6Section({
  questions,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion
}: Part6SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');

  const current = questions[currentQuestionIndex];
  const currentQuestionData = toeicQuestions[current?.id] || [];
  const currentQuestion = currentQuestionData[activeSubQuestion];

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

  const handleSaveQuestion = (updatedQuestion: ToeicPart6) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  if (!current || !currentQuestion) {
    return null;
  }

  // Create an empty question for add mode
  const emptyQuestion: ToeicPart6 & { questionData: ToeicQuestion[] } = {
    id: 0,
    file: '',
    questions: [],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    questionData: []
  };

  // Styling
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;

  return (
    <>
      <PartContainer
        id="part6-section"
        title="Part 6: Text Completion"
        subtitle="Read the text and choose the best word or phrase for each blank"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
        onAddQuestion={handleOpenAddDialog}
      >
        <Fade in={true} timeout={300}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: bgColor,
              borderRadius: '1rem',
              p: 3,
              border: `1px solid ${borderColor}`,
              position: 'relative',
              overflow: 'hidden',
              mb: 3
            }}
          >
            <Zoom in={true}>
              <Chip
                icon={<ArticleIcon />}
                label={`Passage ${currentQuestionIndex + 1}`}
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
              Text Passage
            </Typography>

            <Box 
              sx={{
                backgroundColor: cardBgColor,
                borderRadius: '1rem',
                border: `1px solid ${borderColor}`,
                p: 0,
                overflow: 'hidden'
              }}
            >
              <WEDocumentViewer 
                fileUrl={current.file}
                maxHeight="400px"
                padding="16px"
                fontFamily="'Times New Roman', serif"
                lineHeight="1.5"
              />
            </Box>
          </Paper>
        </Fade>

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
              Questions
            </Typography>

            <Box>
              <Box 
                sx={{
                  backgroundColor: cardBgColor,
                  borderRadius: '1rem',
                  border: `1px solid ${borderColor}`,
                  p: 2,
                  mb: 3
                }}
              >
                <TabNavigation 
                  tabs={currentQuestionData.map((_, i) => `Question ${i + 1}`)}
                  activeTab={activeSubQuestion}
                  onChange={handleChangeSubQuestion}
                  variant="fullWidth"
                />
              </Box>

              <Box
                sx={{
                  backgroundColor: cardBgColor,
                  borderRadius: '1rem',
                  border: `1px solid ${borderColor}`,
                  p: 3
                }}
              >
                <Box sx={{ mb: 3 }}>
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
                  
                  <QuestionContent
                    content={currentQuestion.content}
                    questionNumber={activeSubQuestion + 1}
                  />
                </Box>

                <AnswerOptionsGrid
                  options={currentQuestion.toeicAnswers.map((ans, i) => 
                    `(${String.fromCharCode(65 + i)}) ${ans.content}`
                  )}
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
            </Box>
          </Paper>
        </Fade>
      </PartContainer>

      <Part6EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? { ...current, questionData: currentQuestionData } : emptyQuestion}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        mode={dialogMode}
      />
    </>
  );
}