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
          height: '100%',
          px: 2,
          py: 2
        }}
      >
        <Paper
          sx={{
            maxWidth: 600,
            width: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: isDarkMode ? color.gray900 : color.white,
            boxShadow: `0 4px 16px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
            border: '1px solid',
            borderColor: isDarkMode ? color.teal700 : color.teal500,
          }}
        >
          <Box 
            sx={{ 
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.teal800} 0%, ${color.emerald800} 100%)`
                : `linear-gradient(135deg, ${color.teal500} 0%, ${color.emerald500} 100%)`,
              px: 3, 
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VolumeUpIcon sx={{ fontSize: 24, color: color.white }} />
              <Typography 
                variant="h6" 
                fontWeight={700} 
                sx={{
                  color: color.white,
                  letterSpacing: 0.5
                }}
              >
                Volume Test
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
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              This is the Volume Test. If you don't hear clearly, adjust the volume control on your computer, or contact the administrators for assistance.
            </Typography>
            
            <Box 
              sx={{ 
                mt: 2, 
                p: 1.5, 
                borderRadius: 1.5,
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