import React, { useState } from 'react';
import { 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface TranscriptBoxProps {
  transcript: string | undefined;
  defaultExpanded?: boolean;
}

export default function TranscriptBox({ 
  transcript, 
  defaultExpanded = false 
}: TranscriptBoxProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!transcript) return null;

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
      sx={{
        mb: 3,
        backgroundColor: isDarkMode ? color.gray600 : color.gray100,
        borderRadius: '0.5rem',
        '&:before': {
          display: 'none',
        },
        border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: isDarkMode ? color.gray300 : color.gray700 }} />}
        sx={{
          borderRadius: '0.5rem',
        }}
      >
        <Typography 
          variant="subtitle2"
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700
          }}
        >
          Transcript
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography 
          variant="body2"
          sx={{ 
            color: isDarkMode ? color.gray200 : color.gray800,
            whiteSpace: 'pre-wrap',
            fontStyle: 'italic'
          }}
        >
          {transcript}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}