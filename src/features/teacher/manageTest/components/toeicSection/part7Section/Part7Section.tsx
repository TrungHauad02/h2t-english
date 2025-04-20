import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper,
  Chip,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
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
  onDeleteQuestion?: (questionId: number) => void;
  onAddSubQuestion?: (parentId: number, question: ToeicQuestion) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (question: ToeicQuestion, parentId: number) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
}

export default function Part7Section({
  questions,
  toeicQuestions = {},
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion
}: Part7SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubQuestionDialogOpen, setIsDeleteSubQuestionDialogOpen] = useState(false);
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
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
  
  const toggleLayoutMode = () => {
    setLayoutMode(prev => prev === 'split' ? 'fullscreen' : 'split');
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
  
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenDeleteSubQuestionDialog = (subQuestionId: number) => {
    setSubQuestionToDelete(subQuestionId);
    setIsDeleteSubQuestionDialogOpen(true);
  };

  const handleCloseDeleteSubQuestionDialog = () => {
    setIsDeleteSubQuestionDialogOpen(false);
    setSubQuestionToDelete(null);
  };

  const handleSavePassage = (updatedPassage: ToeicPart7, updatedQuestions: ToeicQuestion[]) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedPassage, updatedQuestions);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedPassage, updatedQuestions);
    }
    handleCloseEditDialog();
  };

  const handleDeletePassage = () => {
    if (currentPassage && onDeleteQuestion) {
      onDeleteQuestion(currentPassage.id);
      
      if (currentPassageIndex > 0) {
        setCurrentPassageIndex(currentPassageIndex - 1);
      } else if (questions.length > 1) {
        // Stay at index 0 as the next passage will shift into position 0
      }
    }
    handleCloseDeleteDialog();
  };

  const handleDeleteSubQuestion = () => {
    if (subQuestionToDelete !== null && currentPassage && onDeleteSubQuestion) {
      onDeleteSubQuestion(subQuestionToDelete, currentPassage.id)
        .then(() => {
          if (activeQuestionIndex >= subQuestions.length - 1) {
            setActiveQuestionIndex(Math.max(0, subQuestions.length - 2));
          }
          handleCloseDeleteSubQuestionDialog();
        })
        .catch(error => {
          console.error('Error deleting sub-question:', error);
          handleCloseDeleteSubQuestionDialog();
        });
    } else {
      handleCloseDeleteSubQuestionDialog();
    }
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

  // Handle empty state - no passages available
  if (!currentPassage && questions.length === 0 && dialogMode !== 'add') {
    return (
      <Container maxWidth="lg">
        <PartContainer
          id="part7-section-empty"
          title="Part 7: Reading Comprehension"
          subtitle="No passages available. Please add a passage to get started."
          currentIndex={0}
          totalItems={0}
          onSelectQuestion={() => {}}
          onPrevious={() => {}}
          onNext={() => {}}
          onEditQuestion={undefined}
          onAddQuestion={handleOpenAddDialog}
          onDeleteQuestion={undefined}
          showNavigation={false}
        >
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            color: isDarkMode ? color.gray400 : color.gray600
          }}>
            <MenuBookIcon sx={{ fontSize: 64, mb: 2, opacity: 0.6 }} />
            <Typography variant="h6">No reading passages available</Typography>
            <Typography sx={{ mt: 1 }}>Click the "Add Question" button to create your first reading passage.</Typography>
          </Box>
        </PartContainer>
        
        <Part7EditDialog
          open={isEditDialogOpen}
          passage={emptyPassage}
          questions={emptyQuestions}
          onClose={handleCloseEditDialog}
          onSave={handleSavePassage}
          mode={dialogMode}
        />
      </Container>
    );
  }

  // Handle case when passage exists but no questions
  if (currentPassage && subQuestions.length === 0) {
    return (
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
        onDeleteQuestion={onDeleteQuestion ? handleOpenDeleteDialog : undefined}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Fade in={true} timeout={300}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  borderRadius: '1rem',
                  p: 3,
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
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
                        backgroundColor: isDarkMode ? color.teal300 : color.teal600,
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
                  maxHeight="550px"
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
          
          <Grid item xs={12}>
            <Fade in={true} timeout={300}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: isDarkMode ? color.gray800 : color.white,
                  borderRadius: '1rem',
                  p: 3,
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
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
                
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  color: isDarkMode ? color.gray400 : color.gray600,
                  backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                  borderRadius: '1rem',
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
                  p: 4
                }}>
                  <QuestionAnswerIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                  <Typography>No questions available for this passage.</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Edit this passage to add questions.
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </PartContainer>
    );
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
        onDeleteQuestion={onDeleteQuestion ? handleOpenDeleteDialog : undefined}
      >
        {currentPassage && (
          <Grid container spacing={3}>
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
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip title={layoutMode === 'split' ? "Full screen view" : "Split view"}>
                        <IconButton 
                          size="small" 
                          onClick={toggleLayoutMode}
                          sx={{ 
                            color: accentColor,
                            backgroundColor: isDarkMode ? color.gray900 : color.gray100,
                            '&:hover': {
                              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                            }
                          }}
                        >
                          {layoutMode === 'split' ? <FullscreenIcon /> : <FullscreenExitIcon />}
                        </IconButton>
                      </Tooltip>
                      
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                          <Box sx={{ flex: 1 }}>
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
                          
                          {onDeleteSubQuestion && (
                            <Tooltip title="Delete this sub-question">
                              <Button
                                color="error"
                                variant="outlined"
                                size="small"
                                onClick={() => handleOpenDeleteSubQuestionDialog(currentQuestion.id)}
                                sx={{
                                  ml: 2,
                                  minWidth: 32,
                                  height: 32,
                                  borderColor: isDarkMode ? color.red400 : color.red600,
                                  color: isDarkMode ? color.red400 : color.red600,
                                  '&:hover': {
                                    backgroundColor: isDarkMode ? `${color.red900}33` : color.red50,
                                    borderColor: isDarkMode ? color.red300 : color.red500
                                  }
                                }}
                              >
                                Delete Sub-question
                              </Button>
                            </Tooltip>
                          )}
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

      <Part7EditDialog
        open={isEditDialogOpen}
        passage={dialogMode === 'edit' ? currentPassage || emptyPassage : emptyPassage}
        questions={dialogMode === 'edit' ? subQuestions : emptyQuestions}
        onClose={handleCloseEditDialog}
        onSave={handleSavePassage}
        mode={dialogMode}
      />
      
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this reading passage? 
            This will also delete all associated questions. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePassage} 
            color="error" 
            variant="contained"
            sx={{
              backgroundColor: color.delete,
              '&:hover': {
                backgroundColor: isDarkMode ? color.red700 : color.red600
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={isDeleteSubQuestionDialogOpen}
        onClose={handleCloseDeleteSubQuestionDialog}
        aria-labelledby="delete-subquestion-dialog-title"
        aria-describedby="delete-subquestion-dialog-description"
      >
        <DialogTitle id="delete-subquestion-dialog-title">
          Confirm Sub-question Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-subquestion-dialog-description">
            Are you sure you want to delete this sub-question? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteSubQuestionDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteSubQuestion} 
            color="error" 
            variant="contained"
            sx={{
              backgroundColor: color.delete,
              '&:hover': {
                backgroundColor: isDarkMode ? color.red700 : color.red600
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}