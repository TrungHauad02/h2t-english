import React from 'react';
import { 
  Box, 
  Typography,
  Paper,
  Fade,
  alpha
} from '@mui/material';
import HeadsetIcon from '@mui/icons-material/Headset';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

export default function DirectionsStep() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Fade in timeout={500}>
      <Box 
        sx={{
          justifyContent: 'center', 
          alignItems: 'center', 
          display: 'flex',
          height: '100%',
          px: 2,
          py: 2
        }}
      >
        <Paper
          sx={{
            maxWidth: 700,
            width: '100%',
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
              px: 3, 
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <HeadsetIcon sx={{ fontSize: 24, color: color.white }} />
              <Typography 
                variant="h6" 
                fontWeight={700} 
                sx={{
                  color: color.white,
                  letterSpacing: 0.5
                }}
              >
                DIRECTIONS
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              p: 3,
              bgcolor: isDarkMode ? color.gray800 : color.gray50,
            }}
          >
            <Typography 
              sx={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: isDarkMode ? color.gray200 : color.gray800,
                fontWeight: 500,
                mb: 2
              }}
            >
              In the Listening test, you will be asked to demonstrate how well you understand spoken English. The entire Listening test will last approximately 45 minutes.
            </Typography>
            
            <Typography 
              sx={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: isDarkMode ? color.gray200 : color.gray800,
                fontWeight: 500,
                mb: 3
              }}
            >
              There are four parts, and directions are given for each part. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.
            </Typography>
            
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 1.5,
                background: isDarkMode
                  ? `linear-gradient(135deg, ${alpha(color.emerald900, 0.3)} 0%, ${alpha(color.teal900, 0.3)} 100%)`
                  : `linear-gradient(135deg, ${alpha(color.emerald100, 0.8)} 0%, ${alpha(color.teal100, 0.8)} 100%)`,
                border: '1px solid',
                borderColor: isDarkMode ? color.emerald700 : color.emerald300,
              }}
            >
              <Typography 
                sx={{
                  fontSize: '0.875rem',
                  color: isDarkMode ? color.emerald300 : color.emerald700,
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                📋 Important: Mark your answers on the answer sheet only
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}