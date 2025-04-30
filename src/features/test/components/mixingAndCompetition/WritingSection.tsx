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
  alpha
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { testWritingService } from "services/test";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { TestWriting, SubmitTestWriting } from "interfaces";
import { submitTestWritingService } from "services";
import debounce from 'lodash/debounce';

interface WritingSectionProps {
  partId: number;
  testItemIds: number[];
  submitTestId: number;
  selectedQuestionId?: number | null;
  startSerial: number;
}

export default function WritingSection({ 
  partId, 
  testItemIds, 
  submitTestId,
  selectedQuestionId,
  startSerial 
}: WritingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


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
  }, [testItemIds, submitTestId, selectedQuestionId, startSerial]);

  const debouncedSaveEssay = useCallback(
    debounce(async (index: number, content: string) => {
      if (!content || !writingPrompts[index]) return;

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
      } catch (error) {
        console.error("Error saving essay:", error);
      } finally {
        setSaving(false);
      }
    }, 800),
    [writingPrompts, essayIds, submitTestId]
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
      borderRadius: '8px',
      p: { xs: 2, sm: 3 },
      mx: 'auto',

    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>

        <Box 
          sx={{ 
            borderRadius: '8px',
            overflow: 'hidden',
            flex: { xs: '100%', md: '35%' },
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            position: 'relative',
            borderLeft: '4px solid',
            borderLeftColor: color.teal500,
            p: 0
          }}
        >

          <Typography 
            variant="h6" 
            sx={{ 
              color: color.teal700,
              fontWeight: 600,
              py: 2,
              px: 3,
              borderBottom: `1px solid ${color.gray200}`
            }}
          >
            {`Question ${startSerial + currentIndex}`}
          </Typography>
          

          <Box sx={{ 
            p: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: color.gray800,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.7,
                mb: 2,
                flex: 1
              }}
            >
              {currentPrompt?.topic || "No topic available"}
            </Typography>
            
            <Box 
              sx={{ 
                mt: 'auto',
                pt: 2,
                borderTop: `1px solid ${color.gray200}`,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  bgcolor: color.teal500,
                  mr: 1,
                  display: 'inline-block'
                }}
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500,
                  color: color.gray700
                }}
              >
                {`You should write at least ${minWords} words and at most ${maxWords} words.`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box 
          sx={{ 
            flex: { xs: '100%', md: '65%' },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField 
            fullWidth 
            multiline 
            rows={isMobile ? 12 : 16}
            value={essays[currentIndex] || ''} 
            onChange={handleEssayChange} 
            placeholder="Type your essay here..." 
            variant="outlined"
            sx={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px',
                '& fieldset': { 
                  borderColor: color.gray300,
                  borderWidth: '1px',
                }, 
                '&:hover fieldset': { 
                  borderColor: color.teal400,
                  borderWidth: '1px',
                }, 
                '&.Mui-focused fieldset': { 
                  borderColor: color.teal500,
                  borderWidth: '2px',
                },
              } 
            }} 
          />
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 2, 
              mb: 4
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontStyle: "italic", 
                color: getWordCountColor(),
                fontWeight: isUnderMinimum || isOverMaximum ? 600 : 400,
              }}
            >
              {`Word Count: ${wordCount}`}
              {isUnderMinimum && (
                <Box component="span" sx={{ ml: 1, color: color.warning }}>
                  {`(${minWords - wordCount} more needed)`}
                </Box>
              )}
              {isOverMaximum && (
                <Box component="span" sx={{ ml: 1, color: color.error }}>
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
                    fontStyle: 'italic'
                  }}
                >
                  Saving...
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            borderRadius: '8px',
            borderColor: color.gray300,
            color: color.gray600,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: alpha(color.gray100, 0.8),
              borderColor: color.gray400,
            },
            '&.Mui-disabled': {
              borderColor: color.gray200,
              color: color.gray400,
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
            bgcolor: color.teal500,
            color: 'white',
            '&:hover': {
              bgcolor: color.teal600,
            },
            '&.Mui-disabled': {
              bgcolor: color.gray300,
              color: color.gray500,
            },
            px: 4,
            py: 1,
            boxShadow: '0 4px 8px rgba(20, 184, 166, 0.2)'
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}