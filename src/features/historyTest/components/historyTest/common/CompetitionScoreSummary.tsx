import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Stack,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestPartTypeEnum } from "interfaces";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HearingIcon from '@mui/icons-material/Hearing';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CreateIcon from '@mui/icons-material/Create';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrophyIcon from '@mui/icons-material/EmojiEvents';

interface SectionScores {
  VOCABULARY: number;
  GRAMMAR: number;
  READING: number;
  LISTENING: number;
  SPEAKING: number;
  WRITING: number;
  [key: string]: number;
}

interface CompetitionScoreSummaryProps {
  competitionTitle: string;
  completedDate: string | Date;
  totalScore: number;
  sectionScores: SectionScores;
}

export default function CompetitionScoreSummary({
  competitionTitle,
  completedDate,
  totalScore,
  sectionScores
}: CompetitionScoreSummaryProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const maxTotalScore = 100;
  
  // Medal color based on score
  const getMedalColor = (score: number) => {
    if (score >= 90) return color.yellow;
    if (score >= 75) return color.gray400;
    if (score >= 60) return '#CD7F32'; // bronze
    return isDarkMode ? color.gray500 : color.gray400;
  };

  // Achievement label based on score
  const getAchievementLabel = (score: number) => {
    if (score >= 90) return "Gold Medal";
    if (score >= 75) return "Silver Medal";
    if (score >= 60) return "Bronze Medal";
    return "Participation";
  };

  // Get color for section based on score
  const getSectionColor = (percentage: number) => {
    if (percentage >= 80) return isDarkMode ? color.emerald400 : color.emerald600;
    if (percentage >= 60) return isDarkMode ? color.teal400 : color.teal600;
    if (percentage >= 40) return isDarkMode ? color.warning : color.warningDarkMode;
    return isDarkMode ? color.red400 : color.red600;
  };

  // Get icon for each section tab
  const getTabIcon = (section: TestPartTypeEnum) => {
    switch(section) {
      case TestPartTypeEnum.VOCABULARY: 
        return <SpellcheckIcon sx={{ fontSize: 20 }} />;
      case TestPartTypeEnum.GRAMMAR: 
        return <GavelIcon sx={{ fontSize: 20 }} />;
      case TestPartTypeEnum.READING: 
        return <MenuBookIcon sx={{ fontSize: 20 }} />;
      case TestPartTypeEnum.LISTENING: 
        return <HearingIcon sx={{ fontSize: 20 }} />;
      case TestPartTypeEnum.SPEAKING: 
        return <RecordVoiceOverIcon sx={{ fontSize: 20 }} />;
      case TestPartTypeEnum.WRITING: 
        return <CreateIcon sx={{ fontSize: 20 }} />;
      default: return null;
    }
  };

  // Format date to a readable string
  const formatDate = (date: string | Date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Score Summary Header - Simple version */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TrophyIcon 
            sx={{ 
              fontSize: 32, 
              color: getMedalColor(totalScore)
            }} 
          />
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: isDarkMode ? color.gray100 : color.gray900
              }}
            >
              {competitionTitle || "Competition Results"}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 14, color: isDarkMode ? color.gray400 : color.gray600 }} />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray600 
                }}
              >
                {formatDate(completedDate)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Chip 
            icon={<StarRoundedIcon />} 
            label={getAchievementLabel(totalScore)}
            size="medium"
            sx={{ 
              bgcolor: getMedalColor(totalScore),
              color: totalScore >= 60 ? color.gray900 : 'white',
              fontWeight: 'bold',
              '& .MuiChip-icon': {
                color: totalScore >= 60 ? color.gray900 : 'white'
              }
            }}
          />
        </Box>
      </Box>

      {/* Main Score Cards */}
      <Grid container spacing={3}>
        {/* Total Score Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{ 
              height: '100%',
              borderRadius: '1rem',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(0,0,0,0.2)'
                : '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <CardContent
              sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  color: isDarkMode ? color.teal300 : color.teal700,
                  textAlign: 'center'
                }}
              >
                Overall Performance
              </Typography>
              
              <Box sx={{ 
                position: 'relative', 
                width: { xs: 140, md: 180 }, 
                height: { xs: 140, md: 180 }, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2
              }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={isMobile ? 140 : 180}
                  thickness={4}
                  sx={{ 
                    color: isDarkMode ? color.gray700 : color.gray200,
                    position: 'absolute'
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={(totalScore / maxTotalScore) * 100}
                  size={isMobile ? 140 : 180}
                  thickness={6}
                  sx={{ 
                    color: getMedalColor(totalScore),
                    position: 'absolute',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant={isMobile ? "h2" : "h1"} 
                    sx={{ 
                      fontWeight: 'bold',
                      color: isDarkMode ? color.gray100 : color.gray900,
                      lineHeight: 1
                    }}
                  >
                    {totalScore}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: isDarkMode ? color.gray400 : color.gray600,
                      mt: 0.5
                    }}
                  >
                    out of {maxTotalScore}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getMedalColor(totalScore),
                      fontWeight: 'bold',
                      mt: 1
                    }}
                  >
                    {Math.round((totalScore / maxTotalScore) * 100)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Section Scores */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{ 
              height: '100%',
              borderRadius: '1rem',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(0,0,0,0.2)'
                : '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  color: isDarkMode ? color.gray200 : color.gray800 
                }}
              >
                Section Breakdown
              </Typography>
              
              <Stack spacing={2.5}>
                {Object.entries(sectionScores).map(([section, score]) => {
                  const sectionType = section as TestPartTypeEnum;
                  const icon = getTabIcon(sectionType);
                  const sectionMaxScore = 100/6;
                  const percentage = (score / sectionMaxScore) * 100;
                  
                  return (
                    <Box key={section} sx={{ width: '100%' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mb: 1, 
                        alignItems: 'center' 
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: isDarkMode 
                                ? `${getSectionColor(percentage)}20` 
                                : `${getSectionColor(percentage)}15`,
                              color: getSectionColor(percentage),
                            }}
                          >
                            {icon}
                          </Avatar>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'medium',
                              color: isDarkMode ? color.gray200 : color.gray800
                            }}
                          >
                            {section.charAt(0) + section.slice(1).toLowerCase()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: getSectionColor(percentage)
                            }}
                          >
                            {Math.round(percentage)}%
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: isDarkMode ? color.gray400 : color.gray600
                            }}
                          >
                            ({score.toFixed(1)}/{sectionMaxScore.toFixed(1)})
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: isDarkMode ? color.gray700 : color.gray200,
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            bgcolor: getSectionColor(percentage),
                            transition: 'transform 0.5s ease'
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}