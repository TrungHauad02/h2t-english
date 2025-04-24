import { Box, Typography } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { TranscriptBox } from '../../common';

interface TranscriptSectionProps {
  transcript: string;
}

export default function TranscriptSection({ transcript }: TranscriptSectionProps) {
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
        <TextSnippetIcon />
        Transcript
      </Typography>
      
      <TranscriptBox transcript={transcript} />
    </Box>
  );
}