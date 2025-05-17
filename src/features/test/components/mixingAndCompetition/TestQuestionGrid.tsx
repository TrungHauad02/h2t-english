import React from "react";
import { Box, Typography, Grid, Stack, Button, Divider } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

interface TestQuestionGridProps {
  questionItems: QuestionItem[];
  onQuestionSelect: (questionItem: QuestionItem) => void;
  onSubmitTest: () => void;
  isTitle?: boolean;
}

const TestQuestionGrid: React.FC<TestQuestionGridProps> = ({ 
  questionItems, 
  onQuestionSelect,
  onSubmitTest,
  isTitle
}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
console.log(12);

  const questionsByType = React.useMemo(() => {
    const grouped: Record<TestPartTypeEnum, QuestionItem[]> = {
      [TestPartTypeEnum.VOCABULARY]: [],
      [TestPartTypeEnum.GRAMMAR]: [],
      [TestPartTypeEnum.READING]: [],
      [TestPartTypeEnum.LISTENING]: [],
      [TestPartTypeEnum.SPEAKING]: [],
      [TestPartTypeEnum.WRITING]: [],
    };

    questionItems.forEach(item => {
      grouped[item.partType].push(item);
    });

    return grouped;
  }, [questionItems]);

  // Calculate total questions and number of answered questions
  const stats = React.useMemo(() => {
    const total = questionItems.length;
    const answered = questionItems.filter(item => item.isAnswered).length;
    const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;
    
    return { total, answered, percentage };
  }, [questionItems]);

  // Colors based on progress
  const getProgressColor = () => {
    if (stats.percentage >= 90) return isDarkMode ? color.green600 : color.green500;
    if (stats.percentage >= 70) return isDarkMode ? color.emerald600 : color.emerald500;
    if (stats.percentage >= 50) return isDarkMode ? color.teal600 : color.teal500;
    if (stats.percentage >= 30) return isDarkMode ? color.teal700 : color.teal600;
    return isDarkMode ? color.teal800 : color.teal700;
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : color.gray300,
        borderRadius: "12px",
        bgcolor: isDarkMode ? color.gray800 : color.white,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header with progress */}
      <Box sx={{ 
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: isDarkMode ? color.gray200 : color.gray800,
            mb: 1
          }}
        >
          Question Panel
        </Typography>
        
        <Box sx={{ 
          width: '100%', 
          height: '4px', 
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
          borderRadius: '2px',
          position: 'relative',
          mb: 1,
          overflow: 'hidden'
        }}>
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${stats.percentage}%`,
              bgcolor: getProgressColor(),
              borderRadius: '2px',
              transition: 'width 0.5s ease-in-out'
            }} 
          />
        </Box>
        
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray600,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            color: getProgressColor(),
            mr: 0.5
          }}>
            <CheckIcon fontSize="small" />
          </Box>
          {stats.answered}/{stats.total} questions ({stats.percentage}%)
        </Typography>
      </Box>

      <Divider sx={{ mb: 2, borderColor: isDarkMode ? color.gray700 : color.gray300 }} />

      {/* List of test sections and questions */}
      <Box sx={{ maxHeight: { xs: 'auto', sm: '400px' }, overflowY: 'auto', pr: 1 }}>
        {Object.entries(questionsByType).map(([section, items]) => {
          if (items.length === 0) return null;
          
          // Format section name and calculate answered questions
          const sectionName = (() => {
            switch(section) {
              case 'VOCABULARY': return 'Vocabulary';
              case 'GRAMMAR': return 'Grammar';
              case 'READING': return 'Reading';
              case 'LISTENING': return 'Listening';
              case 'SPEAKING': return 'Speaking';
              case 'WRITING': return 'Writing';
              default: return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
            }
          })();
          
          const answeredCount = items.filter(item => item.isAnswered).length;
          const sectionPercentage = Math.round((answeredCount / items.length) * 100);
          
          return (
            <Box key={section} sx={{ mb: 3 }}>
              {!isTitle && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center', 
                    mb: 1.5 
                  }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "600",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        color: isDarkMode ? color.gray200 : color.gray800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <DescriptionIcon fontSize="small" sx={{ 
                        color: (() => {
                          switch(section) {
                            case 'VOCABULARY': return isDarkMode ? color.teal300 : color.teal500;
                            case 'GRAMMAR': return isDarkMode ? color.emerald300 : color.emerald500;
                            case 'READING': return isDarkMode ? color.green300 : color.green500;
                            case 'LISTENING': return isDarkMode ? color.teal400 : color.teal600;
                            case 'SPEAKING': return isDarkMode ? color.emerald400 : color.emerald600;
                            case 'WRITING': return isDarkMode ? color.green400 : color.green600;
                            default: return isDarkMode ? color.gray300 : color.gray600;
                          }
                        })()
                      }} />
                      {sectionName}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isDarkMode ? color.gray400 : color.gray600,
                        fontWeight: 500
                      }}
                    >
                      {answeredCount}/{items.length} ({sectionPercentage}%)
                    </Typography>
                  </Box>
                )}

              
              <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent="flex-start">
                {items.map((item) => (
                  <Grid
                    item
                    key={item.questionId}
                    sx={{
                      flexBasis: { xs: "16.666%", sm: "16.666%" },
                      display: "flex",
                      justifyContent: "center",
                      mb: 0.5
                    }}
                    onClick={() => onQuestionSelect(item)}
                  >
                    <Stack
                      sx={{
                        minWidth: { xs: 30, sm: 32 },
                        minHeight: { xs: 30, sm: 32 },
                        width: '100%',
                        maxWidth: { xs: 34, sm: 36 },
                        height: { xs: 30, sm: 32 },
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: { xs: "0.75rem", sm: "0.85rem" },
                        fontWeight: 500,
                        borderRadius: "8px",
                        position: 'relative',
                        bgcolor: isDarkMode 
                          ? (item.isAnswered ? color.teal900 : color.gray700) 
                          : (item.isAnswered ? color.teal50 : color.white),
                        boxShadow: item.isAnswered
                          ? (isDarkMode 
                              ? '0 2px 8px rgba(20, 184, 166, 0.2)' 
                              : '0 2px 8px rgba(20, 184, 166, 0.15)')
                          : '0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: isDarkMode 
                          ? (item.isAnswered ? color.teal700 : color.gray600) 
                          : (item.isAnswered ? color.teal300 : color.gray300),
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        color: isDarkMode
                          ? (item.isAnswered ? color.teal100 : color.gray300)
                          : (item.isAnswered ? color.teal700 : color.gray700),
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: item.isAnswered
                            ? (isDarkMode 
                                ? '0 4px 12px rgba(20, 184, 166, 0.3)' 
                                : '0 4px 12px rgba(20, 184, 166, 0.2)')
                            : '0 3px 6px rgba(0,0,0,0.15)',
                          bgcolor: isDarkMode 
                            ? (item.isAnswered ? color.teal800 : color.gray600) 
                            : (item.isAnswered ? color.teal100 : color.gray50),
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        }
                      }}
                    >
                      {item.serialNumber}
                      {item.isAnswered && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -3,
                            right: -3,
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: isDarkMode ? color.teal500 : color.teal400,
                            border: '1px solid',
                            borderColor: isDarkMode ? color.gray800 : color.white,
                          }}
                        />
                      )}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Box>

      {/* Submit button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={onSubmitTest}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: '8px',
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: isDarkMode 
              ? '0 4px 12px rgba(20, 184, 166, 0.2)'
              : '0 4px 12px rgba(20, 184, 166, 0.15)',
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal600 : color.teal600,
              boxShadow: isDarkMode 
                ? '0 6px 16px rgba(20, 184, 166, 0.3)'
                : '0 6px 16px rgba(20, 184, 166, 0.2)',
            },
            '&:active': {
              backgroundColor: isDarkMode ? color.teal800 : color.teal700,
            },
            transition: 'all 0.2s ease',
          }}
        >
          Submit Test
        </Button>
        
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 1, 
            color: isDarkMode ? color.gray400 : color.gray500,
            fontStyle: 'italic'
          }}
        >
          Completed {stats.percentage}% of the test
        </Typography>
      </Box>
    </Box>
  );
};

export default TestQuestionGrid;