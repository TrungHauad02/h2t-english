import React from 'react';
import { Box, Typography, Paper, Chip, Fade, Zoom } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ArticleIcon from '@mui/icons-material/Article';

interface PassageDisplayProps {
  currentIndex: number;
  fileUrl: string;
}

export default function PassageDisplay({ currentIndex, fileUrl }: PassageDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const cardBgColor = isDarkMode ? color.gray900 : color.gray50;
  
  return (
    <Fade in={true} timeout={300}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: bgColor,
          borderRadius: '1rem',
          p: 3,
          border: `1px solid ${borderColor}`,
          position: 'relative',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <Zoom in={true}>
          <Chip
            icon={<ArticleIcon />}
            label={`Passage ${currentIndex + 1}`}
            color="primary"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: accentColor,
              color: isDarkMode ? color.gray900 : color.white,
              fontWeight: 'bold',
              '& .MuiChip-icon': {
                color: isDarkMode ? color.gray900 : color.white
              }
            }}
          />
        </Zoom>

        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 'bold'
          }}
        >
          <TextSnippetIcon />
          Text Passage
        </Typography>

        <Box 
          sx={{
            backgroundColor: cardBgColor,
            borderRadius: '1rem',
            border: `1px solid ${borderColor}`,
            p: 0,
            overflow: 'hidden'
          }}
        >
          <WEDocumentViewer
            fileUrl={fileUrl}
            maxHeight="400px"
            padding="16px"
            errorMessage="Cannot load document. Please try again later."
            fontFamily="Roboto, sans-serif"
            lineHeight="1.6"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
          />
        </Box>
      </Paper>
    </Fade>
  );
}