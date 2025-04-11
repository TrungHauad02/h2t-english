import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface AudioPlayerProps {
  audioUrl: string | undefined;
  onAudioEnd?: () => void;
}

export default function AudioPlayer({ 
  audioUrl, 
  onAudioEnd 
}: AudioPlayerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [audioUrl]);

  const handleEnded = () => {
    if (onAudioEnd) {
      onAudioEnd();
    }
  };

  return (
    <Box 
      sx={{ 
        mb: 3, 
        p: 2, 
        borderRadius: '0.5rem',
        backgroundColor: isDarkMode ? color.gray600 : color.gray100,
        border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`
      }}
    >
      <Typography 
        variant="subtitle2"
        sx={{ 
          color: isDarkMode ? color.gray300 : color.gray700,
          mb: 1
        }}
      >
        Audio:
      </Typography>
      
      {audioUrl ? (
        <Box
          sx={{
            width: '100%',
            '& audio': {
              width: '100%',
            }
          }}
        >
          <audio
            ref={audioRef}
            controls
            preload="metadata"
            onEnded={handleEnded}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      ) : (
        <Typography 
          variant="body2"
          sx={{ 
            color: isDarkMode ? color.red400 : color.red600,
            fontStyle: 'italic'
          }}
        >
          No audio available for this question
        </Typography>
      )}
    </Box>
  );
}