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
          minHeight: '60vh',
          px: 2,
          py: 4
        }}
      >
        <Paper
          sx={{
            maxWidth: 800,
            width: '100%',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: isDarkMode ? color.gray900 : color.white,
            boxShadow: `0 12px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
            border: '2px solid',
            borderColor: isDarkMode ? color.emerald700 : color.emerald500,
            transition: 'all 0.3s ease',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${color.emerald400} 0%, ${color.teal500} 100%)`,
              opacity: isDarkMode ? 0.8 : 1,
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 16px 40px ${alpha(isDarkMode ? color.black : color.gray900, 0.15)}`
            }
          }}
        >
          <Box 
            sx={{ 
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
              px: 4, 
              py: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${alpha(color.white, 0.1)} 0%, transparent 70%)`,
                transform: 'rotate(45deg)',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
              <HeadsetIcon sx={{ fontSize: 32, color: color.white }} />
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{
                  color: color.white,
                  textShadow: '0 3px 6px rgba(0,0,0,0.2)',
                  letterSpacing: 0.5
                }}
              >
                DIRECTIONS
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              p: 4,
              bgcolor: isDarkMode ? color.gray800 : color.gray50,
            }}
          >
            <Typography 
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: isDarkMode ? color.gray200 : color.gray800,
                fontWeight: 500,
                mb: 3
              }}
            >
              In the Listening test, you will be asked to demonstrate how well you understand spoken English. The entire Listening test will last approximately 45 minutes.
            </Typography>
            
            <Typography 
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: isDarkMode ? color.gray200 : color.gray800,
                fontWeight: 500,
                mb: 3
              }}
            >
              There are four parts, and directions are given for each part. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.
            </Typography>
            
            <Box 
              sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: 2,
                background: isDarkMode
                  ? `linear-gradient(135deg, ${alpha(color.emerald900, 0.3)} 0%, ${alpha(color.teal900, 0.3)} 100%)`
                  : `linear-gradient(135deg, ${alpha(color.emerald100, 0.8)} 0%, ${alpha(color.teal100, 0.8)} 100%)`,
                border: '1px solid',
                borderColor: isDarkMode ? color.emerald700 : color.emerald300,
              }}
            >
              <Typography 
                sx={{
                  fontSize: '1rem',
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