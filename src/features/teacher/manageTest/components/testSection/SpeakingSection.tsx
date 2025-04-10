import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Paper,
  Chip,
  List,
  } from '@mui/material';
import { TestSpeaking, Question } from 'interfaces';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ListItemButton } from '@mui/material';

interface SpeakingSectionProps {
  speakingTitles: TestSpeaking[];
  selectedTitle: TestSpeaking | null;
  onSelectTitle: (titleId: number) => void;
  questions: Question[];
  isEditMode: boolean;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  speakingTitles,
  selectedTitle,
  onSelectTitle,
  questions,
  isEditMode,
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [editTitle, setEditTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
  useEffect(() => {
    if (selectedTitle) {
      setEditTitle(selectedTitle.title);
    }
  }, [selectedTitle]);

  useEffect(() => {
    setActiveQuestionIndex(0);
  }, [selectedTitle]);

  const handleTitleSave = () => {
    if (selectedTitle && editTitle.trim()) {
      setIsEditingTitle(false);
    }
  };

  if (!selectedTitle) return null;

  const bgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  const currentQuestion = questions[activeQuestionIndex];

  return (
    <Box id="speaking-section">
      <Card 
        elevation={isDarkMode ? 1 : 3}
        sx={{
          backgroundColor: isDarkMode ? color.gray900 : color.white,
          borderRadius: '1rem',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 3,
              backgroundColor: isDarkMode ? color.gray800 : color.teal50,
              borderBottom: `1px solid ${borderColor}`
            }}
          >
            <MicIcon sx={{ color: accentColor }} />
            <Typography 
              variant="h5" 
              sx={{ 
                ml: 1.5, 
                fontWeight: 'bold',
                color: accentColor
              }}
            >
              Speaking Section
            </Typography>
          </Box>
          
          {/* Navigation Tabs */}
          {speakingTitles.length > 1 && (
            <Box 
              sx={{ 
                backgroundColor: isDarkMode ? color.gray800 : color.teal50,
                borderBottom: `1px solid ${borderColor}`
              }}
            >
              <Tabs
                value={speakingTitles.findIndex(title => title.id === selectedTitle.id)}
                onChange={(event, newValue) => {
                  if (speakingTitles[newValue]) {
                    onSelectTitle(speakingTitles[newValue].id);
                  }
                }}
                aria-label="speaking titles tabs"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: accentColor,
                    height: 3
                  },
                  '& .MuiTab-root': {
                    color: secondaryTextColor,
                    '&.Mui-selected': {
                      color: accentColor,
                      fontWeight: 'bold'
                    },
                    py: 2
                  },
                }}
              >
                {speakingTitles.map((title, index) => (
                  <Tab
                    key={title.id}
                    label={`Speaking ${index + 1}`}
                    id={`speaking-tab-${index}`}
                    aria-controls={`speaking-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
              {/* Title Section */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  backgroundColor: bgColor, 
                  borderRadius: '0.75rem', 
                  border: `1px solid ${borderColor}`
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 1, 
                    fontWeight: 'medium', 
                    color: secondaryTextColor 
                  }}
                >
                  Title
                </Typography>
                
                {isEditingTitle ? (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      fullWidth
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Enter speaking test title"
                      size="small"
                      InputProps={{
                        sx: {
                          borderRadius: '0.5rem',
                          backgroundColor: isDarkMode ? color.gray900 : color.white,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: borderColor
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: accentColor
                          }
                        }
                      }}
                    />
                    <IconButton 
                      color="primary" 
                      onClick={handleTitleSave} 
                      size="small"
                      sx={{ color: color.green500 }}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => {
                        setIsEditingTitle(false);
                        setEditTitle(selectedTitle.title);
                      }} 
                      size="small"
                      sx={{ color: color.red500 }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Typography 
                      variant="h6"
                      sx={{ 
                        color: textColor,
                        fontWeight: 'medium',
                        wordBreak: 'break-word'
                      }}
                    >
                      {selectedTitle.title || "No title"}
                    </Typography>
                    {isEditMode && (
                      <IconButton 
                        color="primary" 
                        onClick={() => setIsEditingTitle(true)}
                        size="small"
                        sx={{ 
                          color: accentColor,
                          flexShrink: 0
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Stack>
                )}
              </Paper>

              {/* Questions Section */}
              {questions.length > 0 && (
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: accentColor,
                      fontWeight: 'bold'
                    }}
                  >
                    <QuestionAnswerIcon /> Questions
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Question Navigation */}
                    <Box 
                      sx={{ 
                        width: 200, 
                        flexShrink: 0, 
                        display: { xs: 'none', md: 'block' } 
                      }}
                    >
                      <Paper 
                        elevation={0}
                        sx={{
                          backgroundColor: bgColor,
                          borderRadius: '0.75rem',
                          border: `1px solid ${borderColor}`,
                          overflow: 'hidden'
                        }}
                      >
                        <List disablePadding>
                          {questions.map((question, index) => (
                          <ListItemButton
                          key={index}
                          selected={activeQuestionIndex === index}
                          onClick={() => setActiveQuestionIndex(index)}
                          sx={{
                            p: 2,
                            borderBottom: index !== questions.length - 1 ? `1px solid ${borderColor}` : 'none',
                            '&.Mui-selected': {
                              backgroundColor: isDarkMode ? `${color.teal800}50` : `${color.teal100}90`,
                              borderLeft: `4px solid ${accentColor}`,
                              '&:hover': {
                                backgroundColor: isDarkMode ? `${color.teal800}80` : `${color.teal100}`
                              }
                            },
                            '&:hover': {
                              backgroundColor: isDarkMode ? color.gray700 : color.gray100
                            }
                          }}
                        >
                          <Typography 
                            variant="body2"
                            sx={{
                              fontWeight: activeQuestionIndex === index ? 'bold' : 'normal',
                              color: activeQuestionIndex === index ? accentColor : textColor
                            }}
                          >
                            Question {index + 1}
                          </Typography>
                        </ListItemButton>
                          ))}
                        </List>
                      </Paper>
                    </Box>

                    {/* Question Display (Mobile) */}
                    <Box 
                      sx={{ 
                        display: { xs: 'flex', md: 'none' },
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 2,
                        width: '100%'
                      }}
                    >
                      {questions.map((question, index) => (
                        <Chip
                          key={index}
                          label={`Question ${index + 1}`}
                          onClick={() => setActiveQuestionIndex(index)}
                          color={activeQuestionIndex === index ? "primary" : "default"}
                          sx={{
                            backgroundColor: activeQuestionIndex === index 
                              ? (isDarkMode ? color.teal700 : color.teal100)
                              : (isDarkMode ? color.gray700 : color.gray100),
                            color: activeQuestionIndex === index
                              ? (isDarkMode ? color.teal100 : color.teal700)
                              : textColor,
                            fontWeight: activeQuestionIndex === index ? 'bold' : 'normal',
                            border: `1px solid ${activeQuestionIndex === index 
                              ? accentColor 
                              : 'transparent'}`
                          }}
                        />
                      ))}
                    </Box>

                    {/* Active Question Content */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: bgColor,
                          borderRadius: '0.75rem',
                          border: `1px solid ${borderColor}`
                        }}
                      >
                        <Typography 
                          variant="subtitle1"
                          sx={{ 
                            mb: 2, 
                            color: accentColor,
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>Question {activeQuestionIndex + 1}</span>
                          {isEditMode && (
                            <IconButton 
                              size="small"
                              sx={{ color: accentColor }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Typography>
                        
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: textColor,
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.7
                          }}
                        >
                          {currentQuestion?.content || "No content for this question"}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              )}

              {questions.length === 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: bgColor,
                    borderRadius: '0.75rem',
                    border: `1px dashed ${borderColor}`
                  }}
                >
                  <Typography sx={{ color: secondaryTextColor }}>
                    No questions available for this speaking section.
                  </Typography>
                </Paper>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SpeakingSection;