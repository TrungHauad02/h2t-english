import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useMemo, 
  useRef 
} from 'react';
import { 
  Grid, 
  Box, 
  Tabs, 
  Tab, 
  CardMedia, 
  Divider, 
  Paper,
  Typography,
  Fade,
  Zoom,
  Stack,
  Chip,
  Tooltip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CampaignIcon from '@mui/icons-material/Campaign';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum, ToeicPart3_4, ToeicQuestion } from 'interfaces';
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
  partNumber: 3 | 4;
  toeicQuestions: { [partId: number]: ToeicQuestion[] };
  onUpdateQuestion?: (updatedQuestion: ToeicPart3_4) => void;
  onAddQuestion?: (newQuestion: ToeicPart3_4)  => Promise<ToeicPart3_4>;
  onDeleteQuestion?: (questionId: number) => void;
  onAddSubQuestion?: (parentId: number, question: ToeicQuestion) => Promise<ToeicQuestion>;
  onUpdateSubQuestion?: (question: ToeicQuestion, parentId: number) => Promise<ToeicQuestion>;
  onDeleteSubQuestion?: (questionId: number, parentId: number) => Promise<void>;
}

export default function Part3_4Section({
  questions,
  partNumber,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onAddSubQuestion,
  onUpdateSubQuestion,
  onDeleteSubQuestion
}: Part3_4SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubQuestionDialogOpen, setIsDeleteSubQuestionDialogOpen] = useState(false);
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [currentSubQuestions, setCurrentSubQuestions] = useState<ToeicQuestion[]>([]);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');
  
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  const currentQuestion = useMemo(() => 
    questions.length > 0 ? questions[currentQuestionIndex] : null, 
    [questions, currentQuestionIndex]
  );

  useEffect(() => {
    if (currentQuestion) {
      const subQuestions = toeicQuestions[currentQuestion.id] || [];
      setCurrentSubQuestions(subQuestions);
      setActiveSubQuestion(0);
    }
  }, [currentQuestion, toeicQuestions]);

  useEffect(() => {
    const handleScrollFix = () => {
      try {
        if (tabsRef.current) {
          tabsRef.current.scrollLeft = 0;
        }
        if (tabContainerRef.current) {
          tabContainerRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.warn('Scroll reset failed', error);
      }
    };

    const timeoutId = setTimeout(handleScrollFix, 100);

    return () => clearTimeout(timeoutId);
  }, [activeSubQuestion, currentQuestionIndex]);

  const onSelectQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    setActiveSubQuestion(0);
  }, []);

  const onNavigatePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setActiveSubQuestion(0);
    }
  }, [currentQuestionIndex]);

  const onNavigateNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setActiveSubQuestion(0);
    }
  }, [currentQuestionIndex, questions.length]);

  const handleChangeSubQuestion = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      try {
        setActiveSubQuestion(newValue);
      } catch (error) {
        console.warn('Error changing sub-question', error);
      }
    }, 
    []
  );

  const handleOpenEditDialog = useCallback(() => {
    setDialogMode('edit');
    setIsEditDialogOpen(true);
  }, []);

  const handleOpenAddDialog = useCallback(() => {
    setDialogMode('add');
    setIsEditDialogOpen(true);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
  }, []);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  const handleOpenDeleteSubQuestionDialog = useCallback((subQuestionId: number) => {
    setSubQuestionToDelete(subQuestionId);
    setIsDeleteSubQuestionDialogOpen(true);
  }, []);

  const handleCloseDeleteSubQuestionDialog = useCallback(() => {
    setIsDeleteSubQuestionDialogOpen(false);
    setSubQuestionToDelete(null);
  }, []);

  const handleSaveQuestion = useCallback(
    async (updatedQuestion: ToeicPart3_4 & {
      _changes?: {
        toAdd: ToeicQuestion[];
        toUpdate: ToeicQuestion[];
        toDelete: number[];
      };
      subQuestions?: ToeicQuestion[];
    }) => {
      try {
        const { _changes, subQuestions, ...mainQuestion } = updatedQuestion;
  
        if (dialogMode === 'edit' && onUpdateQuestion) {
          await onUpdateQuestion(mainQuestion);
  
          if (_changes && mainQuestion.id > 0) {
            if (_changes.toUpdate.length > 0 && onUpdateSubQuestion) {
              await Promise.all(
                _changes.toUpdate.map(q => onUpdateSubQuestion(q, mainQuestion.id))
              );
            }
  
            if (_changes.toAdd.length > 0 && onAddSubQuestion) {
              await Promise.all(
                _changes.toAdd.map(q => onAddSubQuestion(mainQuestion.id, q))
              );
            }
  
            if (_changes.toDelete.length > 0 && onDeleteSubQuestion) {
              await Promise.all(
                _changes.toDelete.map(id => onDeleteSubQuestion(id, mainQuestion.id))
              );
            }
          }
        }
  
        if (dialogMode === 'add' && onAddQuestion) {
          const newQuestion = await onAddQuestion(mainQuestion);
  
          if (subQuestions && newQuestion?.id && onAddSubQuestion) {
            await Promise.all(
              subQuestions.map(q => onAddSubQuestion(newQuestion.id, q))
            );
          }
        }
  
        handleCloseEditDialog();
      } catch (error) {
        console.error("Error saving question:", error);
      }
    },
    [
      dialogMode,
      onUpdateQuestion,
      onAddQuestion,
      onAddSubQuestion,
      onUpdateSubQuestion,
      onDeleteSubQuestion,
      handleCloseEditDialog
    ]
  );
  
  const handleDeleteQuestion = useCallback(() => {
    if (currentQuestion && onDeleteQuestion) {
      onDeleteQuestion(currentQuestion.id);
      
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else if (questions.length > 1) {
        // Stay at index 0 as the next question will shift into position 0
      }
    }
    handleCloseDeleteDialog();
  }, [currentQuestion, onDeleteQuestion, currentQuestionIndex, questions.length, handleCloseDeleteDialog]);

  const handleDeleteSubQuestion = useCallback(() => {
    if (subQuestionToDelete !== null && currentQuestion && onDeleteSubQuestion) {
      onDeleteSubQuestion(subQuestionToDelete, currentQuestion.id)
        .then(() => {
          if (activeSubQuestion >= currentSubQuestions.length - 1) {
            setActiveSubQuestion(Math.max(0, currentSubQuestions.length - 2));
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
  }, [subQuestionToDelete, currentQuestion, onDeleteSubQuestion, activeSubQuestion, currentSubQuestions.length, handleCloseDeleteSubQuestionDialog]);

  const createEmptyQuestion = useCallback((): ToeicPart3_4 => {
    return {
      id: 0,
      audio: '',
      image: '',
      transcript: '',
      questions: [],
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }, []);

  const partTitle = partNumber === 3 ? "Part 3: Conversations" : "Part 4: Talks";
  const partSubtitle = partNumber === 3 
    ? "Listen to short conversations and answer questions" 
    : "Listen to talks and answer questions";
  const partIcon = partNumber === 3 
    ? <RecordVoiceOverIcon fontSize="small" /> 
    : <CampaignIcon fontSize="small" />;
  const partLabel = partNumber === 3 
    ? `Conversation ${currentQuestionIndex + 1}` 
    : `Talk ${currentQuestionIndex + 1}`;

  if (!currentQuestion && questions.length === 0 && dialogMode !== 'add') {
    return (
      <Container maxWidth="lg">
        <PartContainer
          id={`part${partNumber}-section-empty`}
          title={partTitle}
          subtitle={`No ${partNumber === 3 ? 'conversations' : 'talks'} available. Please add one to get started.`}
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
            {partNumber === 3 ? (
              <RecordVoiceOverIcon sx={{ fontSize: 64, mb: 2, opacity: 0.6 }} />
            ) : (
              <CampaignIcon sx={{ fontSize: 64, mb: 2, opacity: 0.6 }} />
            )}
            <Typography variant="h6">
              No {partNumber === 3 ? 'conversations' : 'talks'} available
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Click the "Add Question" button to create your first {partNumber === 3 ? 'conversation' : 'talk'}.
            </Typography>
          </Box>
        </PartContainer>
        
        <Part3_4EditDialog
          open={isEditDialogOpen}
          question={createEmptyQuestion()}
          partNumber={partNumber}
          onClose={handleCloseEditDialog}
          onSave={handleSaveQuestion}
          toeicQuestions={{}}
          mode={dialogMode}
        />
      </Container>
    );
  }

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const tabBgColor = isDarkMode ? color.gray900 : color.gray100;

  return (
    <>
      <PartContainer
        id={`part${partNumber}-section`}
        title={partTitle}
        subtitle={partSubtitle}
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: bgColor,
                  borderRadius: '1rem',
                  p: 3,
                  mb: 2,
                  border: `1px solid ${borderColor}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Zoom in={true}>
                  <Chip
                    icon={partIcon}
                    label={partLabel}
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

                <Stack spacing={3}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 2,
                        color: isDarkMode ? color.teal300 : color.teal700
                      }}
                    >
                      <HeadphonesIcon />
                      Audio Recording
                    </Typography>
                    
                    <AudioPlayer 
                      audioUrl={currentQuestion.audio} 
                    />
                  </Box>

                  {currentQuestion.image && (
                    <Box>
                      <CardMedia
                        component="img"
                        image={currentQuestion.image}
                        alt="Question Image"
                        sx={{
                          borderRadius: '1rem',
                          maxHeight: 250,
                          width: 'auto',
                          mx: 'auto',
                          objectFit: 'contain',
                          border: `1px solid ${borderColor}`
                        }}
                      />
                    </Box>
                  )}

                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 2,
                        color: isDarkMode ? color.teal300 : color.teal700
                      }}
                    >
                      <TextSnippetIcon />
                      Transcript
                    </Typography>
                    
                    <TranscriptBox
                      transcript={currentQuestion.transcript}
                    />
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ 
                my: 2, 
                borderColor: isDarkMode ? color.gray700 : color.gray300,
                '&::before, &::after': {
                  borderColor: isDarkMode ? color.gray700 : color.gray300,
                }
              }}>
                <Chip 
                  icon={<QuestionAnswerIcon />}
                  label="Questions" 
                  sx={{ 
                    backgroundColor: accentColor,
                    color: isDarkMode ? color.gray900 : color.white,
                    fontWeight: 'bold',
                    px: 1,
                    '& .MuiChip-icon': {
                      color: isDarkMode ? color.gray900 : color.white
                    }
                  }}
                />
              </Divider>

              <Paper
                ref={tabContainerRef}
                elevation={3}
                sx={{
                  backgroundColor: bgColor,
                  borderRadius: '1rem',
                  border: `1px solid ${borderColor}`,
                  overflow: 'hidden',
                  mb: 3
                }}
              >
                <Tabs
                  ref={tabsRef}
                  value={activeSubQuestion}
                  onChange={handleChangeSubQuestion}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    backgroundColor: tabBgColor,
                    borderBottom: `1px solid ${borderColor}`,
                    '& .MuiTabs-indicator': {
                      backgroundColor: accentColor,
                      height: 3
                    },
                    '& .MuiTab-root': {
                      color: isDarkMode ? color.gray400 : color.gray600,
                      fontWeight: 'bold',
                      py: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&.Mui-selected': {
                        color: accentColor
                      },
                      '&:hover': {
                        backgroundColor: isDarkMode ? color.gray800 : color.gray200,
                      }
                    }
                  }}
                >
                  {currentSubQuestions.map((subQ, index) => (
                    <Tab 
                      key={index} 
                      label={`Question ${index + 1}`}
                      icon={
                        <Tooltip title={subQ?.content?.substring(0, 30) + "..."}>
                          <QuestionAnswerIcon fontSize="small" />
                        </Tooltip>
                      }
                      iconPosition="start"
                    />
                  ))}
                </Tabs>

                <Fade in={true} timeout={300}>
                  <Box sx={{ p: { xs: 2, md: 4 } }}>
                    {currentSubQuestions[activeSubQuestion] ? (
                      <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                          <QuestionContent
                            content={currentSubQuestions[activeSubQuestion].content}
                            questionNumber={activeSubQuestion + 1}
                          />
                          
                          {onDeleteSubQuestion && (
                            <Tooltip title="Delete this sub-question">
                              <Button
                                color="error"
                                variant="outlined"
                                size="small"
                                onClick={() => handleOpenDeleteSubQuestionDialog(currentSubQuestions[activeSubQuestion].id)}
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
                          options={currentSubQuestions[activeSubQuestion].toeicAnswers.map((ans, i) => 
                            `(${String.fromCharCode(65 + i)}) ${ans.content}`
                          )}
                          correctAnswer={
                            currentSubQuestions[activeSubQuestion].toeicAnswers.findIndex(a => a.correct) === 0 ? AnswerEnum.A : 
                            currentSubQuestions[activeSubQuestion].toeicAnswers.findIndex(a => a.correct) === 1 ? AnswerEnum.B : 
                            currentSubQuestions[activeSubQuestion].toeicAnswers.findIndex(a => a.correct) === 2 ? AnswerEnum.C : 
                            AnswerEnum.D
                          } 
                        />
                      </>
                    ) : (
                      <Box sx={{ 
                        textAlign: 'center', 
                        py: 4,
                        color: isDarkMode ? color.gray400 : color.gray600
                      }}>
                        <QuestionAnswerIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                        <Typography>No questions available for this {partNumber === 3 ? 'conversation' : 'talk'}.</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Edit this {partNumber === 3 ? 'conversation' : 'talk'} to add questions.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Fade>
              </Paper>
            </Grid>
          </Grid>
        )}
      </PartContainer>

      <Part3_4EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? (currentQuestion || createEmptyQuestion()) : createEmptyQuestion()}
        partNumber={partNumber}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        toeicQuestions={toeicQuestions}
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
            Are you sure you want to delete this {partNumber === 3 ? 'conversation' : 'talk'}? 
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