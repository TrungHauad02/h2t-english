import React, { useState } from 'react';
import { 
  Grid, 
  CardMedia, 
  Box, 
  Paper, 
  Typography, 
  Chip,
  Fade,
  Zoom,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ToeicPart1, AnswerEnum } from 'interfaces';
import {
  PartContainer,
  AudioPlayer,
  AnswerOptionsGrid,
  TranscriptBox
} from '../common';
import Part1EditDialog from './Part1EditDialog';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ImageIcon from '@mui/icons-material/Image';

interface Part1SectionProps {
  questions: ToeicPart1[];
  onUpdateQuestion?: (updatedQuestion: ToeicPart1) => void;
  onAddQuestion?: (newQuestion: ToeicPart1) => void;
}

export default function Part1Section({ 
  questions, 
  onUpdateQuestion,
  onAddQuestion
}: Part1SectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'add'>('edit');
  const [activeTab, setActiveTab] = useState(0);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const onSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const onNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const onNavigateNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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

  const handleSaveQuestion = (updatedQuestion: ToeicPart1) => {
    if (dialogMode === 'edit' && onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    } else if (dialogMode === 'add' && onAddQuestion) {
      onAddQuestion(updatedQuestion);
    }
    handleCloseEditDialog();
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Create empty question for add mode
  const createEmptyQuestion = (): ToeicPart1 => {
    return {
      id: 0,
      image: '',
      audio: '',
      transcript: '',
      correctAnswer: AnswerEnum.A,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  };

  if (!currentQuestion && questions.length === 0 && dialogMode !== 'add') {
    return null;
  }

  // Styling
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;

  // Map string correctAnswer to AnswerEnum
  const getCorrectAnswerEnum = (answer: string): AnswerEnum => {
    switch (answer) {
      case 'A': return AnswerEnum.A;
      case 'B': return AnswerEnum.B;
      case 'C': return AnswerEnum.C;
      case 'D': return AnswerEnum.D;
      default: return AnswerEnum.A;
    }
  };

  return (
    <>
      <PartContainer
        id="part1-section"
        title="Part 1: Photographs"
        subtitle="Look at each picture and select the statement that best describes it"
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onSelectQuestion={onSelectQuestion}
        onPrevious={onNavigatePrevious}
        onNext={onNavigateNext}
        onEditQuestion={handleOpenEditDialog}
        onAddQuestion={handleOpenAddDialog}
      >
        {currentQuestion && (
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
              <Zoom in={true}>
                <Chip
                  icon={<QuestionAnswerIcon />}
                  label={`Question ${currentQuestionIndex + 1}`}
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

              <Grid container spacing={4}>
                {/* Main content grid */}
                <Grid item xs={12}>
                  {/* Image Section - Always at the top */}
                  <Box sx={{ mb: 4 }}>
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
                      <ImageIcon />
                      Question Image
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        position: 'relative',
                        height: 300,
                        width: '100%',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: cardBgColor
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                          backgroundColor: isDarkMode ? color.gray900 : color.white,
                          p: 2
                        }}
                        image={currentQuestion.image || '/placeholder-image.jpg'}
                        alt="Question Image"
                      />
                    </Box>
                  </Box>

                  {/* Tabs for Audio/Answers and Transcript */}
                  <Box sx={{ width: '100%', mb: 2 }}>
                    <Tabs
                      value={activeTab}
                      onChange={handleChangeTab}
                      sx={{
                        '.MuiTabs-indicator': {
                          backgroundColor: accentColor,
                        },
                        '.MuiTab-root': {
                          color: isDarkMode ? color.gray400 : color.gray600,
                          '&.Mui-selected': {
                            color: accentColor,
                          },
                        },
                      }}
                    >
                      <Tab 
                        icon={<HeadphonesIcon />} 
                        label="Audio & Answers" 
                        iconPosition="start"
                      />
                      <Tab 
                        icon={<TextSnippetIcon />} 
                        label="Transcript" 
                        iconPosition="start"
                      />
                    </Tabs>
                    <Divider sx={{ borderColor: borderColor }} />
                  </Box>

                  {/* Tab Content */}
                  <Box sx={{ mt: 2 }}>
                    {activeTab === 0 ? (
                      <Box>
                        {/* Audio Player */}
                        <Box sx={{ mb: 4 }}>
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
                            <HeadphonesIcon />
                            Listen to the Question
                          </Typography>
                          
                          <Box sx={{
                            backgroundColor: cardBgColor,
                            borderRadius: '1rem',
                            p: 2,
                            border: `1px solid ${borderColor}`
                          }}>
                            <AudioPlayer audioUrl={currentQuestion.audio} />
                          </Box>
                        </Box>
                        
                        {/* Answer Options */}
                        <Box>
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
                            Answer Options
                          </Typography>
                          
                          <Box sx={{
                            backgroundColor: cardBgColor,
                            borderRadius: '1rem',
                            p: 2,
                            border: `1px solid ${borderColor}`
                          }}>
                            <AnswerOptionsGrid
                              options={["(A)", "(B)", "(C)", "(D)"]}
                              correctAnswer={getCorrectAnswerEnum(currentQuestion.correctAnswer)}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        {/* Transcript */}
                        {currentQuestion.transcript ? (
                          <Box>
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
                              Transcript
                            </Typography>
                            
                            <Box sx={{
                              backgroundColor: cardBgColor,
                              borderRadius: '1rem',
                              p: 2,
                              border: `1px solid ${borderColor}`
                            }}>
                              <TranscriptBox transcript={currentQuestion.transcript} />
                            </Box>
                          </Box>
                        ) : (
                          <Box sx={{ 
                            textAlign: 'center', 
                            py: 4,
                            color: isDarkMode ? color.gray400 : color.gray600
                          }}>
                            <TextSnippetIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                            <Typography>No transcript available for this question.</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}
      </PartContainer>

      {/* Edit/Add Dialog */}
      <Part1EditDialog
        open={isEditDialogOpen}
        question={dialogMode === 'edit' ? (currentQuestion || createEmptyQuestion()) : createEmptyQuestion()}
        onClose={handleCloseEditDialog}
        onSave={handleSaveQuestion}
        mode={dialogMode}
      />
    </>
  );
}