import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
  alpha,
  Grid,
  Card,
  Divider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { testWritingService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestWriting, SubmitTestWriting } from "interfaces";
import { submitTestWritingService } from "services";

interface WritingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
  setAnsweredQuestions: (questionId: number, isAnswered: boolean) => void;
}

export default function WritingSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial,
  setAnsweredQuestions
}: WritingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [writingPrompts, setWritingPrompts] = useState<TestWriting[]>([]);
  const [essays, setEssays] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [essayIds, setEssayIds] = useState<Record<number, number>>({});

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const response = await testWritingService.getByIds(testItemIds);
        const items: TestWriting[] = response.data || [];
        const withSerial = items.map((item, index) => ({ ...item, serial: startSerial + index }));
        setWritingPrompts(withSerial);

        const writingIds = items.map(item => item.id);
        const existingSubmits = await submitTestWritingService.findBySubmitTestIdAndTestWritingIds(submitTestId, writingIds);

        const savedEssays: Record<number, string> = {};
        const savedEssayIds: Record<number, number> = {};
        
        existingSubmits.data.forEach((essay: SubmitTestWriting) => {
          const writingIndex = items.findIndex(item => item.id === essay.testWriting_id);
          if (writingIndex !== -1) {
            savedEssays[writingIndex] = essay.content;
            savedEssayIds[writingIndex] = essay.id;
            
            // Mark as answered if content exists
            if (essay.content && essay.content.trim() !== '') {
              setAnsweredQuestions(items[writingIndex].id, true);
            }
          }
        });

        setEssays(savedEssays);
        setEssayIds(savedEssayIds);

        if (selectedQuestionId) {
          const selectedIndex = items.findIndex(item => item.id === selectedQuestionId);
          if (selectedIndex !== -1) setCurrentIndex(selectedIndex);
        }
      } catch (error) {
        console.error("Error loading initial writing data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (testItemIds.length > 0) {
      loadInitialData();
    }
  }, [testItemIds, submitTestId, selectedQuestionId, startSerial, setAnsweredQuestions]);

  const debouncedSaveEssay = useCallback(
    async (index: number, content: string) => {
      if (!writingPrompts[index]) return;

      const writingId = writingPrompts[index].id;
      
      setSaving(true);
      try {
        if (essayIds[index]) {
          await submitTestWritingService.patch(essayIds[index], {
            content: content
          });
        } else {
          const newEssay = await submitTestWritingService.create({
            id: Date.now(),
            submitTest_id: submitTestId,
            testWriting_id: writingId,
            content: content,
            comment: "not submitted",
            score: 0,
            status: true
          });
          
          setEssayIds(prev => ({
            ...prev,
            [index]: newEssay.id
          }));
        }
        
        // Mark question as answered if content exists
        if (content && content.trim() !== '') {
          setAnsweredQuestions(writingId, true);
        } else {
          setAnsweredQuestions(writingId, false);
        }
      } catch (error) {
        console.error("Error saving essay:", error);
      } finally {
        setSaving(false);
      }
    },
    [writingPrompts, essayIds, submitTestId, setAnsweredQuestions]
  );

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setEssays({
      ...essays,
      [currentIndex]: newContent
    });
    
    debouncedSaveEssay(currentIndex, newContent);
  };

  const handleNext = () => {
    if (currentIndex < writingPrompts.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word !== '').length;
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '40vh',
        p: 4 
      }}>
        <CircularProgress 
          thickness={4}
          size={48}
          sx={{ 
            color: isDarkMode ? color.teal400 : color.teal600,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round'
            }
          }} 
        />
      </Box>
    );
  }

  if (writingPrompts.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: '1rem', 
          bgcolor: isDarkMode ? color.gray800 : color.white
        }}
      >
        <Typography variant="h6" sx={{ 
          color: isDarkMode ? color.gray300 : color.gray700,
          textAlign: 'center'
        }}>
          No writing prompts available.
        </Typography>
      </Paper>
    );
  }

  const currentPrompt = writingPrompts[currentIndex];
  const wordCount = getWordCount(essays[currentIndex] || '');
  const minWords = currentPrompt?.minWords || 200;
  const maxWords = currentPrompt?.maxWords || 500;
  const isUnderMinimum = wordCount < minWords;
  const isOverMaximum = maxWords && wordCount > maxWords;

  const getWordCountColor = () => {
    if (isUnderMinimum) return isDarkMode ? color.warningDarkMode : color.warning;
    if (isOverMaximum) return isDarkMode ? color.errorDarkMode : color.error;
    if (wordCount >= minWords && (!maxWords || wordCount <= maxWords)) 
      return isDarkMode ? color.successDarkMode : color.success;
    return isDarkMode ? color.gray400 : color.gray600;
  };

  return (
    <Box sx={{ 
      bgcolor: isDarkMode ? color.gray900 : color.gray50,
      borderRadius: '12px',
      p: { xs: 2, sm: 3 },
      mx: 'auto',
      boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.1)',
    }}>
      <Grid container spacing={3}>
        {/* Writing Prompt Section */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={3}
            sx={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)',
              position: 'relative',
              bgcolor: isDarkMode ? color.gray800 : color.white,
              borderLeft: '5px solid',
              borderLeftColor: color.teal500,
            }}
          >
            <Box sx={{ 
              p: 2,
              bgcolor: isDarkMode ? color.gray700 : color.teal50, 
              borderBottom: '1px solid',
              borderBottomColor: isDarkMode ? color.gray600 : color.teal100,
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: isDarkMode ? color.teal200 : color.teal700,
                  fontWeight: 600,
                }}
              >
                {`Question ${startSerial + currentIndex}`}
              </Typography>
            </Box>

            <Box sx={{ 
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                  lineHeight: 1.8,
                  mb: 2,
                  flex: 1,
                  fontWeight: 500,
                }}
              >
                {currentPrompt?.topic || "No topic available"}
              </Typography>
              
              <Divider sx={{ 
                my: 2,
                borderColor: isDarkMode ? color.gray600 : color.gray200,
              }} />
              
              <Box sx={{ mt: 'auto' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      bgcolor: isDarkMode ? color.teal400 : color.teal500,
                      mr: 1.5,
                      display: 'inline-block'
                    }}
                  />
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 500,
                      color: isDarkMode ? color.gray300 : color.gray700
                    }}
                  >
                    Requirements:
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 3,
                    color: isDarkMode ? color.gray400 : color.gray600,
                    fontWeight: 400,
                    lineHeight: 1.6,
                  }}
                >
                  {`You should write at least ${minWords} words and at most ${maxWords} words.`}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Essay Section */}
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: isMediumScreen ? 'auto' : '400px'
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                mb: 1.5,
                color: isDarkMode ? color.gray300 : color.gray700,
              }}
            >
              Your Response
            </Typography>
            
            <TextField 
              fullWidth 
              multiline 
              rows={isMobile ? 10 : 16}
              value={essays[currentIndex] || ''} 
              onChange={handleEssayChange} 
              placeholder="Start writing your response here..." 
              variant="outlined"
              sx={{ 
                flex: 1,
                backgroundColor: isDarkMode ? color.gray800 : 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': { 
                  borderRadius: '8px',
                  color: isDarkMode ? color.gray200 : 'inherit',
                  '& fieldset': { 
                    borderColor: isDarkMode ? color.gray600 : color.gray300,
                    borderWidth: '1px',
                  }, 
                  '&:hover fieldset': { 
                    borderColor: isDarkMode ? color.teal300 : color.teal400,
                    borderWidth: '1px',
                  }, 
                  '&.Mui-focused fieldset': { 
                    borderColor: isDarkMode ? color.teal400 : color.teal500,
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  padding: '16px',
                } 
              }} 
            />
            
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mt: 2, 
                mb: 1
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: isUnderMinimum || isOverMaximum ? 600 : 400,
                  color: getWordCountColor(),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ 
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  mr: 1,
                  bgcolor: getWordCountColor(),
                }}/>
                {`Word Count: ${wordCount}`}
                {isUnderMinimum && (
                  <Box component="span" sx={{ 
                    ml: 1, 
                    color: isDarkMode ? color.warningDarkMode : color.warning,
                    fontWeight: 600,
                  }}>
                    {`(${minWords - wordCount} more needed)`}
                  </Box>
                )}
                {isOverMaximum && (
                  <Box component="span" sx={{ 
                    ml: 1, 
                    color: isDarkMode ? color.errorDarkMode : color.error,
                    fontWeight: 600,
                  }}>
                    {`(${wordCount - maxWords} over limit)`}
                  </Box>
                )}
              </Typography>
              
              {saving && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress 
                    size={16} 
                    thickness={6}
                    sx={{ 
                      color: isDarkMode ? color.teal400 : color.teal600,
                      mr: 1
                    }} 
                  />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isDarkMode ? color.teal300 : color.teal700,
                    }}
                  >
                    Saving...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
          pt: 2,
          borderTop: '1px solid',
          borderTopColor: isDarkMode ? color.gray700 : color.gray200,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            borderRadius: '8px',
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray300 : color.gray600,
            bgcolor: isDarkMode ? 'transparent' : 'white',
            '&:hover': {
              bgcolor: isDarkMode ? alpha(color.gray700, 0.8) : alpha(color.gray100, 0.8),
              borderColor: isDarkMode ? color.gray500 : color.gray400,
            },
            '&.Mui-disabled': {
              borderColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray600 : color.gray400,
            },
            px: 3,
            py: 1
          }}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={currentIndex === writingPrompts.length - 1}
          sx={{
            borderRadius: '8px',
            bgcolor: isDarkMode ? color.teal600 : color.teal500,
            color: 'white',
            '&:hover': {
              bgcolor: isDarkMode ? color.teal700 : color.teal600,
            },
            '&.Mui-disabled': {
              bgcolor: isDarkMode ? color.gray700 : color.gray300,
              color: isDarkMode ? color.gray500 : color.gray500,
            },
            px: 4,
            py: 1,
            boxShadow: isDarkMode ? 
              '0 4px 12px rgba(20, 184, 166, 0.3)' : 
              '0 4px 12px rgba(20, 184, 166, 0.2)'
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}