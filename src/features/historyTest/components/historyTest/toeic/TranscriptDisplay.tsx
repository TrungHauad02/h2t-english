import React from 'react';
import { Box, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicPart1, ToeicPart2, ToeicPart3_4 } from 'interfaces';

interface TranscriptDisplayProps {
  part: ToeicPart1 | ToeicPart2 | ToeicPart3_4;
  partNumber: 1 | 2 | 3 | 4;
}

export default function TranscriptDisplay({ part, partNumber }: TranscriptDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!part?.transcript) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderRadius: 2,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <VolumeUpIcon
          sx={{
            fontSize: 18,
            color: color.teal600,
          }}
        />
        <Typography
          variant="subtitle2" 
          fontWeight={600}
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          Audio Transcript
        </Typography>
      </Box>
      
      <Box
        sx={{
          p: 1.5,
          backgroundColor: isDarkMode ? color.gray900 : color.gray50,
          borderRadius: 1,
          border: `1px dashed ${isDarkMode ? color.gray700 : color.gray300}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            fontSize: '0.875rem',
            fontStyle: 'italic',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {part.transcript}
        </Typography>
      </Box>
    </Box>
  );
}