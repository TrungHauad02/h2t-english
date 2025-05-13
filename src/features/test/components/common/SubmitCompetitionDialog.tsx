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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from 'react-router-dom';

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

interface CompetitionResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  parts?: PartResult[];
}

interface SubmitCompetitionDialogProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: CompetitionResult | null;
  submitCompetitionId?: number;
  competitionId?: number;
}

export default function SubmitCompetitionDialog({ 
  open, 
  onClose, 
  isLoading, 
  result,
  submitCompetitionId,
  competitionId
}: SubmitCompetitionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleReviewClick = () => {
    if (submitCompetitionId) {
      navigate(`/history-test/competition/${submitCompetitionId}`);
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
    if (score >= 90) return "Excellent! You've completed the competition with outstanding results.";
    if (score >= 80) return "Great job! You have a solid performance in this competition.";
    if (score >= 70) return "Good work! You've achieved a respectable score.";
    if (score >= 60) return "Fair result! You've passed the competition.";
    if (score >= 50) return "Passing grade. You can improve your ranking next time.";
    return "Keep practicing to improve your competition ranking.";
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
            Calculating Competition Results
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: isDarkMode ? color.gray300 : color.gray600,
              maxWidth: '400px'
            }}
          >
            Please wait while we compile your competition results...
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
                Competition Completed
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
                        {Math.round(result.correctAnswers)}
                      </Box>{" "}
                      / {result.totalQuestions} correct answers
                    </Typography>
                  </Box>
                </Grid>

                {/* Section Details */}
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
                    // Summary without sections
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
                          Competition Summary
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
                            {Math.round(result.correctAnswers)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                            Final Score:
                          </Typography>
                          <Chip
                            label={`${Math.round(result.score)} points`}
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
            </Box>
          </DialogContent>

          <DialogActions 
            sx={{ 
              p: 3, 
              pt: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 2
            }}
          >
            {submitCompetitionId && (
              <Button
                variant="contained"
                onClick={handleReviewClick}
                sx={{
                  py: 1.5,
                  px: 5,
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
                Review My Test
              </Button>
            )}

            <Button
              variant="outlined"
              onClick={() => {
                onClose();
                window.location.reload();
              }}
              sx={{
                py: 1.5,
                px: 5,
                borderRadius: '8px',
                borderColor: isDarkMode ? color.gray600 : color.gray300,
                color: isDarkMode ? color.gray300 : color.gray600,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: isDarkMode ? color.gray500 : color.gray400,
                  backgroundColor: isDarkMode ? 'rgba(107, 114, 128, 0.1)' : 'rgba(107, 114, 128, 0.05)',
                },
              }}
            >
              Close
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