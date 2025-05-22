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
    return '#9CA3AF'; // gray for participation
  };

  // Get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return '#4ADE80'; // Green
    if (score >= 60) return '#60A5FA'; // Blue
    if (score >= 40) return '#FCD34D'; // Yellow
    return '#FF6B6B'; // Red
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
    if (percentage >= 80) return '#4ADE80'; // Green
    if (percentage >= 60) return '#60A5FA'; // Blue
    if (percentage >= 40) return '#FCD34D'; // Yellow
    return '#FF6B6B'; // Red
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
        {/* Total Score Card */}
<Grid item xs={12} md={4}>
  {/* Calculate score percentage */}
  {(() => {
    const scorePercentage = (totalScore / maxTotalScore) * 100;
    return (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      borderRadius: '1.5rem',
      bgcolor: isDarkMode ? color.gray800 : color.white,
      border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      boxShadow: isDarkMode
        ? '0 8px 24px rgba(0,0,0,0.25)'
        : '0 8px 24px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: isDarkMode
          ? '0 12px 28px rgba(0,0,0,0.3)'
          : '0 12px 28px rgba(0,0,0,0.1)',
      }
    }}
  >
    <CardContent
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: isDarkMode ? color.teal300 : '#4F8A8B',
          textAlign: 'center',
          letterSpacing: '0.01em'
        }}
      >
        Overall Performance
      </Typography>
      
      <Box sx={{
        position: 'relative',
        width: { xs: 200, md: 240 },
        height: { xs: 200, md: 240 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
      }}>
        {/* Background circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={isMobile ? 200 : 240}
          thickness={12}
          sx={{
            color: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            position: 'absolute'
          }}
        />
        
        {/* Animated progress circle */}
        <CircularProgress
          variant="determinate"
          value={scorePercentage}
          size={isMobile ? 200 : 240}
          thickness={12}
          sx={{
            color: getProgressColor(totalScore),
            position: 'absolute',
            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
              filter: isDarkMode ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))' : 'none'
            }
          }}
        />
        
        {/* Gradient overlay for progress (optional) */}
        <Box 
          sx={{
            position: 'absolute',
            width: isMobile ? 200 : 240,
            height: isMobile ? 200 : 240,
            borderRadius: '50%',
            background: `conic-gradient(${getProgressColor(totalScore)} 0% ${scorePercentage}%, transparent ${scorePercentage}% 100%)`,
            opacity: 0.15,
            filter: 'blur(10px)'
          }}
        />
        
        {/* Center content */}
        <Box sx={{
          textAlign: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}>
          <Typography
            variant={isMobile ? "h1" : "h1"}
            sx={{
              fontSize: { xs: '4rem', md: '5rem' },
              fontWeight: 800,
              color: isDarkMode ? color.gray100 : '#111827',
              lineHeight: 0.9,
              mb: 1
            }}
          >
            {totalScore}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray400 : '#6B7280',
              fontWeight: 500,
              opacity: 0.9
            }}
          >
            out of {maxTotalScore}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: getProgressColor(totalScore),
              fontWeight: 700,
              mt: 1,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {Math.round(scorePercentage)}%
          </Typography>
        </Box>
      </Box>
      
      {/* Optional status indicator */}
      <Box 
        sx={{
          mt: 2,
          px: 3,
          py: 1,
          borderRadius: 'full',
          backgroundColor: `${getProgressColor(totalScore)}15`,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box 
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: getProgressColor(totalScore),
            boxShadow: `0 0 8px ${getProgressColor(totalScore)}`
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: getProgressColor(totalScore),
            fontWeight: 600
          }}
        >
          {scorePercentage < 40 ? 'Needs Improvement' : 
           scorePercentage < 70 ? 'Making Progress' : 'Excellent'}
        </Typography>
      </Box>
    </CardContent>
  </Card>
    );
  })()}
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
                          bgcolor: isDarkMode ? color.gray700 : '#F0F0F0',
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