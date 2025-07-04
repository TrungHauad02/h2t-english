import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  Grid,
  Button,
  Chip,
  alpha,
  Paper,
  Divider,
  Badge,
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import {
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  PlayArrow as CurrentIcon,
} from '@mui/icons-material';
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface QuestionNavigatorProps {
  currentStep: number;
  currentIndex: number;
  answeredQuestions: Set<number>;
  onNavigateToQuestion: (questionNumber: number) => void;
}

export default function QuestionNavigator({
  currentStep,
  currentIndex,
  answeredQuestions,
  onNavigateToQuestion,
}: QuestionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Calculate current question number based on step and index
  const getCurrentQuestionNumber = () => {
    switch (currentStep) {
      case 2: // Part 1: Questions 1-6
        return 1 + currentIndex;
      case 3: // Part 2: Questions 7-31
        return 7 + currentIndex;
      case 4: // Part 3: Questions 32-70 (each group has 3 questions)
        return 32 + currentIndex * 3;
      case 5: // Part 4: Questions 71-100 (each group has 3 questions)
        return 71 + currentIndex * 3;
      case 6: // Part 5: Questions 101-130
        return 101 + currentIndex;
      case 7: // Part 6: Questions 131-146
        return 131 + currentIndex * 4;
      case 8: // Part 7: Questions 147-200
        return 147 + currentIndex * 4;
      default:
        return 1;
    }
  };

  const currentQuestionNumber = getCurrentQuestionNumber();

  // Generate question ranges for each part
  const getQuestionRanges = () => {
    return [
      { 
        part: 1, 
        title: "Part 1", 
        subtitle: "Photographs", 
        start: 1, 
        end: 6, 
        step: 2,
        color: color.emerald500,
      },
      { 
        part: 2, 
        title: "Part 2", 
        subtitle: "Question-Response", 
        start: 7, 
        end: 31, 
        step: 3,
        color: color.teal500,
      },
      { 
        part: 3, 
        title: "Part 3", 
        subtitle: "Conversations", 
        start: 32, 
        end: 70, 
        step: 4,
        color: color.green500,
      },
      { 
        part: 4, 
        title: "Part 4", 
        subtitle: "Short Talks", 
        start: 71, 
        end: 100, 
        step: 5,
        color: color.emerald600,
      },
      { 
        part: 5, 
        title: "Part 5", 
        subtitle: "Incomplete Sentences", 
        start: 101, 
        end: 130, 
        step: 6,
        color: color.teal600,
      },
      { 
        part: 6, 
        title: "Part 6", 
        subtitle: "Text Completion", 
        start: 131, 
        end: 146, 
        step: 7,
        color: color.green600,
      },
      { 
        part: 7, 
        title: "Part 7", 
        subtitle: "Reading Comprehension", 
        start: 147, 
        end: 200, 
        step: 8,
        color: color.emerald700,
      },
    ];
  };

  const getQuestionStatus = (questionNumber: number) => {
    if (questionNumber === currentQuestionNumber) {
      return 'current';
    } else if (answeredQuestions.has(questionNumber)) {
      return 'answered';
    } else {
      return 'unanswered';
    }
  };

  const getQuestionColor = (status: string) => {
    switch (status) {
      case 'current':
        return {
          bgcolor: color.teal500,
          color: color.white,
          border: `3px solid ${color.teal600}`,
          boxShadow: `0 0 0 4px ${alpha(color.teal500, 0.2)}`,
        };
      case 'answered':
        return {
          bgcolor: color.emerald500,
          color: color.white,
          border: `2px solid ${color.emerald600}`,
        };
      default:
        return {
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
          color: isDarkMode ? color.gray300 : color.gray700,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        };
    }
  };

  const handleQuestionClick = (questionNumber: number) => {
    onNavigateToQuestion(questionNumber);
    setIsOpen(false);
  };

  const renderQuestionGrid = () => {
    const ranges = getQuestionRanges();
    
    return ranges.map((range) => {
      const answeredInPart = Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i)
        .filter(q => answeredQuestions.has(q)).length;
      const totalInPart = range.end - range.start + 1;
      const isCurrentPart = currentStep === range.step;
      
      return (
        <Paper
          key={range.part}
          elevation={isCurrentPart ? 8 : 2}
          sx={{
            mb: 3,
            borderRadius: 3,
            overflow: 'hidden',
            border: isCurrentPart ? `2px solid ${range.color}` : 'none',
            bgcolor: isDarkMode ? color.gray800 : color.white,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {/* Part Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${range.color}, ${alpha(range.color, 0.8)})`,
              color: color.white,
              p: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(color.white, 0.1),
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700} fontSize="1.1rem">
                  {range.title}
                </Typography>
                <Badge
                  badgeContent={`${answeredInPart}/${totalInPart}`}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: color.white,
                      color: range.color,
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      minWidth: '45px',
                      height: '20px',
                    },
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>
                {range.subtitle}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Questions {range.start}-{range.end}
              </Typography>
            </Box>
          </Box>

          {/* Questions Grid */}
          <Box sx={{ p: 2 }}>
            <Grid container spacing={1}>
              {Array.from({ length: range.end - range.start + 1 }, (_, i) => {
                const questionNumber = range.start + i;
                const status = getQuestionStatus(questionNumber);
                const questionStyle = getQuestionColor(status);
                
                return (
                  <Grid 
                    item 
                    xs={3} 
                    sm={2.4} 
                    md={2} 
                    lg={1.5} 
                    xl={1.2} 
                    key={questionNumber}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleQuestionClick(questionNumber)}
                      sx={{
                        minWidth: '36px',
                        width: '36px',
                        height: '36px',
                        p: 0,
                        fontSize: '0.75rem',
                        fontWeight: status === 'current' ? 700 : 600,
                        borderRadius: 2,
                        position: 'relative',
                        ...questionStyle,
                        '&:hover': {
                          ...questionStyle,
                          opacity: 0.8,
                          transform: 'scale(1.1) translateY(-2px)',
                          boxShadow: `0 8px 25px ${alpha(questionStyle.bgcolor, 0.3)}`,
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {questionNumber}
                      {status === 'current' && (
                        <CurrentIcon
                          sx={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            fontSize: 12,
                            color: color.white,
                          }}
                        />
                      )}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Paper>
      );
    });
  };

  const getAnsweredCount = () => {
    return answeredQuestions.size;
  };

  const getCompletionPercentage = () => {
    return Math.round((getAnsweredCount() / 200) * 100);
  };

  return (
    <>
      {/* Floating Navigator Button - Fixed position không ảnh hưởng layout */}
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          bgcolor: alpha(color.white, 0.9),
          color: color.teal500,
          boxShadow: `0 4px 12px ${alpha(color.teal500, 0.25)}`,
          border: `2px solid ${color.teal500}`,
          '&:hover': {
            bgcolor: color.teal500,
            color: color.white,
            transform: 'scale(1.05)',
            boxShadow: `0 6px 16px ${alpha(color.teal500, 0.35)}`,
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <AppsIcon sx={{ fontSize: 24 }} />
      </IconButton>

      {/* Enhanced Navigation Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 450, md: 550 },
            height: 'calc(100vh - 80px)', // Trừ đi height của header (khoảng 80px)
            top: '80px', // Bắt đầu từ dưới header
            bgcolor: isDarkMode ? color.gray900 : color.gray50,
            borderRadius: { sm: '16px 0 0 0' }, // Bo góc trên bên trái
            border: 'none',
            boxShadow: `0 24px 60px ${alpha(color.black, 0.15)}`,
            zIndex: 1200, // Thấp hơn header
          },
        }}
        // Thêm props để không ảnh hưởng giao diện bên ngoài  
        ModalProps={{
          keepMounted: false,
          disablePortal: false,
          style: { zIndex: 1200 }, // Đảm bảo không che header
        }}
        SlideProps={{
          direction: "left"
        }}
        // Thêm backdrop với zIndex thấp hơn và position
        BackdropProps={{
          sx: {
            zIndex: 1199,
            backgroundColor: alpha(color.black, 0.5),
            top: '80px', // Backdrop cũng bắt đầu từ dưới header
            height: 'calc(100vh - 80px)',
          }
        }}
      >
        <Box sx={{ 
          height: 'calc(100vh - 80px)', // Match với drawer height
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden' 
        }}>
          {/* Enhanced Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${color.teal500}, ${color.emerald500})`,
              color: color.white,
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                bgcolor: alpha(color.white, 0.1),
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" fontWeight={700}>
                  Question Navigator
                </Typography>
                <IconButton
                  onClick={() => setIsOpen(false)}
                  sx={{
                    color: color.white,
                    bgcolor: alpha(color.white, 0.1),
                    '&:hover': {
                      bgcolor: alpha(color.white, 0.2),
                      transform: 'rotate(90deg)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Navigate through all 200 TOEIC questions
              </Typography>

              {/* Enhanced Stats */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<CurrentIcon sx={{ color: `${color.white} !important` }} />}
                  label={`Question ${currentQuestionNumber}`}
                  sx={{
                    bgcolor: alpha(color.white, 0.2),
                    color: color.white,
                    fontWeight: 700,
                    '& .MuiChip-icon': {
                      color: color.white,
                    },
                  }}
                />
                <Chip
                  icon={<CheckIcon sx={{ color: `${color.white} !important` }} />}
                  label={`${getAnsweredCount()}/200 (${getCompletionPercentage()}%)`}
                  sx={{
                    bgcolor: alpha(color.white, 0.2),
                    color: color.white,
                    fontWeight: 700,
                    '& .MuiChip-icon': {
                      color: color.white,
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Enhanced Legend */}
          <Box sx={{ p: 3, pb: 2, flexShrink: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: isDarkMode ? color.gray200 : color.gray800,
              }}
            >
              Status Legend
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color.teal500,
                    borderRadius: 1,
                    border: `2px solid ${color.teal600}`,
                  }}
                />
                <Typography variant="body2" fontWeight={600}>Current</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color.emerald500,
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2" fontWeight={600}>Answered</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: isDarkMode ? color.gray700 : color.gray300,
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2" fontWeight={600}>Unanswered</Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mx: 3 }} />

          {/* Enhanced Question Grid */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 3, 
            pt: 2,
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: isDarkMode ? color.gray800 : color.gray200,
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: isDarkMode ? color.gray600 : color.gray400,
              borderRadius: 4,
              '&:hover': {
                bgcolor: isDarkMode ? color.gray500 : color.gray500,
              },
            },
          }}>
            {renderQuestionGrid()}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}