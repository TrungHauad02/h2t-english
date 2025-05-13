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
      <Paper
        elevation={3}
        sx={{
          maxHeight: "70vh",
          marginTop: '1rem',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: isDarkMode ? color.gray900 : color.white,
          boxShadow: `0 12px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
          border: '2px solid',
          borderColor: isDarkMode ? color.emerald700 : color.emerald500,
          position: 'relative',
          transition: 'all 0.3s ease',
          px: 4,
          py: 3
        }}
      >
        <Box 
          sx={{ 
            background: isDarkMode
              ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
              : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
            px: 3, 
            py: 2, 
            mb: 3,
            mx: -4,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: `0 4px 16px ${alpha(color.emerald600, 0.25)}`,
          }}
        >
          <HeadsetIcon sx={{ fontSize: 28, color: color.white }} />
          <Typography 
            variant="h5" 
            fontWeight={700} 
            sx={{
              color: color.white,
              textShadow: '0 3px 6px rgba(0,0,0,0.2)',
              letterSpacing: 0.5
            }}
          >
            Part 1
          </Typography>
          <Chip
            label="6 Questions"
            sx={{
              ml: 'auto',
              bgcolor: alpha(color.white, 0.2),
              color: color.white,
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(color.white, 0.3)}`
            }}
          />
        </Box>
        
        <Typography 
          fontWeight={700} 
          sx={{ 
            mb: 2,
            fontSize: '1.25rem',
            color: isDarkMode ? color.emerald300 : color.emerald700
          }}
        >
          PART 1 - INSTRUCTIONS
        </Typography>
        
        <Typography 
          sx={{ 
            mb: 3,
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: isDarkMode ? color.gray200 : color.gray800
          }}
        >
          <strong>Directions:</strong> For each question in this part, you will hear four statements about a picture in your test book.
          When you hear the statements, you must select the one statement that best describes what you see in the picture.
          Then find the number of the question on your answer sheet and mark your answer.
          The statements will not be printed in your test book and will be spoken only one time.
        </Typography>
        
        <Divider 
          sx={{ 
            my: 3,
            borderColor: isDarkMode ? color.gray700 : color.gray300
          }} 
        />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 4,
            flexWrap: 'wrap',
            my: 2
          }}
        >
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
                borderRadius: 2,
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
                  maxHeight: 300, 
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </Paper>
            
            <Typography 
              sx={{ 
                mt: 3,
                fontSize: '0.95rem',
                lineHeight: 1.6,
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
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: `0 4px 16px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
              minWidth: 280,
              bgcolor: isDarkMode ? color.gray800 : color.white,
              border: '2px solid',
              borderColor: isDarkMode ? color.teal700 : color.teal500,
              flexShrink: 0
            }}
          >
            <Box
              sx={{
                background: isDarkMode
                  ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
                  : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
                px: 3,
                py: 2,
                color: color.white
              }}
            >
              <Typography 
                fontWeight={700} 
                sx={{ 
                  fontSize: '1rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Choose the correct answer
              </Typography>
            </Box>
            
            <Box sx={{ px: 3, py: 3 }}>
              <Typography 
                sx={{ 
                  mb: 2,
                  fontWeight: 700,
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
                  1
                </Box>
                Question 1
              </Typography>
              
              <RadioGroup name="question1">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <FormControlLabel 
                    key={option}
                    value={option} 
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
                          label={option}
                          size="small"
                          sx={{
                            bgcolor: isDarkMode ? color.gray700 : color.gray200,
                            color: isDarkMode ? color.gray300 : color.gray700,
                            fontWeight: 600,
                            width: 28,
                            height: 28,
                            transition: 'all 0.2s ease'
                          }}
                        />
                        <Typography
                          sx={{
                            color: isDarkMode ? color.gray200 : color.gray800,
                          }}
                        >
                          Option {option}
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
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
}