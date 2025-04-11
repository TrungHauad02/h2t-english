import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum } from 'interfaces';
import ExplanationBox from './ExplanationBox';
import AnswerOptionsGrid from './AnswerOptionsGrid';

interface QuestionContentProps {
  content: string;
  questionNumber?: number;
  explanation?: string;
  showExplanation?: boolean;
  onToggleExplanation?: () => void;
  options?: string[];
  correctAnswer?: AnswerEnum;
}

export default function QuestionContent({ 
  content, 
  questionNumber,
  explanation, 
  showExplanation = false,
  onToggleExplanation,
  options,
  correctAnswer
}: QuestionContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ mb: 3 }}>
      <Box 
        sx={{ 
          mb: 3, 
          p: 3, 
          borderRadius: '0.75rem',
          backgroundColor: isDarkMode ? color.gray600 : color.gray100,
          border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: isDarkMode ? color.teal300 : color.teal700,
              fontWeight: 'bold'
            }}
          >
            {questionNumber !== undefined ? `Question ${questionNumber}` : 'Question'}
          </Typography>
          
          {explanation && onToggleExplanation && (
            <IconButton 
              onClick={onToggleExplanation}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? color.teal700 : color.teal100,
                color: isDarkMode ? color.white : color.teal800,
                '&:hover': {
                  backgroundColor: isDarkMode ? color.teal600 : color.teal200,
                }
              }}
            >
              {showExplanation ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          )}
        </Box>
        
        <Typography 
          variant="body1"
          sx={{ 
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 'medium',
            mb: explanation && showExplanation ? 2 : 0
          }}
        >
          {content}
        </Typography>
        
        {explanation && showExplanation && <ExplanationBox explanation={explanation} />}
      </Box>
      
      {options && correctAnswer && (
        <AnswerOptionsGrid
          options={options}
          correctAnswer={correctAnswer}
        />
      )}
    </Box>
  );
}