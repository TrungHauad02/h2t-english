import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  alpha,
  Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicPart2, AnswerEnum } from 'interfaces/TestInterfaces';
import TranscriptDisplay from './TranscriptDisplay';

type Props = {
  questionNumber: number;
  question: ToeicPart2;
  selectedAnswer?: AnswerEnum;
  isReview: boolean;
};

export default function ListeningPart2HistoryItem({
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
        mb: 3
      }}
    >
      {/* Header - Đồng bộ với các Part khác */}
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 4,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 2
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
          Part 2 - Question {questionNumber}
        </Typography>
        
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

      {/* Content */}
      <Box sx={{ px: 4, py: 3 }}>
        <Grid container spacing={3}>
          {/* Left side - Answers */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  fontWeight={500}
                  mb={1}
                >
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
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    fontSize: '0.9rem'
                  }}
                />
              </Box>
              
              <Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  fontWeight={500}
                  mb={1}
                >
                  Correct answer:
                </Typography>
                <Chip
                  label={question.correctAnswer}
                  sx={{
                    bgcolor: isDarkMode ? color.green800 : color.green100,
                    color: isDarkMode ? color.green100 : color.green800,
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    fontSize: '0.9rem'
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right side - Audio */}
          <Grid item xs={12} md={6}>
            {question.audio && (
              <Box>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  fontWeight={500}
                  mb={1}
                >
                  Audio:
                </Typography>
                <Box sx={{ 
                  bgcolor: isDarkMode ? color.gray800 : color.gray50,
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: isDarkMode ? color.gray700 : color.gray300
                }}>
                  <audio controls style={{ width: '100%', marginBottom: '8px' }}>
                    <source src={question.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  {/* Transcript display directly under audio */}
                  {question.transcript && (
                    <TranscriptDisplay 
                      part={question} 
                      partNumber={2} 
                    />
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}