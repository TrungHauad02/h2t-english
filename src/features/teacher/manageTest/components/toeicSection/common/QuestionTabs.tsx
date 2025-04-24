import { FC, RefObject } from 'react';
import { Tabs, Tab, Tooltip, Box, Paper, Fade } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ToeicQuestion } from 'interfaces';

interface QuestionTabsProps {
  tabsRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  questions: ToeicQuestion[];
  activeQuestion: number;
  onChangeQuestion: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode;
}

export default function QuestionTabs({
  tabsRef,
  containerRef,
  questions,
  activeQuestion,
  onChangeQuestion,
  children
}: QuestionTabsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const tabBgColor = isDarkMode ? color.gray900 : color.gray100;

  return (
    <Paper
      ref={containerRef}
      elevation={3}
      sx={{
        backgroundColor: bgColor,
        borderRadius: '1rem',
        border: `1px solid ${borderColor}`,
        overflow: 'hidden',
        mb: 3
      }}
    >
      <Tabs
        ref={tabsRef}
        value={activeQuestion}
        onChange={onChangeQuestion}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          backgroundColor: tabBgColor,
          borderBottom: `1px solid ${borderColor}`,
          '& .MuiTabs-indicator': {
            backgroundColor: accentColor,
            height: 3
          },
          '& .MuiTab-root': {
            color: isDarkMode ? color.gray400 : color.gray600,
            fontWeight: 'bold',
            py: 2,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              color: accentColor
            },
            '&:hover': {
              backgroundColor: isDarkMode ? color.gray800 : color.gray200,
            }
          }
        }}
      >
        {questions.map((question, index) => (
          <Tab 
            key={index} 
            label={`Question ${index + 1}`}
            icon={
              <Tooltip title={question?.content?.substring(0, 30) + "..."}>
                <QuestionAnswerIcon fontSize="small" />
              </Tooltip>
            }
            iconPosition="start"
          />
        ))}
      </Tabs>

      <Fade in={true} timeout={300}>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {children}
        </Box>
      </Fade>
    </Paper>
  );
}