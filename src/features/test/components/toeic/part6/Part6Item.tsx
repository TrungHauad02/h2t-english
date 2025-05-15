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

  return (
    <Box 
      sx={{ 
        width: '100%',
    
        maxHeight: '500px',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 6px 18px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '1px solid',
        borderColor: isDarkMode ? color.teal600 : color.teal400,
        mx: 'auto',
      }}
    >
      <Box 
        sx={{ 
          background: isDarkMode 
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography 
          sx={{ 
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
        <Chip 
          label={`${questions.length} questions`}
          size="small"
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            height: 24,
            fontSize: '0.75rem'
          }}
        />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex',
          height: '450px',
        }}
      >
        <Box 
          flex={1}
          sx={{
            p: 2,
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
            borderRight: '1px solid',
            borderColor: isDarkMode ? color.gray700 : color.gray200,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: isDarkMode ? color.teal700 : color.teal400,
              borderRadius: '3px',
            }
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: isDarkMode ? color.gray900 : color.white,
              border: '1px solid',
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          >
            <WEDocumentViewer 
              fileUrl={passage.file} 
              lineHeight="1.8" 
              sx={{ 
                my: 1,
                filter: isDarkMode ? 'brightness(0.9)' : 'none',
                fontSize: '0.9rem'
              }} 
            />
          </Paper>
        </Box>
        
        <Box 
          flex={1}
          sx={{ 
            p: 2,
            overflowY: 'auto',
            bgcolor: isDarkMode ? color.gray800 : color.white,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: isDarkMode ? color.teal700 : color.teal400,
              borderRadius: '3px',
            }
          }}
        >
          {questions.map((q, idx) => {
            const number = questionNumberStart + idx;
            const selected = selectedAnswers[q.id];
            const isSelected = !!selected;

            return (
              <Box 
                key={q.id} 
                mb={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? color.gray900 : color.gray50,
                  border: '1px solid',
                  borderColor: isSelected 
                    ? (isDarkMode ? color.teal600 : color.teal400) 
                    : (isDarkMode ? color.gray700 : color.gray200),
                  transition: 'all 0.2s ease',
                }}
              >
                <Typography 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: '0.95rem',
                    color: isDarkMode ? color.teal300 : color.teal700,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: isDarkMode ? color.teal800 : color.teal100,
                      color: isDarkMode ? color.teal200 : color.teal700,
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    {number}
                  </Box>
                  <Box flex={1} sx={{ fontSize: '0.9rem' }}>{q.content}</Box>
                </Typography>
                
                <RadioGroup
                  name={`question-${q.id}`}
                  value={selected || ''}
                  onChange={(e) => onChange(q.id, e.target.value as AnswerEnum)}
                  sx={{ pl: 4 }}
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
                            size="small"
                            sx={{
                              color: isDarkMode ? color.gray600 : color.gray400,
                              '&.Mui-checked': {
                                color: isDarkMode ? color.teal400 : color.teal600
                              },
                              padding: '6px',
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
                                width: 24,
                                height: 24,
                                transition: 'all 0.2s ease'
                              }}
                            />
                            <Typography
                              sx={{
                                color: isDarkMode ? color.gray200 : color.gray800,
                                fontWeight: isOptionSelected ? 600 : 400,
                                fontSize: '0.85rem',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {ans.content}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          mb: 1,
                          ml: 0,
                          p: 1,
                          borderRadius: 1.5,
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