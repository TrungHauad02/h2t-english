import { Box, Typography, Collapse, Button, Stack } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TranscriptSectionProps {
  transcript: string;
}

export default function TranscriptSection({ transcript }: TranscriptSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(false);

  if (!transcript) return null;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        transition: 'all 0.3s ease',
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Button
        fullWidth
        onClick={handleToggle}
        startIcon={expanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
        sx={{
          justifyContent: 'flex-start',
          p: 2,
          color: isDarkMode ? color.teal300 : color.teal700,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          borderRadius: 0,
          backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          '&:hover': {
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          },
        }}
      >
        Transcript
      </Button>
      
      <Collapse in={expanded}>
        <Box
          sx={{
            p: 3,
            maxHeight: '400px',
            overflow: 'auto',
            backgroundColor: isDarkMode ? color.gray900 : color.white,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: isDarkMode ? color.gray800 : color.gray100,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDarkMode ? color.gray600 : color.gray400,
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: isDarkMode ? color.gray500 : color.gray500,
              },
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray200 : color.gray800,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {transcript}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}