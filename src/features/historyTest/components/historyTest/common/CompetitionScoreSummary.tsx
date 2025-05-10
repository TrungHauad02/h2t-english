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
  Stack
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestPartTypeEnum } from "interfaces";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HearingIcon from '@mui/icons-material/Hearing';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CreateIcon from '@mui/icons-material/Create';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';

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

const CompetitionScoreSummary: React.FC<CompetitionScoreSummaryProps> = ({
  competitionTitle,
  completedDate,
  totalScore,
  sectionScores
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const maxTotalScore = 100;
  
  // Medal color based on score
  const getMedalColor = (score: number) => {
    if (score >= 90) return 'gold';
    if (score >= 75) return 'silver';
    if (score >= 60) return '#CD7F32'; // bronze
    return isDarkMode ? color.gray400 : color.gray600;
  };

  // Achievement label based on score
  const getAchievementLabel = (score: number) => {
    if (score >= 90) return "Gold Medal";
    if (score >= 75) return "Silver Medal";
    if (score >= 60) return "Bronze Medal";
    return "Participation";
  };

  // Get icon for each section tab
  const getTabIcon = (section: TestPartTypeEnum) => {
    switch(section) {
      case TestPartTypeEnum.VOCABULARY: return <SpellcheckIcon />;
      case TestPartTypeEnum.GRAMMAR: return <GavelIcon />;
      case TestPartTypeEnum.READING: return <MenuBookIcon />;
      case TestPartTypeEnum.LISTENING: return <HearingIcon />;
      case TestPartTypeEnum.SPEAKING: return <RecordVoiceOverIcon />;
      case TestPartTypeEnum.WRITING: return <CreateIcon />;
      default: return null;
    }
  };

  // Format date to a readable string
  const formatDate = (date: string | Date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };

  return (
    <Card
      elevation={4}
      sx={{
        mb: 4,
        borderRadius: '1rem',
        bgcolor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        overflow: 'hidden',
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0,0,0,0.25)'
          : '0 8px 32px rgba(0,0,0,0.08)',
      }}
    >
      <Box 
        sx={{ 
          p: 3, 
          background: `linear-gradient(135deg, ${isDarkMode ? color.teal800 : color.teal600} 0%, ${isDarkMode ? color.teal700 : color.teal400} 100%)`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 40 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {competitionTitle || "Competition Results"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
            Completed on: {formatDate(completedDate)}
          </Typography>
        </Box>
        
        <Chip 
          icon={<StarsRoundedIcon />} 
          label={getAchievementLabel(totalScore)}
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 'bold',
            px: 1,
            '& .MuiChip-icon': {
              color: getMedalColor(totalScore)
            }
          }}
        />
      </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Total Score */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: isDarkMode ? color.gray900 : 'rgba(20, 184, 166, 0.05)',
              borderRadius: '1rem',
              position: 'relative',
              border: `1px solid ${isDarkMode ? color.gray700 : color.teal100}`,
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 'bold', 
                  color: isDarkMode ? color.teal200 : color.teal700 
                }}
              >
                Overall Score
              </Typography>
              
              <Box sx={{ 
                position: 'relative', 
                width: 140, 
                height: 140, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={140}
                  thickness={4}
                  sx={{ 
                    color: isDarkMode ? color.gray700 : color.gray200,
                    position: 'absolute'
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={(totalScore / maxTotalScore) * 100}
                  size={140}
                  thickness={6}
                  sx={{ 
                    color: getMedalColor(totalScore),
                    position: 'absolute',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    }
                  }}
                />
                <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: isDarkMode ? color.gray100 : color.gray900,
                      lineHeight: 1
                    }}
                  >
                    {totalScore}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isDarkMode ? color.gray400 : color.gray600,
                      display: 'block'
                    }}
                  >
                    out of {maxTotalScore}
                  </Typography>
                </Box>
              </Box>
              
              <StarRoundedIcon 
                sx={{ 
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  fontSize: 28,
                  color: getMedalColor(totalScore)
                }}
              />
            </Box>
          </Grid>
          
          {/* Section Scores */}
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              p: 3, 
              bgcolor: isDarkMode ? color.gray900 : color.gray50,
              borderRadius: '1rem',
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              height: '100%'
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 'bold', 
                  color: isDarkMode ? color.gray200 : color.gray800 
                }}
              >
                Section Scores
              </Typography>
              
              <Stack spacing={2}>
                {Object.entries(sectionScores).map(([section, score]) => {
                  const sectionType = section as TestPartTypeEnum;
                  const icon = getTabIcon(sectionType);
                  const sectionMaxScore = 100/6; // Each section has equal weight
                  const percentage = (score / sectionMaxScore) * 100;
                  
                  return (
                    <Box key={section} sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: isDarkMode ? color.gray800 : color.gray100,
                              color: isDarkMode ? color.teal300 : color.teal600
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
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: isDarkMode ? color.gray200 : color.gray800
                          }}
                        >
                          {score.toFixed(1)}/{sectionMaxScore.toFixed(1)}
                        </Typography>
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
                            bgcolor: percentage >= 80 
                              ? (isDarkMode ? color.emerald400 : color.emerald600)
                              : percentage >= 60 
                              ? (isDarkMode ? color.teal400 : color.teal600)
                              : percentage >= 40 
                              ? (isDarkMode ? color.warning : color.warning)
                              : (isDarkMode ? color.red400 : color.red600)
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompetitionScoreSummary;