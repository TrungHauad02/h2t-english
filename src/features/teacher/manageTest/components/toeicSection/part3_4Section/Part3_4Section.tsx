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
  Tooltip
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
  onAddQuestion?: (newQuestion: ToeicPart3_4, newSubQuestions: ToeicQuestion[]) => void;
}

export default function Part3_4Section({
  questions,
  partNumber,
  toeicQuestions,
  onUpdateQuestion,
  onAddQuestion
}: Part3_4SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSubQuestion, setActiveSubQuestion] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSubQuestions, setCurrentSubQuestions] = useState<ToeicQuestion[]>([]);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');
  
  // Refs to handle scroll and render issues
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  // Memoize current question to prevent unnecessary re-renders
  const currentQuestion = useMemo(() => 
    questions.length > 0 ? questions[currentQuestionIndex] : null, 
    [questions, currentQuestionIndex]
  );

  // Stable effect for loading sub-questions
  useEffect(() => {
    if (currentQuestion) {
      const subQuestions = toeicQuestions[currentQuestion.id] || [];
      setCurrentSubQuestions(subQuestions);
      
      // Reset active sub-question when main question changes
      setActiveSubQuestion(0);
    }
  }, [currentQuestion, toeicQuestions]);

  // Effect to handle scroll issues
  useEffect(() => {
    const handleScrollFix = () => {
      try {
        if (tabsRef.current) {
          // Force reset of scroll position
          tabsRef.current.scrollLeft = 0;
        }
        if (tabContainerRef.current) {
          // Additional safeguard
          tabContainerRef.current.scrollTop = 0;
        }
      } catch (error) {
        console.warn('Scroll reset failed', error);
      }
    };

    // Run scroll fix after render
    const timeoutId = setTimeout(handleScrollFix, 100);

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [activeSubQuestion, currentQuestionIndex]);

  // Memoized navigation handlers to prevent unnecessary re-renders
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

  // Safe tab change handler
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

  const handleSaveQuestion = useCallback((updatedQuestion: ToeicPart3_4, subQuestions?: ToeicQuestion[]) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    } else if (dialogMode === 'add' && onAddQuestion && subQuestions) {
      onAddQuestion(updatedQuestion, subQuestions);
    }
    handleCloseEditDialog();
  }, [dialogMode, onUpdateQuestion, onAddQuestion, handleCloseEditDialog]);

  // Create empty question for add mode
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

  // Early return if no current question and not in add mode
  if (!currentQuestion && questions.length === 0 && dialogMode !== 'add') {
    return null;
  }

  // Derive part-specific labels and icons
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

  // Derive color palette
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;
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
      >
        {currentQuestion && (
          <Grid container spacing={3}>
            {/* Audio + Transcript Section */}
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
                  {/* Audio Player */}
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

                  {/* Image (if available) */}
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

                  {/* Transcript */}
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

            {/* Questions Section */}
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
                    {currentSubQuestions[activeSubQuestion] && (
                      <>
                        <QuestionContent
                          content={currentSubQuestions[activeSubQuestion].content}
                          questionNumber={activeSubQuestion + 1}
                        />

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
    </>
  );
}