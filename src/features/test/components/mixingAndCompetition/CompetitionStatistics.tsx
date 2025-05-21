import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Avatar,
  LinearProgress,
  Alert,
  Paper,
  Tooltip,
  Divider
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CreateIcon from '@mui/icons-material/Create';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { competitionStatsService, CompetitionStatsDTO } from 'services';

interface CompetitionStatsProps {
  competitionId: number;
}

export default function CompetitionStatistics({ competitionId }: CompetitionStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [statistics, setStatistics] = useState<CompetitionStatsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await competitionStatsService.getCompetitionStats(competitionId);
        setStatistics(response.data);
      } catch (err) {
        console.error('Error fetching competition statistics:', err);
        setError('Failed to load competition statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [competitionId]);

  const getPartIcon = (type: string) => {
    switch (type) {
      case 'VOCABULARY':
        return <SpellcheckIcon />;
      case 'GRAMMAR':
        return <GTranslateIcon />;
      case 'READING':
        return <MenuBookIcon />;
      case 'LISTENING':
        return <HeadphonesIcon />;
      case 'SPEAKING':
        return <RecordVoiceOverIcon />;
      case 'WRITING':
        return <CreateIcon />;
      default:
        return null;
    }
  };

  const getPartColor = (type: string) => {
    switch (type) {
      case 'VOCABULARY':
        return isDarkMode ? color.teal300 : color.teal600;
      case 'GRAMMAR':
        return isDarkMode ? color.emerald300 : color.emerald600;
      case 'READING':
        return isDarkMode ? color.green300 : color.green600;
      case 'LISTENING':
        return isDarkMode ? color.teal400 : color.teal700;
      case 'SPEAKING':
        return isDarkMode ? color.emerald400 : color.emerald700;
      case 'WRITING':
        return isDarkMode ? color.green400 : color.green700;
      default:
        return isDarkMode ? color.gray300 : color.gray700;
    }
  };

  const getPartLabel = (type: string) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return isDarkMode ? color.green300 : color.green600;
    if (accuracy >= 60) return isDarkMode ? color.emerald300 : color.emerald600;
    if (accuracy >= 40) return isDarkMode ? color.teal300 : color.teal600;
    return isDarkMode ? color.red400 : color.red600;
  };

  const formatScore = (score: number) => {
    return Math.round(score * 10) / 10;
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 5 }}>
        <CircularProgress color="inherit" />
        <Typography sx={{ mt: 2, color: isDarkMode ? color.gray300 : color.gray700 }}>
          Loading competition statistics...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: '16px',
          my: 4
        }}
      >
        {error}
      </Alert>
    );
  }

  if (!statistics) {
    return (
      <Alert 
        severity="info"
        sx={{ 
          borderRadius: '16px',
          my: 4
        }}
      >
        No statistics available for this competition yet.
      </Alert>
    );
  }

  // Calculate max score per part (total 100 points divided by 6 parts)
  const maxScorePerPart = 100 / 6;

  return (
    <Box sx={{ mt: 6, mb: 8 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 800,
          color: isDarkMode ? color.gray100 : color.gray900,
          mb: 4,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        Competition Analytics
      </Typography>
      
      <Grid container spacing={4}>
        {/* Overview Summary */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '24px',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: isDarkMode ? color.gray100 : color.gray900,
                  mb: 3
                }}
              >
                Competition Summary
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: isDarkMode ? color.gray700 : color.gray100,
                      textAlign: 'center'
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: isDarkMode ? color.gray300 : color.gray600,
                      }}
                    >
                      Average Score
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: getAccuracyColor(statistics.scoreSummary.averageScore),
                        my: 1
                      }}
                    >
                      {Math.round(statistics.scoreSummary.averageScore)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                      out of 100 points
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: isDarkMode ? color.gray700 : color.gray100,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              color: isDarkMode ? color.gray300 : color.gray600,
                            }}
                          >
                            Highest
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: isDarkMode ? color.green300 : color.green600,
                            }}
                          >
                            {Math.round(statistics.scoreSummary.highestScore)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                            points
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              color: isDarkMode ? color.gray300 : color.gray600,
                            }}
                          >
                            Lowest
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: isDarkMode ? color.red300 : color.red600,
                            }}
                          >
                            {Math.round(statistics.scoreSummary.lowestScore)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                            points
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: '12px',
                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: isDarkMode ? color.gray300 : color.gray600,
                    mb: 2
                  }}
                >
                  Passing Rate: {Math.round(statistics.scoreSummary.passRate)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={statistics.scoreSummary.passRate}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: isDarkMode ? color.green300 : color.green600,
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                    {statistics.scoreSummary.passCount} Passed
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                    {statistics.scoreSummary.failCount} Failed
                  </Typography>
                </Box>
              </Box>
              
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: '12px',
                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: isDarkMode ? color.gray300 : color.gray600,
                    mb: 1
                  }}
                >
                  Competition Details
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                    Total Participants:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                    {statistics.totalSubmissions}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                    Completed Tests:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                    {statistics.completedSubmissions}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                    Total Questions:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                    {statistics.totalQuestions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Score Distribution */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '24px',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: isDarkMode ? color.gray100 : color.gray900,
                  mb: 3
                }}
              >
                Score Distribution
              </Typography>
              
              <Box sx={{ px: 2 }}>
                {Object.entries(statistics.scoreDistribution).map(([range, count]) => (
                  <Box key={range} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                        {range} points
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                        {count} {count === 1 ? 'person' : 'people'}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(count / statistics.totalSubmissions) * 100}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: (() => {
                            const [min] = range.split('-').map(Number);
                            return getAccuracyColor(min);
                          })(),
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      
        {/* Section Performance */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: '24px',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    color: isDarkMode ? color.gray100 : color.gray900,
                    mr: 2
                  }}
                >
                  Section Performance
                </Typography>
                <Tooltip title="Total score is 100 points, divided equally among 6 sections (16.7 points each)">
                  <Chip
                    icon={<InfoOutlinedIcon sx={{ fontSize: 16 }} />}
                    label={`Each section: ${formatScore(maxScorePerPart)} points`}
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      color: isDarkMode ? color.gray300 : color.gray600,
                      fontWeight: 500,
                      mr: 1,
                      mb: { xs: 1, sm: 0 }
                    }}
                  />
                </Tooltip>
                <Tooltip title="The percentage of correct answers for each section">
                  <Chip
                    label="Accuracy = % correct answers"
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      color: isDarkMode ? color.gray300 : color.gray600,
                      fontWeight: 500,
                      mb: { xs: 1, sm: 0 }
                    }}
                  />
                </Tooltip>
              </Box>
              
              <Grid container spacing={3}>
                {statistics.partStats.map((part) => {
                  // Calculate percentage of maximum possible score
                  const scorePercent = (part.averageScore / maxScorePerPart) * 100;
                  
                  return (
                    <Grid item xs={12} md={6} lg={4} key={part.type}>
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: '16px',
                          bgcolor: isDarkMode ? color.gray700 : color.gray100,
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                          overflow: 'hidden',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                          }
                        }}
                      >
                        {/* Section Header */}
                        <Box sx={{ 
                          p: 2, 
                          display: 'flex', 
                          alignItems: 'center',
                          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                        }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              color: getPartColor(part.type),
                              mr: 2
                            }}
                          >
                            {getPartIcon(part.type)}
                          </Avatar>
                          <Box>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                color: isDarkMode ? color.gray100 : color.gray900,
                                lineHeight: 1.2
                              }}
                            >
                              {getPartLabel(part.type)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}>
                              {part.totalQuestions} questions
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Section Content */}
                        <Box sx={{ p: 2 }}>
                          {/* Score */}
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray300 : color.gray600 }}>
                                Average Score
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: 700, 
                                    color: getAccuracyColor(scorePercent)
                                  }}
                                >
                                  {formatScore(part.averageScore)}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    color: isDarkMode ? color.gray400 : color.gray600,
                                    ml: 0.5
                                  }}
                                >
                                  /{formatScore(maxScorePerPart)}
                                </Typography>
                              </Box>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={scorePercent}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: getAccuracyColor(scorePercent),
                                },
                              }}
                            />
                          </Box>

                          <Divider sx={{ my: 2, borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                            
                          {/* Accuracy */}
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: isDarkMode ? color.gray300 : color.gray600 }}>
                                Average Accuracy
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontWeight: 700, 
                                  color: getAccuracyColor(part.averageAccuracy)
                                }}
                              >
                                {formatScore(part.averageAccuracy)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={part.averageAccuracy}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: getAccuracyColor(part.averageAccuracy),
                                },
                              }}
                            />
                          </Box>
                          
                          {/* Question Difficulty */}
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600,
                              color: isDarkMode ? color.gray300 : color.gray600,
                              mt: 3,
                              mb: 1
                            }}
                          >
                            Question Difficulty
                          </Typography>
                          
                          <Grid container spacing={1}>
                            {Object.entries(part.accuracyDistribution || {}).map(([range, percent]) => {
                              // Extract min accuracy from range (e.g., "0-20%" → 0)
                              const [min] = range.split('-').map(s => parseInt(s));
                              let difficultyLabel = '';
                              
                              // Assign difficulty label based on accuracy range
                              if (min < 20) difficultyLabel = 'Very Hard';
                              else if (min < 40) difficultyLabel = 'Hard';
                              else if (min < 60) difficultyLabel = 'Medium';
                              else if (min < 80) difficultyLabel = 'Easy';
                              else difficultyLabel = 'Very Easy';
                              
                              return (
                                <Grid item xs={12} key={range}>
                                  <Box sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box 
                                          sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: '50%',
                                            bgcolor: getAccuracyColor(min),
                                            mr: 1
                                          }} 
                                        />
                                        <Typography variant="caption" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                                          {difficultyLabel}
                                        </Typography>
                                      </Box>
                                      <Typography variant="caption" sx={{ fontWeight: 600, color: isDarkMode ? color.gray200 : color.gray800 }}>
                                        {formatScore(percent)}%
                                      </Typography>
                                    </Box>
                                    <LinearProgress
                                      variant="determinate"
                                      value={percent}
                                      sx={{
                                        height: 4,
                                        borderRadius: 2,
                                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: getAccuracyColor(min),
                                        },
                                      }}
                                    />
                                  </Box>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}