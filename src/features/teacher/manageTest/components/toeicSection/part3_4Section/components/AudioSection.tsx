import { Box, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AudioPlayer } from '../../common';

interface AudioSectionProps {
  audioUrl: string;
}

export default function AudioSection({ audioUrl }: AudioSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 2,
          color: isDarkMode ? color.teal300 : color.teal700
        }}
      >
        <HeadphonesIcon />
        Audio Recording
      </Typography>
      
      <AudioPlayer audioUrl={audioUrl} />
    </Box>
  );
}