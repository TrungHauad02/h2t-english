import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  alpha,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicPart1, AnswerEnum } from 'interfaces/TestInterfaces';
import TranscriptDisplay from './TranscriptDisplay';

type Props = {
  questionNumber: number;
  question: ToeicPart1;
  selectedAnswer?: AnswerEnum;
  isReview: boolean;
};

export default function ListeningPart1HistoryItem({
  questionNumber,
  question,
  selectedAnswer,
  isReview
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isCorrect 
          ? (isDarkMode ? color.green600 : color.green400)
          : (isDarkMode ? color.red600 : color.red400),
      }}
    >
      {/* Header - Gradient background giống Part 2 */}
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 800,
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          {questionNumber}
        </Box>
        
        <Chip
          icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
          label={isCorrect ? 'Correct' : 'Incorrect'}
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`,
            '& .MuiChip-icon': {
              color: 'inherit',
              fontSize: '1.1rem'
            },
            px: 2,
            py: 0.5
          }}
        />
      </Box>

      {/* Content - Giữ nguyên layout cũ */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {question.image && (
            <Box sx={{ flex: '1 1 300px' }}>
              <img
                src={question.image}
                alt={`Question ${questionNumber}`}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
                }}
              />
            </Box>
          )}
          
          <Box sx={{ flex: '1 1 300px' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Your answer:
              </Typography>
              <Chip
                label={selectedAnswer || 'Not answered'}
                sx={{
                  bgcolor: selectedAnswer
                    ? (isCorrect 
                      ? (isDarkMode ? color.green800 : color.green100)
                      : (isDarkMode ? color.red800 : color.red100))
                    : (isDarkMode ? color.gray700 : color.gray200),
                  color: selectedAnswer
                    ? (isCorrect
                      ? (isDarkMode ? color.green100 : color.green800)
                      : (isDarkMode ? color.red100 : color.red800))
                    : (isDarkMode ? color.gray300 : color.gray700),
                  fontWeight: 600
                }}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Correct answer:
              </Typography>
              <Chip
                label={question.correctAnswer}
                sx={{
                  bgcolor: isDarkMode ? color.green800 : color.green100,
                  color: isDarkMode ? color.green100 : color.green800,
                  fontWeight: 600
                }}
              />
            </Box>
            
            {question.audio && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Audio:
                </Typography>
                <audio controls style={{ width: '100%' }}>
                  <source src={question.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                
                {/* Transcript display directly under audio */}
                {question.transcript && (
                  <TranscriptDisplay 
                    part={question} 
                    partNumber={1} 
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}