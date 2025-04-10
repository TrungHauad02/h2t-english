import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum } from 'interfaces';
import { AnswerOptionsGrid } from './index';

interface QuestionCardProps {
  questionNumber: number;
  content: string;
  explanation?: string;
  options: string[];
  correctAnswer: AnswerEnum;
  showExplanation: boolean;
  onToggleExplanation: () => void;
}

export default function QuestionCard({
  questionNumber,
  content,
  explanation,
  options,
  correctAnswer,
  showExplanation,
  onToggleExplanation
}: QuestionCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Card
      sx={{
        borderRadius: '0.75rem',
        backgroundColor: isDarkMode ? color.gray600 : color.gray50,
        border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`,
        mb: 3
      }}
    >
      <CardContent sx={{ p: 3 }}>
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
            Question {questionNumber}
          </Typography>
          
          {explanation && (
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
            mb: 2
          }}
        >
          {content}
        </Typography>
        
        {showExplanation && explanation && (
          <Accordion
            expanded={true}
            sx={{
              mb: 2,
              backgroundColor: isDarkMode ? 'rgba(45, 212, 191, 0.1)' : 'rgba(45, 212, 191, 0.05)',
              borderRadius: '0.5rem',
              '&:before': {
                display: 'none',
              },
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: isDarkMode ? color.teal300 : color.teal700 }} />}
              sx={{
                borderRadius: '0.5rem',
              }}
            >
              <Typography 
                variant="subtitle2"
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: 'bold'
                }}
              >
                Explanation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography 
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray200 : color.gray800,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {explanation}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
        
        <AnswerOptionsGrid
          options={options}
          correctAnswer={correctAnswer}
        />
      </CardContent>
    </Card>
  );
}