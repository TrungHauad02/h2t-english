import React from 'react';
import {
  Box,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Fade,
  alpha,
  Chip
} from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

export default function ListeningPart1Step() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            maxWidth: 900,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: isDarkMode ? color.gray900 : color.white,
            boxShadow: `0 4px 16px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
            border: '1px solid',
            borderColor: isDarkMode ? color.emerald700 : color.emerald500,
          }}
        >
          <Box 
            sx={{ 
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
              px: 2.5, 
              py: 1.5, 
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <HeadsetIcon sx={{ fontSize: 24, color: color.white }} />
            <Typography 
              variant="h6" 
              fontWeight={700} 
              sx={{
                color: color.white,
                letterSpacing: 0.5
              }}
            >
              Part 1
            </Typography>
            <Chip
              label="6 Questions"
              size="small"
              sx={{
                ml: 'auto',
                bgcolor: alpha(color.white, 0.2),
                color: color.white,
                fontWeight: 600,
                height: 24,
                fontSize: '0.75rem'
              }}
            />
          </Box>
          
          <Box sx={{ p: 2.5 }}>
            <Typography 
              fontWeight={700} 
              sx={{ 
                mb: 1.5,
                fontSize: '1.1rem',
                color: isDarkMode ? color.emerald300 : color.emerald700
              }}
            >
              PART 1 - INSTRUCTIONS
            </Typography>
            
            <Typography 
              sx={{ 
                mb: 2,
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: isDarkMode ? color.gray200 : color.gray800
              }}
            >
              <strong>Directions:</strong> For each question in this part, you will hear four statements about a picture in your test book.
              When you hear the statements, you must select the one statement that best describes what you see in the picture.
              Then find the number of the question on your answer sheet and mark your answer.
              The statements will not be printed in your test book and will be spoken only one time.
            </Typography>
            
            <Divider sx={{ my: 2, borderColor: isDarkMode ? color.gray700 : color.gray300 }} />
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ flex: 1, minWidth: 250 }}>
                <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: isDarkMode ? color.gray800 : color.gray50,
                    border: '1px solid',
                    borderColor: isDarkMode ? color.gray700 : color.gray200,
                  }}
                >
                  <img
                    src="/direction_part_1.png"
                    alt="Direction Part 1"
                    style={{ 
                      width: '100%', 
                      maxHeight: 200, 
                      objectFit: 'contain',
                      borderRadius: '6px'
                    }}
                  />
                </Paper>
                
                <Typography 
                  sx={{ 
                    mt: 2,
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    color: isDarkMode ? color.gray300 : color.gray700,
                    fontStyle: 'italic'
                  }}
                >
                  Statement (C), "They're sitting at a table," is the best description of the picture,
                  so you should select answer (C) and mark it on your answer sheet.
                </Typography>
              </Box>
              
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: `0 2px 8px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
                  minWidth: 250,
                  bgcolor: isDarkMode ? color.gray800 : color.white,
                  border: '1px solid',
                  borderColor: isDarkMode ? color.teal700 : color.teal500,
                  flexShrink: 0
                }}
              >
                <Box
                  sx={{
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
                      : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
                    px: 2.5,
                    py: 1.5,
                    color: color.white
                  }}
                >
                  <Typography 
                    fontWeight={700} 
                    sx={{ fontSize: '0.95rem' }}
                  >
                    Choose the correct answer
                  </Typography>
                </Box>
                
                <Box sx={{ px: 2.5, py: 2 }}>
                  <Typography 
                    sx={{ 
                      mb: 1.5,
                      fontWeight: 700,
                      fontSize: '1rem',
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
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: isDarkMode ? color.teal800 : color.teal100,
                        color: isDarkMode ? color.teal200 : color.teal700,
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}
                    >
                      1
                    </Box>
                  </Typography>
                  
                  <RadioGroup name="question1">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <FormControlLabel 
                        key={option}
                        value={option} 
                        control={
                          <Radio 
                            size="small"
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
                              label={option}
                              size="small"
                              sx={{
                                bgcolor: isDarkMode ? color.gray700 : color.gray200,
                                color: isDarkMode ? color.gray300 : color.gray700,
                                fontWeight: 600,
                                minWidth: 24,
                                height: 24,
                              }}
                            />
                            <Typography
                              sx={{
                                color: isDarkMode ? color.gray200 : color.gray800,
                                fontSize: '0.9rem'
                              }}
                            >
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
                          }
                        }}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}