import { useEffect, useState } from "react";
import { testSpeakingService, questionService } from "services/test";
import { submitTestSpeakingService, submitCompetitionSpeakingService } from "services";
import { TestSpeaking, Question } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import GradingIcon from '@mui/icons-material/Grading';
import CommentIcon from '@mui/icons-material/Comment';

interface SpeakingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  isCompetitionTest?: boolean;
}

interface QuestionWithMeta extends Question {
  parentTestId: number;
  parentTitle: string;
  serial: number;
  totalInParent: number;
}

interface SubmitSpeakingData {
  questionId: number;
  file: string;
  transcript: string;
  score: number;
  comment?: string;
}

export default function SpeakingSection({
  partId,
  testItemIds,
  submitTestId,
  selectedQuestionId,
  startSerial,
  isCompetitionTest = false,
}: SpeakingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
 
  const [loading, setLoading] = useState<boolean>(true);
  const [speakingQuestions, setSpeakingQuestions] = useState<QuestionWithMeta[]>([]);
  const [speakingTests, setSpeakingTests] = useState<Record<number, TestSpeaking>>({});
  const [submitData, setSubmitData] = useState<Record<number, SubmitSpeakingData>>({});
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});
  const [expandedExplanation, setExpandedExplanation] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function fetchSpeakingItems() {
      try {
        setLoading(true);
        
        // Fetch speaking tests
        const speakingItemsResponse = await testSpeakingService.getByIdsAndStatus(testItemIds, true);
        const items: TestSpeaking[] = speakingItemsResponse.data || [];

        const testMap: Record<number, TestSpeaking> = {};
        items.forEach(item => testMap[item.id] = item);
        setSpeakingTests(testMap);

        // Fetch questions for each test
        const allQuestionsFlat: QuestionWithMeta[] = [];

        await Promise.all(
          items.map(async (item) => {
            if (item.questions?.length) {
              const res = await questionService.getByIdsAndStatus(item.questions, true);
              const questionsWithMeta = res.data.map((q: Question, i: number) => ({
                ...q,
                parentTestId: item.id,
                parentTitle: item.title || 'Speaking',
                serial: i + 1,
                totalInParent: res.data.length
              }));
              allQuestionsFlat.push(...questionsWithMeta);
            }
          })
        );

        setSpeakingQuestions(allQuestionsFlat);

        // Fetch submission data
        const response = isCompetitionTest
          ? await submitCompetitionSpeakingService.findBySubmitCompetitionIdAndQuestionIds(
              submitTestId, 
              allQuestionsFlat.map(q => q.id)
            )
          : await submitTestSpeakingService.findBySubmitTestIdAndQuestionIds(
              submitTestId, 
              allQuestionsFlat.map(q => q.id)
            );

        const submissionMap: Record<number, SubmitSpeakingData> = {};
        if (response.data) {
          response.data.forEach((r: any) => {
            const question = allQuestionsFlat.find(q => q.id === r.question_id);
            if (question) {
              submissionMap[question.id] = {
                questionId: r.question_id,
                file: r.file,
                transcript: r.transcript,
                score: r.score,
                comment: 'comment' in r ? r.comment : undefined
              };
            }
          });
        }

        setSubmitData(submissionMap);

        // Expand selected accordion if provided
        if (selectedQuestionId) {
          setExpandedAccordions({
            [`panel-${selectedQuestionId}`]: true
          });
        }

      } catch (error) {
        console.error("Error fetching history speaking items:", error);
      } finally {
        setLoading(false);
      }
    }

    if (testItemIds.length > 0) fetchSpeakingItems();
    
    // Clean up audio elements on unmount
    return () => {
      Object.values(audioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [testItemIds, submitTestId, selectedQuestionId, isCompetitionTest]);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [panel]: isExpanded
    }));
    
    // Pause any playing audio when closing the accordion
    if (!isExpanded && playingAudio && playingAudio.startsWith(`audio-${panel.replace('panel-', '')}`)) {
      const audio = audioElements[playingAudio];
      if (audio) {
        audio.pause();
      }
      setPlayingAudio(null);
    }
  };

  const toggleExplanation = (questionId: number) => {
    setExpandedExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const playAudio = (audioUrl: string, questionId: number) => {
    // Pause any currently playing audio
    if (playingAudio && playingAudio !== `audio-${questionId}`) {
      const currentAudio = audioElements[playingAudio];
      if (currentAudio) {
        currentAudio.pause();
      }
    }

    // Create or get audio element
    let audioElement = audioElements[`audio-${questionId}`];
    
    if (!audioElement) {
      audioElement = new Audio(audioUrl);
      audioElement.addEventListener('ended', () => {
        setPlayingAudio(null);
      });
      
      setAudioElements(prev => ({
        ...prev,
        [`audio-${questionId}`]: audioElement
      }));
    }

    // Play or pause based on current state
    if (playingAudio === `audio-${questionId}`) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      audioElement.play();
      setPlayingAudio(`audio-${questionId}`);
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return isDarkMode ? color.emerald400 : color.emerald600;
    if (percentage >= 60) return isDarkMode ? color.teal400 : color.teal600;
    if (percentage >= 40) return isDarkMode ? color.warning : color.warning;
    return isDarkMode ? color.red400 : color.red600;
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Satisfactory";
    if (percentage >= 40) return "Needs Improvement";
    return "Insufficient";
  };
  
  const calculateMaxScore = (totalQuestions: number) => {
    // Total points for Speaking is 100/6
    const sectionTotalPoints = 100 / 6;
    // Each question's max score is proportional to total questions
    return sectionTotalPoints / totalQuestions;
  };

  if (loading) {
    return (
      <Box 
        component={Paper} 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          p: 3, 
          bgcolor: isDarkMode ? color.gray800 : color.white,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200
        }}
      >
        <CircularProgress size={40} thickness={4} sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} />
      </Box>
    );
  }

  if (speakingQuestions.length === 0) {
    return (
      <Box 
        component={Paper} 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          p: 3, 
          bgcolor: isDarkMode ? color.gray800 : color.white,
          textAlign: 'center'
        }}
      >
        <Alert severity="info">No speaking questions found</Alert>
      </Box>
    );
  }

  // Group questions by their parent test
  const questionsByTest = speakingQuestions.reduce<Record<number, QuestionWithMeta[]>>((acc, question) => {
    if (!acc[question.parentTestId]) {
      acc[question.parentTestId] = [];
    }
    acc[question.parentTestId].push(question);
    return acc;
  }, {});

  // Calculate continuous serial numbers across all tests
  let currentSerial = startSerial;
  const testIds = Object.keys(questionsByTest).sort((a, b) => Number(a) - Number(b));
  
  // Calculate max score per question based on total questions across all tests
  const totalQuestions = speakingQuestions.length;
  const maxScorePerQuestion = calculateMaxScore(totalQuestions);
  const totalMaxScore = 100 / 6; // Total speaking section score

  return (
    <Box>
      {testIds.map((testIdStr) => {
        const testId = Number(testIdStr);
        const questions = questionsByTest[testId];
        const test = speakingTests[testId];
        
        // Create an array to store the serial numbers for this test
        const serialNumbers = questions.map(() => {
          const serial = currentSerial;
          currentSerial++;
          return serial;
        });
        
        return (
          <Box key={testId} sx={{ mb: 4 }}>
            <Box 
              sx={{
                bgcolor: isDarkMode ? color.teal700 : color.teal500,
                borderRadius: "8px 8px 0 0",
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: color.white, 
                  fontWeight: 600,
                  fontSize: '1.5rem'
                }}
              >
                {test.title || '1212'}
              </Typography>
              <Chip 
                label={`${questions.length} Questions`}
                size="small"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.25)',
                  color: color.white,
                  fontWeight: 500,
                  borderRadius: '16px',
                  px: 1
                }}
              />
            </Box>
            
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: "0 0 8px 8px",
                overflow: 'hidden',
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                borderTop: 'none'
              }}
            >
              {questions.map((question, index) => {
                const submission = submitData[question.id];
                const audioUrl = submission?.file;
                const hasAudio = !!audioUrl;
                const isPlaying = playingAudio === `audio-${question.id}`;
                const isExplanationExpanded = expandedExplanation[question.id] || false;
                const isPanelExpanded = expandedAccordions[`panel-${question.id}`] || false;
                const questionSerial = serialNumbers[index];
                
                return (
                  <Accordion 
                    key={question.id}
                    expanded={isPanelExpanded}
                    onChange={handleAccordionChange(`panel-${question.id}`)}
                    disableGutters
                    elevation={0}
                    sx={{
                      borderBottom: index < questions.length - 1 ? `1px solid ${isDarkMode ? color.gray700 : color.gray200}` : 'none',
                      '&:before': {
                        display: 'none',
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon 
                          sx={{ 
                            color: isDarkMode ? color.teal200 : color.teal700,
                            fontSize: 24
                          }} 
                        />
                      }
                      sx={{
                        px: 3,
                        py: 1.5,
                        minHeight: '48px',
                        '& .MuiAccordionSummary-content': {
                          margin: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 1
                        }
                      }}
                    >
                      <Typography 
                        sx={{ 
                          fontWeight: 600, 
                          color: isDarkMode ? color.teal200 : color.teal700,
                          mr: 1,
                          fontSize: '1.1rem'
                        }}
                      >
                        Question {questionSerial}
                      </Typography>
                      
                      {hasAudio && (
                        <Chip 
                          icon={<AudiotrackIcon fontSize="small" />}
                          label="Audio Response" 
                          size="small"
                          sx={{
                            bgcolor: isDarkMode ? 'rgba(94, 234, 212, 0.1)' : 'rgba(94, 234, 212, 0.2)',
                            color: isDarkMode ? color.teal200 : color.teal700,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '16px'
                          }}
                        />
                      )}
                      
                      {submission?.score !== undefined && (
                        <Chip 
                          icon={<GradingIcon fontSize="small" />}
                          label={`Score: ${submission.score.toFixed(1)}/${maxScorePerQuestion.toFixed(1)}`}
                          size="small"
                          sx={{
                            bgcolor: submission.score > 0 
                              ? `${getScoreColor(submission.score, maxScorePerQuestion)}20` 
                              : isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                            color: submission.score > 0 ? getScoreColor(submission.score, maxScorePerQuestion) : isDarkMode ? color.red400 : color.red600,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '16px'
                          }}
                        />
                      )}
                      
                      {submission?.comment && (
                        <Chip 
                          icon={<CommentIcon fontSize="small" />}
                          label="Feedback" 
                          size="small"
                          sx={{
                            bgcolor: isDarkMode ? color.gray700 : color.gray100,
                            color: isDarkMode ? color.gray200 : color.gray800,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '16px'
                          }}
                        />
                      )}
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 0 }}>
                      {isPanelExpanded && (
                        <>
                          {/* Question content */}
                          <Box 
                            sx={{ 
                              bgcolor: isDarkMode ? color.gray700 : color.gray50,
                              p: 3,
                              mx: 3,
                              mb: 3,
                              borderRadius: 1,
                              position: 'relative'
                            }}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              mb: 1
                            }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600, 
                                  color: isDarkMode ? color.teal200 : color.teal700
                                }}
                              >
                                Question Prompt
                              </Typography>
                              
                              {question.explanation && (
                                <IconButton 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExplanation(question.id);
                                  }}
                                  size="small"
                                  sx={{
                                    color: isDarkMode ? color.teal300 : color.teal600
                                  }}
                                >
                                  <InfoIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                            
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: isDarkMode ? color.gray200 : color.gray800,
                                whiteSpace: 'pre-wrap'
                              }}
                            >
                              {question.content}
                            </Typography>
                            
                            {isExplanationExpanded && question.explanation && (
                              <Box 
                                sx={{ 
                                  mt: 2,
                                  p: 2,
                                  bgcolor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                                  borderRadius: 1,
                                  borderLeft: `3px solid ${isDarkMode ? color.teal400 : color.teal500}`
                                }}
                              >
                                <Typography 
                                  variant="subtitle2" 
                                  sx={{ 
                                    mb: 0.5,
                                    color: isDarkMode ? color.teal200 : color.teal700,
                                    fontWeight: 600
                                  }}
                                >
                                  Explanation
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: isDarkMode ? color.gray300 : color.gray700
                                  }}
                                >
                                  {question.explanation}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          
                          <Grid container spacing={2} sx={{ px: 3, mb: 3 }}>
                            {/* Result section */}
                            <Grid item xs={12} md={6}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 600, 
                                  color: isDarkMode ? color.teal200 : color.teal700,
                                  mb: 2,
                                  ml: 1
                                }}
                              >
                                Your Result
                              </Typography>
                              
                              <Box 
                                sx={{ 
                                  p: 3,
                                  bgcolor: isDarkMode ? color.gray800 : color.white,
                                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                                  borderRadius: 1,
                                  height: '100%',
                                  minHeight: '120px'
                                }}
                              >
                                <Box sx={{ 
                                  display: 'flex',
                                  flexDirection: 'column',
                                  height: '100%'
                                }}>
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      color: getScoreColor(submission?.score || 0, maxScorePerQuestion),
                                      mb: 1.5,
                                      fontWeight: 600
                                    }}
                                  >
                                    {getScoreLabel(submission?.score || 0, maxScorePerQuestion)}
                                  </Typography>
                                  
                                  <Box sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2
                                  }}>
                                    <Box sx={{ 
                                      position: 'relative',
                                      width: 80,
                                      height: 80,
                                      mr: 2
                                    }}>
                                      <CircularProgress
                                        variant="determinate"
                                        value={100}
                                        size={80}
                                        thickness={4}
                                        sx={{ 
                                          color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                          position: 'absolute'
                                        }}
                                      />
                                      <CircularProgress
                                        variant="determinate"
                                        value={(submission?.score / maxScorePerQuestion) * 100}
                                        size={80}
                                        thickness={4}
                                        sx={{ 
                                          color: getScoreColor(submission?.score || 0, maxScorePerQuestion),
                                          position: 'absolute'
                                        }}
                                      />
                                      <Box sx={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <Typography 
                                          variant="h5" 
                                          sx={{ 
                                            fontWeight: 600,
                                            color: getScoreColor(submission?.score || 0, maxScorePerQuestion),
                                            lineHeight: 1
                                          }}
                                        >
                                          {submission?.score ? submission.score.toFixed(1) : '0'}
                                        </Typography>
                                        <Typography 
                                          variant="caption" 
                                          sx={{ 
                                            color: isDarkMode ? color.gray400 : color.gray600,
                                            display: 'block',
                                            fontSize: '0.7rem',
                                            mt: -0.5
                                          }}
                                        >
                                          /{maxScorePerQuestion.toFixed(1)}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    
                                    <Box sx={{ flex: 1 }}>
                                      <Typography 
                                        variant="body2" 
                                        sx={{ 
                                          color: isDarkMode ? color.gray300 : color.gray700,
                                          mb: 0.5
                                        }}
                                      >
                                        Speaking section total: {totalMaxScore.toFixed(1)} points
                                      </Typography>
                                      <Typography 
                                        variant="body2" 
                                        sx={{ 
                                          color: isDarkMode ? color.gray400 : color.gray600,
                                          fontSize: '0.8rem'
                                        }}
                                      >
                                        Each question: {maxScorePerQuestion.toFixed(1)} points
                                      </Typography>
                                    </Box>
                                  </Box>
                                  
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      color: isDarkMode ? color.gray300 : color.gray700
                                    }}
                                  >
                                    This score contributes to your overall speaking assessment.
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            
                            {/* Audio and transcript section */}
                            <Grid item xs={12} md={6}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 600, 
                                  color: isDarkMode ? color.teal200 : color.teal700,
                                  mb: 2,
                                  ml: 1
                                }}
                              >
                                Your Response
                              </Typography>
                              
                              <Box 
                                sx={{ 
                                  p: 3,
                                  bgcolor: isDarkMode ? color.gray800 : color.white,
                                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                                  borderRadius: 1,
                                  mb: 2,
                                  minHeight: '80px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {hasAudio ? (
                                  <>
                                    <IconButton 
                                      onClick={() => playAudio(audioUrl, question.id)}
                                      size="medium"
                                      sx={{
                                        bgcolor: isPlaying ? color.teal500 : 'rgba(20, 184, 166, 0.1)',
                                        color: isPlaying ? color.white : (isDarkMode ? color.teal300 : color.teal600),
                                        mr: 2,
                                        '&:hover': {
                                          bgcolor: isDarkMode ? color.teal600 : color.teal400
                                        }
                                      }}
                                    >
                                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                    </IconButton>
                                    <Typography variant="body1" color={isDarkMode ? color.gray300 : color.gray700}>
                                      {isPlaying ? "Playing audio..." : "Click to play your recorded answer"}
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      color: isDarkMode ? color.gray400 : color.gray500,
                                      fontStyle: 'italic',
                                      textAlign: 'center'
                                    }}
                                  >
                                    No audio recording available
                                  </Typography>
                                )}
                              </Box>
                              
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 600, 
                                  color: isDarkMode ? color.teal200 : color.teal700,
                                  mb: 2,
                                  ml: 1
                                }}
                              >
                                Transcript
                              </Typography>
                              
                              <Box 
                                sx={{ 
                                  p: 3,
                                  bgcolor: isDarkMode ? color.gray800 : color.white,
                                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                                  borderRadius: 1,
                                  minHeight: '80px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {submission?.transcript ? (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      color: isDarkMode ? color.gray300 : color.gray700,
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    "{submission.transcript}"
                                  </Typography>
                                ) : (
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      color: isDarkMode ? color.gray400 : color.gray500,
                                      fontStyle: 'italic'
                                    }}
                                  >
                                    No transcript available
                                  </Typography>
                                )}
                              </Box>
                              
                              {submission?.comment && (
                                <>
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      fontWeight: 600, 
                                      color: isDarkMode ? color.teal200 : color.teal700,
                                      mb: 2,
                                      ml: 1,
                                      mt: 2
                                    }}
                                  >
                                    AI Feedback
                                  </Typography>
                                  
                                  <Box 
                                    sx={{ 
                                      p: 3,
                                      bgcolor: isDarkMode ? color.gray800 : color.white,
                                      border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                                      borderRadius: 1,
                                      minHeight: '80px'
                                    }}
                                  >
                                    <Typography 
                                      variant="body1" 
                                      sx={{ 
                                        color: isDarkMode ? color.gray300 : color.gray700
                                      }}
                                    >
                                      {submission.comment}
                                    </Typography>
                                  </Box>
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}