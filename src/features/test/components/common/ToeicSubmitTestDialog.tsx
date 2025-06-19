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
  LinearProgress
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';
import LoadingSubmit from './dialogComponents/LoadingSubmit'; 

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ToeicTestResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answeredQuestions?: number;
  listeningScore?: number;
  readingScore?: number;
  listeningCorrect?: number;
  readingCorrect?: number;
}

interface ToeicSubmitTestDialogProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: ToeicTestResult | null;
  submitTestId?: number;
}

export default function ToeicSubmitTestDialog({ 
  open, 
  onClose, 
  isLoading, 
  result,
  submitTestId,
}: ToeicSubmitTestDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleReviewClick = () => {
    if (submitTestId) {
      navigate(`/history-test/toeic/${submitTestId}`);
    }
  };
 const getScoreLevel = (score: number) => {
    if (score >= 905) return {
      level: "Excellent",
      description: "You demonstrate a strong command of English suitable for academic or professional environments.",
      color: color.emerald600,
    };
    if (score >= 785) return {
      level: "Very Good", 
      description: "You can communicate effectively in most workplace and everyday situations.",
      color: color.green600,
    };
    if (score >= 550) return {
      level: "Good",
      description: "You understand familiar topics but may need to improve vocabulary and accuracy.",
      color: color.teal600,
    };
    if (score >= 225) return {
      level: "Needs Improvement",
      description: "Focus on improving grammar, vocabulary, and listening skills to communicate more clearly.",
      color: color.warning,
    };
    if (score >= 120) return {
      level: "Beginner",
      description: "You are starting to learn English. Focus on building basic vocabulary and sentence patterns.",
      color: color.gray600,
    };
    return {
      level: "Foundational",
      description: "Consider starting with the fundamentals of English to build a strong learning base.",
      color: color.red600,
    };
  };



  const getScoreColor = (score: number) => {
    if (score >= 900) return isDarkMode ? color.green500 : color.green600;
    if (score >= 800) return isDarkMode ? color.emerald500 : color.emerald600;
    if (score >= 700) return isDarkMode ? color.teal500 : color.teal600;
    if (score >= 600) return isDarkMode ? color.teal600 : color.teal700;
    if (score >= 500) return isDarkMode ? color.teal700 : color.teal800;
    return isDarkMode ? color.red500 : color.red600;
  };

  const getFeedback = (score: number) => {
    if (score >= 900) return "Outstanding! You have excellent English proficiency.";
    if (score >= 800) return "Excellent! You have very good command of English.";
    if (score >= 700) return "Very Good! You can communicate effectively in most situations.";
    if (score >= 600) return "Good! You have functional English skills.";
    if (score >= 500) return "Fair! Continue practicing to improve your skills.";
    if (score >= 400) return "Basic level. Focus on building your foundation.";
    return "Keep practicing. Every journey begins with a first step.";
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={isLoading ? undefined : onClose}
      maxWidth="md"
      fullWidth
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
        <LoadingSubmit />
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
                TOEIC Test Completed
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
                {/* Total Score */}
                <Grid item xs={12} md={4}>
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
                      minHeight: '280px'
                    }}
                  >
                    <Box sx={{ position: 'relative', mb: 3 }}>
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={180}
                        thickness={4}
                        sx={{ color: isDarkMode ? color.gray600 : color.gray200 }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={(result.score / 990) * 100}
                        size={180}
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
                          variant="h2"
                          component="div"
                          sx={{ 
                            fontWeight: 700, 
                            color: getScoreColor(result.score)
                          }}
                        >
                          {result.score}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ 
                            fontWeight: 500, 
                            color: isDarkMode ? color.gray300 : color.gray600
                          }}
                        >
                          / 990
                        </Typography>
                      </Box>
                    </Box>
                    
                    {(() => {
                      const level = getScoreLevel(result.score);
                      return (
                        <Box>
                    <Chip
                      icon={<SchoolIcon />}
                      label={level.level}
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        py: 2.5,
                        px: 1,
                        bgcolor: (() => {
                          return isDarkMode
                            ? `${level.color}33`
                            : `${level.color}22`;
                        })(),
                        color: level.color,
                        borderRadius: '8px',
                        mb: 1
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray600,
                        fontWeight: 500
                      }}
                    >
                      {level.description}
                    </Typography>
                  </Box>
                      );
                    })()}
                  </Box>
                </Grid>

                {/* Section Breakdown */}
                <Grid item xs={12} md={8}>
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
                        Score Breakdown
                      </Typography>
                    </Box>

                    <Stack spacing={3}>
                      {/* Listening Section */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: isDarkMode ? color.gray800 : color.white,
                          border: '1px solid',
                          borderColor: isDarkMode ? color.gray600 : color.gray200,
                          borderRadius: '12px'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <HeadsetIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: 600, 
                              color: isDarkMode ? color.gray100 : color.gray900,
                            }}
                          >
                            Listening
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                Score
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ 
                                  fontWeight: 700,
                                  color: getScoreColor(result.listeningScore || 0)
                                }}
                              >
                                {result.listeningScore || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                out of 495
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                Correct Answers
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ 
                                  fontWeight: 700,
                                  color: isDarkMode ? color.gray200 : color.gray800
                                }}
                              >
                                {result.listeningCorrect || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                out of 100
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(result.listeningCorrect || 0) * 1}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: isDarkMode ? color.gray600 : color.gray200,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getScoreColor(result.listeningScore || 0),
                                borderRadius: 4,
                              }
                            }}
                          />
                        </Box>
                      </Paper>

                      {/* Reading Section */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: isDarkMode ? color.gray800 : color.white,
                          border: '1px solid',
                          borderColor: isDarkMode ? color.gray600 : color.gray200,
                          borderRadius: '12px'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <MenuBookIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: 600, 
                              color: isDarkMode ? color.gray100 : color.gray900,
                            }}
                          >
                            Reading
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                Score
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ 
                                  fontWeight: 700,
                                  color: getScoreColor(result.readingScore || 0)
                                }}
                              >
                                {result.readingScore || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                out of 495
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                Correct Answers
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ 
                                  fontWeight: 700,
                                  color: isDarkMode ? color.gray200 : color.gray800
                                }}
                              >
                                {result.readingCorrect || 0}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                              >
                                out of 100
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(result.readingCorrect || 0) * 1}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: isDarkMode ? color.gray600 : color.gray200,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getScoreColor(result.readingScore || 0),
                                borderRadius: 4,
                              }
                            }}
                          />
                        </Box>
                      </Paper>
                    </Stack>

                    {/* Test Summary */}
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                        border: '1px solid',
                        borderColor: isDarkMode ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.1)',
                        borderRadius: '8px'
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography 
                            variant="body2" 
                            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                          >
                            Total Questions:
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 600, 
                              color: isDarkMode ? color.gray200 : color.gray800 
                            }}
                          >
                            {result.totalQuestions}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography 
                            variant="body2" 
                            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                          >
                            Questions Answered:
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 600, 
                              color: isDarkMode ? color.gray200 : color.gray800 
                            }}
                          >
                            {result.answeredQuestions || 0} / {result.totalQuestions}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
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
              Take New Test
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
}