import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum } from 'interfaces';

interface QuestionOptionProps {
  letter: AnswerEnum;
  content: string;
  isCorrect: boolean;
}

export default function QuestionOption({ 
  letter, 
  content, 
  isCorrect 
}: QuestionOptionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box 
      sx={{ 
        p: 2, 
        borderRadius: '0.75rem',
        backgroundColor: isCorrect 
          ? (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)') 
          : (isDarkMode ? color.gray600 : color.gray100),
        border: isCorrect
          ? `1px solid ${isDarkMode ? color.green600 : color.green400}`
          : `1px solid ${isDarkMode ? color.gray500 : color.gray300}`,
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        width: '100%'
      }}>
        <Typography 
          component="span"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: isCorrect ? 'bold' : 'normal',
            mr: 1,
            flexShrink: 0
          }}
        >
          ({letter})
        </Typography>
        
        <Typography
          component="span"
          variant="body1"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            flexGrow: 1,
            whiteSpace: 'normal'
          }}
        >
          {content}
        </Typography>
        
        {isCorrect && (
          <Chip 
            icon={<CheckCircleIcon />}
            label="Correct"
            size="small"
            sx={{
              ml: 1,
              backgroundColor: isDarkMode ? color.green700 : color.green500,
              color: color.white,
              '& .MuiChip-icon': {
                color: color.white
              },
              flexShrink: 0
            }}
          />
        )}
      </Box>
    </Box>
  );
}