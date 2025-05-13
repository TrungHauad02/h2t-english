import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Fade,
  alpha
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

export default function VolumeTestStep() {
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
            borderColor: isDarkMode ? color.teal700 : color.teal500,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 16px 40px ${alpha(isDarkMode ? color.black : color.gray900, 0.15)}`
            }
          }}
        >
          <Box 
            sx={{ 
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.teal800} 0%, ${color.emerald800} 100%)`
                : `linear-gradient(135deg, ${color.teal500} 0%, ${color.emerald500} 100%)`,
              px: 4, 
              py: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
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
              <VolumeUpIcon sx={{ fontSize: 32, color: color.white }} />
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{
                  color: color.white,
                  textShadow: '0 3px 6px rgba(0,0,0,0.2)',
                  letterSpacing: 0.5
                }}
              >
                Volume Test
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              p: 4,
              bgcolor: isDarkMode ? color.gray800 : color.gray50,
              borderTop: '1px solid',
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          >
            <Typography 
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: isDarkMode ? color.gray200 : color.gray800,
                textAlign: 'center',
                fontWeight: 500,
                px: 2
              }}
            >
              This is the Volume Test. If you don't hear clearly, adjust the volume control on your computer, or contact the administrators for assistance.
            </Typography>
            
            <Box 
              sx={{ 
                mt: 3, 
                p: 2, 
                borderRadius: 2,
                bgcolor: isDarkMode 
                  ? alpha(color.teal900, 0.3) 
                  : alpha(color.teal100, 0.5),
                border: '1px solid',
                borderColor: isDarkMode ? color.teal700 : color.teal300,
                textAlign: 'center'
              }}
            >
              <Typography 
                sx={{
                  fontSize: '0.875rem',
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: 600
                }}
              >
                🔊 Make sure your speakers or headphones are working properly
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}