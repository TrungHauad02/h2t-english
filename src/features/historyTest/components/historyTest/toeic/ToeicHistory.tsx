import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Tabs,
  Tab,
  alpha,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Article as ArticleIcon,
  Headphones as HeadphonesIcon,
  MenuBook as MenuBookIcon,
  AutoStories as AutoStoriesIcon
} from '@mui/icons-material';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { Toeic, SubmitToeic } from 'interfaces/TestInterfaces';
import TestResultSummary from '../common/resultSummary/TestResultSummary';

// Import history components for each part
import Part1History from './Part1History';
import Part2History from './Part2History';
import Part3And4History from './Part3And4History';
import Part5History from './Part5History';
import Part6History from './Part6History';
import Part7History from './Part7History';

type Props = {
  toeic: Toeic;
  submitToeic: SubmitToeic;
};

interface TabConfig {
  label: string;
  questions: number;
  icon: React.ReactNode;
  colorDark: string;
  colorLight: string;
}

export default function ToeicHistory({ toeic, submitToeic }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const tabsConfig: TabConfig[] = [
    { 
      label: 'Part 1', 
      questions: 6, 
      icon: <HeadphonesIcon fontSize="small" />,
      colorDark: color.teal400,
      colorLight: color.teal600
    },
    { 
      label: 'Part 2', 
      questions: 25, 
      icon: <HeadphonesIcon fontSize="small" />,
      colorDark: color.emerald400,
      colorLight: color.emerald600
    },
    { 
      label: 'Part 3', 
      questions: 39, 
      icon: <HeadphonesIcon fontSize="small" />,
      colorDark: color.green400,
      colorLight: color.green600
    },
    { 
      label: 'Part 4', 
      questions: 30, 
      icon: <HeadphonesIcon fontSize="small" />,
      colorDark: color.teal400,
      colorLight: color.teal600
    },
    { 
      label: 'Part 5', 
      questions: 30, 
      icon: <ArticleIcon fontSize="small" />,
      colorDark: color.emerald400,
      colorLight: color.emerald600
    },
    { 
      label: 'Part 6', 
      questions: 16, 
      icon: <MenuBookIcon fontSize="small" />,
      colorDark: color.green400,
      colorLight: color.green600
    },
    { 
      label: 'Part 7', 
      questions: 54, 
      icon: <AutoStoriesIcon fontSize="small" />,
      colorDark: color.teal400,
      colorLight: color.teal600
    }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Part1History 
          questionsPart1={toeic.questionsPart1 ?? []} 
          submitToeicId={submitToeic.id} 
        />;
      case 1:
        return <Part2History 
          questionsPart2={toeic.questionsPart2 ?? []} 
          submitToeicId={submitToeic.id} 
        />;
      case 2:
        return <Part3And4History 
          questions={toeic.questionsPart3 ?? []} 
          submitToeicId={submitToeic.id}
          partNumber={3}
        />;
      case 3:
        return <Part3And4History 
          questions={toeic.questionsPart4 ?? []} 
          submitToeicId={submitToeic.id}
          partNumber={4}
        />;
      case 4:
        return <Part5History 
          questionsPart5={toeic.questionsPart5 ?? []} 
          submitToeicId={submitToeic.id} 
        />;
      case 5:
        return <Part6History 
          questionsPart6={toeic.questionsPart6 ?? []} 
          submitToeicId={submitToeic.id} 
        />;
      case 6:
        return <Part7History 
          questionsPart7={toeic.questionsPart7 ?? []} 
          submitToeicId={submitToeic.id} 
        />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 3,
      boxShadow: `0 16px 48px ${alpha(isDarkMode ? color.black : color.gray900, 0.15)}`,
      overflow: 'hidden',
      bgcolor: isDarkMode ? color.gray900 : color.white,
      border: '1px solid',
      borderColor: isDarkMode ? color.gray800 : color.gray100,
    }}>
      {/* Header */}
      <Box
        sx={{
          color: color.white,
          px: { xs: 3, md: 4 },
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.emerald800} 100%)`
            : `linear-gradient(135deg, ${color.teal500} 0%, ${color.emerald600} 100%)`,
          borderBottom: '2px solid',
          borderColor: isDarkMode ? color.teal800 : color.teal600,
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            fontWeight={800}
            sx={{
              letterSpacing: '-0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            TOEIC Test Review
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9,
              mt: 0.5,
              fontWeight: 500
            }}
          >
            {new Date(submitToeic.createdAt || Date.now()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={submitToeic.status ? 'Completed' : 'In Progress'}
            sx={{
              bgcolor: submitToeic.status 
                ? alpha(color.green500, 0.2) 
                : alpha(color.yellow, 0.2),
              color: color.white,
              fontWeight: 700,
              fontSize: '0.9rem',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(color.white, 0.3)}`,
              height: 36,
              px: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          />
        </Box>
      </Box>

      {/* Test Result Summary */}
      {submitToeic.score !== null && (
        <Box sx={{ 
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          borderBottom: '1px solid',
          borderColor: isDarkMode ? color.gray700 : color.gray200,
        }}>
          <TestResultSummary
            score={submitToeic.score}
            maxScore={990}
            comment={submitToeic.comment}
          />
        </Box>
      )}

      {/* Tabs */}
      <Paper 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: isDarkMode ? color.gray700 : color.gray200,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: isDarkMode 
              ? `linear-gradient(90deg, transparent, ${color.teal500}, transparent)`
              : `linear-gradient(90deg, transparent, ${color.teal600}, transparent)`,
          }
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              fontWeight: 600,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              color: isDarkMode ? color.gray400 : color.gray600,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'visible',
              px: { xs: 2, sm: 3 },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) scaleX(0)',
                width: '100%',
                height: '3px',
                backgroundColor: isDarkMode ? color.teal400 : color.teal600,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '3px 3px 0 0',
              },
              '&:hover': {
                color: isDarkMode ? color.teal400 : color.teal600,
                bgcolor: alpha(color.teal500, 0.08),
                '&::before': {
                  transform: 'translateX(-50%) scaleX(0.8)',
                }
              },
              '&.Mui-selected': {
                color: isDarkMode ? color.teal400 : color.teal600,
                '&::before': {
                  transform: 'translateX(-50%) scaleX(1)',
                }
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            }
          }}
        >
          {tabsConfig.map((tab, index) => (
            <Tab 
              key={index}
              label={
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1
                  }}>
                    {tab.icon}
                    <Typography 
                      variant="body2" 
                      fontWeight={700}
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                    >
                      {tab.label}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.7,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    {tab.questions} Questions
                  </Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Content */}
      <Box 
        sx={{ 
          flex: 1,
          p: { xs: 3, md: 4 },
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          minHeight: '60vh',
          maxHeight: '70vh',
          overflowY: 'auto',
          position: 'relative',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: isDarkMode ? color.gray700 : color.gray100,
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: isDarkMode ? color.teal700 : color.teal400,
            borderRadius: '5px',
            border: `2px solid ${isDarkMode ? color.gray700 : color.gray100}`,
            '&:hover': {
              bgcolor: isDarkMode ? color.teal600 : color.teal500,
            }
          }
        }}
      >
        <Box
          sx={{
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
}