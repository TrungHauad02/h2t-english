import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Slide,
  Stack,
  Paper,
  Chip,
  Grid,
  Divider,
  Collapse
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FlagIcon from '@mui/icons-material/Flag';
import CommentIcon from '@mui/icons-material/Comment';
import { useLocation, useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PartResult {
  type: TestPartTypeEnum;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  weightedScore?: number;
}

interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answeredQuestions?: number;
  parts?: PartResult[];
  comment?: string;
  strengths?: string[];
  areasToImprove?: string[];
}

interface SubmitTestDialogProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: TestResult | null;
  submitTestId?: number;
  testType?: string; 
}

const SubmitTestDialog: React.FC<SubmitTestDialogProps> = ({ 
  open, 
  onClose, 
  isLoading, 
  result,
  submitTestId,
  testType = "mixing" 
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [showComment, setShowComment] = React.useState(false);

  const handleReviewClick = () => {
    if (submitTestId) {
   
      const pathParts = location.pathname.split('/');
      let type = testType;
  
      if (pathParts.length >= 3) {
        const rawType = pathParts[2]; 
     
        if (rawType.endsWith('s')) {
          type = rawType.slice(0, -1);
        } else {
          type = rawType;
        }
      }
      
      navigate(`/history-test/${type}/${submitTestId}`);
    }
  };

  const getSectionName = (type: TestPartTypeEnum) => {
    switch(type) {
      case TestPartTypeEnum.VOCABULARY:
        return "Vocabulary";
      case TestPartTypeEnum.GRAMMAR:
        return "Grammar";
      case TestPartTypeEnum.READING:
        return "Reading";
      case TestPartTypeEnum.LISTENING:
        return "Listening";
      case TestPartTypeEnum.SPEAKING:
        return "Speaking";
      case TestPartTypeEnum.WRITING:
        return "Writing";
      default:
        return String(type);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return isDarkMode ? color.green500 : color.green600;
    if (score >= 80) return isDarkMode ? color.emerald500 : color.emerald600;
    if (score >= 70) return isDarkMode ? color.teal500 : color.teal600;
    if (score >= 60) return isDarkMode ? color.teal600 : color.teal700;
    if (score >= 50) return isDarkMode ? color.teal700 : color.teal800;
    return isDarkMode ? color.red500 : color.red600;
  };

  const getFeedback = (score: number) => {
    if (score >= 90) return "Excellent! You've completed the test with outstanding results.";
    if (score >= 80) return "Great job! You have a solid understanding of the material.";
    if (score >= 70) return "Good work! You've grasped the main concepts.";
    if (score >= 60) return "Fair result! Some areas need improvement.";
    if (score >= 50) return "Passing grade. Review the areas where you had difficulties.";
    return "More practice needed. Review the material and try again.";
  };

  // If there are low performing parts that need improvement
  const hasLowPerformingParts = () => {
    if (!result?.parts) return false;
    return result.parts.some(part => part.score < 70);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={isLoading ? undefined : onClose}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }
      }}
    >
      {isLoading ? (
        <Box sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '350px',
          minWidth: { xs: '300px', sm: '500px' },
          textAlign: 'center'
        }}>
          <CircularProgress 
            size={70} 
            thickness={4}
            sx={{ 
              color: isDarkMode ? color.teal400 : color.teal500,
              mb: 3
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: isDarkMode ? color.gray100 : color.gray800 
            }}
          >
            Calculating Test Results
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: isDarkMode ? color.gray300 : color.gray600,
              maxWidth: '400px'
            }}
          >
            Please wait while we compile your test results...
          </Typography>
        </Box>
      ) : result ? (
        <>
          <Box 
            sx={{ 
              py: 3, 
              px: 4, 
              backgroundColor: isDarkMode ? color.gray700 : color.teal50,
              borderBottom: '1px solid',
              borderColor: isDarkMode ? color.gray600 : color.teal100,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <FlagIcon 
              sx={{ 
                fontSize: 28, 
                color: isDarkMode ? color.teal300 : color.teal600
              }} 
            />
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: isDarkMode ? color.gray100 : color.gray900,
                }}
              >
                Test Completed
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 400
                }}
              >
                {getFeedback(result.score)}
              </Typography>
            </Box>
          </Box>

          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/* Overall Score */}
                <Grid item xs={12} md={5}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 3,
                      bgcolor: isDarkMode ? color.gray700 : color.gray50,
                      border: '1px solid',
                      borderColor: isDarkMode ? color.gray600 : color.gray200,
                      borderRadius: '16px',
                      height: '100%',
                      minHeight: '220px'
                    }}
                  >
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={150}
                        thickness={4}
                        sx={{ color: isDarkMode ? color.gray600 : color.gray200 }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={result.score}
                        size={150}
                        thickness={4}
                        sx={{ 
                          color: getScoreColor(result.score),
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="h3"
                          component="div"
                          sx={{ 
                            fontWeight: 700, 
                            color: getScoreColor(result.score)
                          }}
                        >
                          {Math.round(result.score)}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ 
                            fontWeight: 500, 
                            color: isDarkMode ? color.gray300 : color.gray600
                          }}
                        >
                          points
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="body1"
                      sx={{ 
                        mt: 2, 
                        color: isDarkMode ? color.gray300 : color.gray700,
                        textAlign: 'center'
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {result.correctAnswers}
                      </Box>{" "}
                      / {result.totalQuestions} correct answers
                    </Typography>
                    
                    {result.answeredQuestions !== undefined && result.answeredQuestions !== result.totalQuestions && (
                      <Typography
                        variant="body2"
                        sx={{ 
                          mt: 1, 
                          color: isDarkMode ? color.gray400 : color.gray600,
                          textAlign: 'center'
                        }}
                      >
                        ({result.answeredQuestions} / {result.totalQuestions} questions answered)
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Section Details or Test Info */}
                <Grid item xs={12} md={7}>
                  {result.parts && result.parts.length > 0 ? (
                    <Box 
                      sx={{ 
                        p: 3,
                        bgcolor: isDarkMode ? color.gray700 : color.gray50,
                        border: '1px solid',
                        borderColor: isDarkMode ? color.gray600 : color.gray200,
                        borderRadius: '16px'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2
                      }}>
                        <EqualizerIcon 
                          sx={{ 
                            color: isDarkMode ? color.teal300 : color.teal600,
                            fontSize: 20
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: isDarkMode ? color.gray200 : color.gray800 
                          }}
                        >
                          Section Performance
                        </Typography>
                      </Box>

                      <Stack spacing={2}>
                        {result.parts.map((part, index) => (
                          <Paper
                            key={part.type}
                            elevation={0}
                            sx={{
                              p: 2,
                              bgcolor: isDarkMode ? color.gray800 : color.white,
                              border: '1px solid',
                              borderColor: isDarkMode ? color.gray600 : color.gray200,
                              borderRadius: '8px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box 
                                sx={{ 
                                  width: 36, 
                                  height: 36,
                                  minWidth: 36,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '50%',
                                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                                }}
                              >
                                <Typography sx={{ fontWeight: 600, color: isDarkMode ? color.gray300 : color.gray600 }}>
                                  {index + 1}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ 
                                    fontWeight: 600, 
                                    color: isDarkMode ? color.gray100 : color.gray900,
                                    mb: 0.5
                                  }}
                                >
                                  {getSectionName(part.type)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                                >
                                  {part.correctAnswers} / {part.totalQuestions} correct answers
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Chip
                              label={`${Math.round(part.score)}%`}
                              sx={{
                                fontWeight: 600,
                                bgcolor: (() => {
                                  const scoreColor = getScoreColor(part.score);
                                  return isDarkMode 
                                    ? `${scoreColor}33` 
                                    : `${scoreColor}22`;
                                })(),
                                color: getScoreColor(part.score),
                                borderRadius: '8px',
                              }}
                            />
                          </Paper>
                        ))}
                      </Stack>
                    </Box>
                  ) : (
                    // If no parts, display general test info
                    <Box 
                      sx={{ 
                        p: 3,
                        bgcolor: isDarkMode ? color.gray700 : color.gray50,
                        border: '1px solid',
                        borderColor: isDarkMode ? color.gray600 : color.gray200,
                        borderRadius: '16px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 3
                      }}>
                        <EqualizerIcon 
                          sx={{ 
                            color: isDarkMode ? color.teal300 : color.teal600,
                            fontSize: 20
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: isDarkMode ? color.gray200 : color.gray800 
                          }}
                        >
                          Test Summary
                        </Typography>
                      </Box>

                      <Stack spacing={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                            Total Questions:
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                            {result.totalQuestions}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                            Correct Answers:
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: isDarkMode ? color.green400 : color.green600 }}>
                            {result.correctAnswers}
                          </Typography>
                        </Box>
                        
                        {result.answeredQuestions !== undefined && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                              Questions Answered:
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                              {result.answeredQuestions} / {result.totalQuestions}
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                            Performance:
                          </Typography>
                          <Chip
                            label={`${Math.round(result.score)}%`}
                            sx={{
                              fontWeight: 600,
                              bgcolor: (() => {
                                const scoreColor = getScoreColor(result.score);
                                return isDarkMode 
                                  ? `${scoreColor}33` 
                                  : `${scoreColor}22`;
                              })(),
                              color: getScoreColor(result.score),
                              borderRadius: '8px',
                            }}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  )}
                </Grid>
              </Grid>

              {/* Improvement Suggestions - only for mixing tests with parts */}
              {result.parts && hasLowPerformingParts() && (
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2
                  }}
                >
                  <TipsAndUpdatesIcon 
                    sx={{ 
                      color: isDarkMode ? color.teal400 : color.teal600,
                      fontSize: 24,
                      mt: 0.5
                    }} 
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 600, 
                        color: isDarkMode ? color.teal200 : color.teal700,
                        mb: 1
                      }}
                    >
                      Improvement Suggestions
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: isDarkMode ? color.gray300 : color.gray700,
                        mb: 1
                      }}
                    >
                      Focus on improving these sections:
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {result.parts
                          .filter(part => part.score < 70)
                          .map(part => (
                            <Box component="li" key={part.type} sx={{ mb: 0.5 }}>
                              <Box component="span" sx={{ fontWeight: 600 }}>
                                {getSectionName(part.type)}
                              </Box>
                              {" - "}
                              {part.score < 50 
                                ? "Needs significant improvement" 
                                : "Needs some improvement"}
                            </Box>
                          ))}
                      </Box>
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                    >
                      {result.score >= 80 
                        ? "You're doing very well! Keep up the good work." 
                        : "Review your materials and complete more practice exercises to improve your results."}
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {/* Teacher Comment Section - Only show if there's a comment */}
              {result.comment && (
                <Box sx={{ mt: 3 }}>
                  <Button 
                    onClick={() => setShowComment(!showComment)}
                    variant="outlined"
                    startIcon={<CommentIcon />}
                    sx={{
                      mb: 2,
                      borderRadius: '8px',
                      borderColor: isDarkMode ? color.teal600 : color.teal300,
                      color: isDarkMode ? color.teal300 : color.teal600,
                      '&:hover': {
                        borderColor: isDarkMode ? color.teal500 : color.teal400,
                        backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                      },
                    }}
                  >
                    {showComment ? "Hide Teacher's Comment" : "Show Teacher's Comment"}
                  </Button>
                  
                  <Collapse in={showComment}>
                    <Box
                      sx={{
                        p: 3,
                        bgcolor: isDarkMode ? color.gray700 : color.gray50,
                        border: '1px solid',
                        borderColor: isDarkMode ? color.gray600 : color.gray200,
                        borderRadius: '12px',
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ 
                          fontWeight: 600, 
                          color: isDarkMode ? color.gray200 : color.gray800,
                          mb: 2
                        }}
                      >
                        Teacher's Comment
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: isDarkMode ? color.gray300 : color.gray700,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {result.comment}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions 
            sx={{ 
              p: 3, 
              pt: 0,
              justifyContent: 'center',
              gap: 2
            }}
          >
            {submitTestId && (
              <Button
                variant="contained"
                onClick={handleReviewClick}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '8px',
                  backgroundColor: isDarkMode ? color.teal700 : color.teal500,
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: isDarkMode ? color.teal600 : color.teal600,
                  },
                }}
              >
                Review Test
              </Button>
            )}

            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '8px',
                backgroundColor: isDarkMode ? color.teal700 : color.teal500,
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: isDarkMode ? color.teal600 : color.teal600,
                },
              }}
            >
              Test Again
            </Button>
          </DialogActions>
        </>
      ) : (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">No result data available</Typography>
        </Box>
      )}
    </Dialog>
  );
};

export default SubmitTestDialog;