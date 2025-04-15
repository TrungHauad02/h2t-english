import React, { useState } from 'react';
import { 
  Grid, 
  Divider, 
  Typography, 
  Box, 
  Paper,
  Chip,
  Fade,
  Zoom,
  IconButton,
  Tooltip
} from '@mui/material';
import { ToeicPart7, ToeicQuestion, AnswerEnum } from 'interfaces';
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { 
  PartContainer,
  TabNavigation,
  QuestionContent,
  AnswerOptionsGrid
} from '../common';
import Part7EditDialog from './Part7EditDialog';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import DescriptionIcon from '@mui/icons-material/Description';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface Part7SectionProps {
  questions: ToeicPart7[];
  toeicQuestions?: { [part7Id: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedPassage: ToeicPart7, updatedQuestions: ToeicQuestion[]) => void;
  onAddQuestion?: (newPassage: ToeicPart7, newQuestions: ToeicQuestion[]) => void;
}

export default function Part7Section({
  questions,
  toeicQuestions = {},
  onUpdateQuestion,
  onAddQuestion
}: Part7SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');
  const [layoutMode, setLayoutMode] = useState<'split' | 'fullscreen'>('split');

  const currentPassage = questions.length > 0 ? questions[currentPassageIndex] : null;
  const subQuestions = currentPassage ? toeicQuestions[currentPassage.id] || [] : [];
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

  const handleSavePassage = (updatedPassage: ToeicPart7, updatedQuestions: ToeicQuestion[]) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedPassage, updatedQuestions);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedPassage, updatedQuestions);
    }
    handleCloseEditDialog();
  };
  
  const toggleLayoutMode = () => {
    setLayoutMode(prev => prev === 'split' ? 'fullscreen' : 'split');
  };

  // Create empty passage and questions for add mode
  const emptyPassage: ToeicPart7 = {
    id: 0,
    file: '',
    questions: [],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const emptyQuestions: ToeicQuestion[] = [];

  if (!currentPassage && questions.length === 0 && dialogMode !== 'add') {
    return null;
  }

  // Styling
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;

  // Generate tab labels for questions
  const questionTabs = subQuestions.map((_, index) => `Question ${index + 1}`);

  return (
    <>
      <PartContainer
        id="part7-section"
        title="Part 7: Reading Comprehension"
        subtitle={`Read the passage and answer the questions - Passage ${currentPassageIndex + 1} of ${questions.length}`}
        currentIndex={currentPassageIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectPassage}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
        onAddQuestion={handleOpenAddDialog}
      >
        {currentPassage && (
          <Grid container spacing={3}>
            {/* Reading Passage */}
            <Grid item xs={12} >
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
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: isDarkMode ? color.teal300 : color.teal700,
                        fontWeight: 'bold'
                      }}
                    >
                      <MenuBookIcon />
                      Reading Passage
                    </Typography>
                    
                    <Zoom in={true}>
                      <Chip
                        icon={<DescriptionIcon />}
                        label={`Passage ${currentPassageIndex + 1}`}
                        color="primary"
                        sx={{
                          backgroundColor: accentColor,
                          color: isDarkMode ? color.gray900 : color.white,
                          fontWeight: 'bold',
                          '& .MuiChip-icon': {
                            color: isDarkMode ? color.gray900 : color.white
                          }
                        }}
                      />
                    </Zoom>
                  </Box>
                  
                 
                    <WEDocumentViewer 
                      fileUrl={currentPassage.file}
                      maxHeight={layoutMode === 'fullscreen' ? '650px' : '550px'}
                      padding="16px"
                      sx={{
                        borderRadius: '0.75rem',
                      }}
                      fontFamily="'Times New Roman', serif"
                      lineHeight="1.6"
                    />
                </Paper>
              </Fade>
            </Grid>
            
            {/* Questions Section */}
            <Grid item xs={12} >
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
                    height: '100%'
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
                        tabs={questionTabs}
                        activeTab={activeQuestionIndex}
                        onChange={handleChangeQuestion}
                        variant="scrollable"
                      />
                    </Box>

                    {currentQuestion && (
                      <Box
                        sx={{
                          backgroundColor: cardBgColor,
                          borderRadius: '1rem',
                          border: `1px solid ${borderColor}`,
                          p: 3,
                          maxHeight: '400px',
                          overflowY: 'auto'
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
                            questionNumber={activeQuestionIndex + 1}
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
                    )}
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        )}
      </PartContainer>

      {/* Edit Dialog */}
      <Part7EditDialog
        open={isEditDialogOpen}
        passage={dialogMode === 'edit' ? currentPassage || emptyPassage : emptyPassage}
        questions={dialogMode === 'edit' ? subQuestions : emptyQuestions}
        onClose={handleCloseEditDialog}
        onSave={handleSavePassage}
        mode={dialogMode}
      />
    </>
  );
}