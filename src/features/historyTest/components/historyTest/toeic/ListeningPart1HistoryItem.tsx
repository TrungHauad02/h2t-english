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
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray800 : color.white,
        border: '2px solid',
        borderColor: isCorrect 
          ? (isDarkMode ? color.green600 : color.green400)
          : (isDarkMode ? color.red600 : color.red400),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? color.teal300 : color.teal700,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: isDarkMode ? color.teal800 : color.teal100,
              color: isDarkMode ? color.teal200 : color.teal700,
              fontWeight: 800,
              fontSize: '0.95rem'
            }}
          >
            {questionNumber}
          </Box>
          Question {questionNumber}
        </Typography>
        
        <Chip
          icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
          label={isCorrect ? 'Correct' : 'Incorrect'}
          sx={{
            bgcolor: isCorrect 
              ? (isDarkMode ? color.green800 : color.green100)
              : (isDarkMode ? color.red800 : color.red100),
            color: isCorrect
              ? (isDarkMode ? color.green100 : color.green800)
              : (isDarkMode ? color.red100 : color.red800),
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: 'inherit'
            }
          }}
        />
      </Box>

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
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}