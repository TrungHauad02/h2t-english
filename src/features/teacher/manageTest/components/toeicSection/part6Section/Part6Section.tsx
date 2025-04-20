import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Fade,
  Zoom,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip
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
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface Part6SectionProps {
  questions: ToeicPart6[];
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: ToeicPart6) => void;
  onAddQuestion?: (newQuestion: ToeicPart6) => Promise<ToeicPart6>;
  onDeleteQuestion?: (questionId: number) => void;
  onAddSubQuestion?: (parentId: number, question: ToeicQuestion) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (question: ToeicQuestion, parentId: number) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
}

export default function Part6Section({
  questions,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion
}: Part6SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubQuestionDialogOpen, setIsDeleteSubQuestionDialogOpen] = useState(false);
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');

  const current = questions.length > 0 ? questions[currentQuestionIndex] : null;
  const currentQuestionData = current ? toeicQuestions[current.id] || [] : [];
  const currentQuestion = currentQuestionData.length > activeSubQuestion ? currentQuestionData[activeSubQuestion] : null;

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

  const handleSaveQuestion = async (updatedQuestion: ToeicPart6 & {
    _changes?: {
      toAdd: ToeicQuestion[];
      toUpdate: ToeicQuestion[];
      toDelete: number[];
    }
  }) => {
    try {
      const { _changes, ...mainQuestion } = updatedQuestion;
  
      let parentId = mainQuestion.id;
  
      if (dialogMode === 'edit' && onUpdateQuestion) {
        await onUpdateQuestion(mainQuestion);
      } else if (dialogMode === 'add' && onAddQuestion) {
        const added = await onAddQuestion(mainQuestion);
        parentId = added?.id || parentId;
      }
  
      if (_changes && parentId > 0) {
        if (_changes.toUpdate.length > 0 && onUpdateSubQuestion) {
          for (const question of _changes.toUpdate) {
            await onUpdateSubQuestion(question, parentId);
          }
        }
  
        if (_changes.toAdd.length > 0 && onAddSubQuestion) {
          for (const question of _changes.toAdd) {
            await onAddSubQuestion(parentId, question);
          }
        }
  
        if (_changes.toDelete.length > 0 && onDeleteSubQuestion) {
          for (const questionId of _changes.toDelete) {
            await onDeleteSubQuestion(questionId, parentId);
          }
        }
      }
  
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };
  

  const handleDeleteQuestion = () => {
    if (current && onDeleteQuestion) {
      onDeleteQuestion(current.id);
      
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (questions.length > 1) {
        // Stay at index 0 as the next question will shift into position 0
      }
    }
    handleCloseDeleteDialog();
  };

  const handleDeleteSubQuestion = () => {
    if (subQuestionToDelete !== null && current && onDeleteSubQuestion) {
      onDeleteSubQuestion(subQuestionToDelete, current.id)
        .then(() => {
          if (activeSubQuestion >= currentQuestionData.length - 1) {
            setActiveSubQuestion(Math.max(0, currentQuestionData.length - 2));
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

  // Handle empty state
  if (!current || questions.length === 0) {
    return (
      <Container maxWidth="lg">
        <PartContainer
          id="part6-section-empty"
          title="Part 6: Text Completion"
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
            <Typography variant="h6">No passages available</Typography>
            <Typography sx={{ mt: 1 }}>Click the "Add Question" button to create your first passage.</Typography>
          </Box>
        </PartContainer>
        
        <Part6EditDialog
          open={isEditDialogOpen}
          question={emptyQuestion}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
          mode={dialogMode}
        />
      </Container>
    );
  }

  // Handle no sub-questions case
  if (!currentQuestion && currentQuestionData.length === 0) {
    return (
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
        onDeleteQuestion={onDeleteQuestion ? handleOpenDeleteDialog : undefined}
      >
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
                  backgroundColor: isDarkMode ? color.teal300 : color.teal600,
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
                backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                borderRadius: '1rem',
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
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
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              borderRadius: '1rem',
              p: 3,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
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
      </PartContainer>
    );
  }

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
        onDeleteQuestion={onDeleteQuestion ? handleOpenDeleteDialog : undefined}
      >
       {currentQuestion && (
        <>
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
                      questionNumber={activeSubQuestion + 1}
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
            </Box>
          </Paper>
        </Fade>
        </>
       )}
      </PartContainer>

      <Part6EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? { ...current, questionData: currentQuestionData } : emptyQuestion}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
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
            Are you sure you want to delete this passage? 
            This will also delete all associated questions. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteQuestion} 
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