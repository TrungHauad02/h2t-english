import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ToeicPart6, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

type Props = {
  questionNumberStart: number;
  passage: ToeicPart6;
  questions: ToeicQuestion[];
  selectedAnswers: Record<number, AnswerEnum>;
  onChange: (questionId: number, value: AnswerEnum) => void;
};

export default function Part6Item({
  questionNumberStart,
  passage,
  questions,
  selectedAnswers,
  onChange,
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        width: { xs: '95vw', md: '90vw' },
        maxHeight: { xs: '80vh', md: '60vh' },
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: `0 8px 24px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isDarkMode ? color.teal600 : color.teal400,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 12px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.15)}`,
          borderColor: isDarkMode ? color.teal500 : color.teal300,
        }
      }}
    >
      <Box 
        sx={{ 
          background: isDarkMode 
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: `0 4px 12px ${alpha(color.teal600, 0.2)}`
        }}
      >
        <Typography 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
        <Chip 
          label={`${questions.length} questions`}
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`
          }}
        />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '100%' }
        }}
      >
        <Box 
          flex={1}
          sx={{
            p: 3,
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
            borderRight: { xs: 'none', md: '1px solid' },
            borderBottom: { xs: '1px solid', md: 'none' },
            borderColor: isDarkMode ? color.gray700 : color.gray200,
            overflowY: 'auto',
            maxHeight: { xs: '40vh', md: '55vh' }
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: isDarkMode ? color.gray900 : color.white,
              border: '1px solid',
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          >
            <WEDocumentViewer 
              fileUrl={passage.file} 
              lineHeight="2" 
              sx={{ 
                my: 2,
                filter: isDarkMode ? 'brightness(0.9)' : 'none'
              }} 
            />
          </Paper>
        </Box>
        
        <Box 
          flex={1}
          sx={{ 
            p: 3,
            overflowY: 'auto',
            maxHeight: { xs: '40vh', md: '55vh' },
            bgcolor: isDarkMode ? color.gray800 : color.white,
          }}
        >
          {questions.map((q, idx) => {
            const number = questionNumberStart + idx;
            const selected = selectedAnswers[q.id];
            const isSelected = !!selected;

            return (
              <Box 
                key={q.id} 
                mb={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: isDarkMode ? color.gray900 : color.gray50,
                  border: '2px solid',
                  borderColor: isSelected 
                    ? (isDarkMode ? color.teal600 : color.teal400) 
                    : (isDarkMode ? color.gray700 : color.gray200),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: isDarkMode ? color.teal500 : color.teal300,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 12px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`
                  }
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    fontSize: '1.1rem',
                    color: isDarkMode ? color.teal300 : color.teal700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: isDarkMode ? color.teal800 : color.teal100,
                      color: isDarkMode ? color.teal200 : color.teal700,
                      fontWeight: 800,
                      fontSize: '0.9rem'
                    }}
                  >
                    {number}
                  </Box>
                  {q.content}
                </Typography>
                
                <RadioGroup
                  name={`question-${q.id}`}
                  value={selected || ''}
                  onChange={(e) => onChange(q.id, e.target.value as AnswerEnum)}
                  sx={{ pl: 2 }}
                >
                  {q.answers.map((ans, i) => {
                    const optionLetter = (['A', 'B', 'C', 'D'][i]) as AnswerEnum;
                    const isOptionSelected = selected === optionLetter;
                    
                    return (
                      <FormControlLabel
                        key={ans.id}
                        value={optionLetter}
                        control={
                          <Radio 
                            sx={{
                              color: isDarkMode ? color.gray600 : color.gray400,
                              '&.Mui-checked': {
                                color: isDarkMode ? color.teal400 : color.teal600
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={optionLetter}
                              size="small"
                              sx={{
                                bgcolor: isOptionSelected 
                                  ? (isDarkMode ? color.teal700 : color.teal500)
                                  : (isDarkMode ? color.gray700 : color.gray200),
                                color: isOptionSelected
                                  ? color.white
                                  : (isDarkMode ? color.gray300 : color.gray700),
                                fontWeight: 600,
                                width: 28,
                                height: 28,
                                transition: 'all 0.2s ease'
                              }}
                            />
                            <Typography
                              sx={{
                                color: isDarkMode ? color.gray200 : color.gray800,
                                fontWeight: isOptionSelected ? 600 : 400,
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {ans.content}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          mb: 1.5,
                          ml: 0,
                          p: 1.5,
                          borderRadius: 2,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: isDarkMode 
                              ? alpha(color.teal900, 0.2) 
                              : alpha(color.teal100, 0.5)
                          },
                          ...(isOptionSelected && {
                            bgcolor: isDarkMode 
                              ? alpha(color.teal900, 0.3) 
                              : alpha(color.teal100, 0.8),
                            border: '1px solid',
                            borderColor: isDarkMode ? color.teal700 : color.teal300
                          })
                        }}
                      />
                    );
                  })}
                </RadioGroup>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}