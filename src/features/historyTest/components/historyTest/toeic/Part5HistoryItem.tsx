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
import { ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';

type Props = {
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
  isReview: boolean;
};

export default function Part5HistoryItem({
  questionNumber,
  question,
  selectedAnswer,
  isReview
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Find the correct answer
  const correctAnswerObj = question.answers.find(a => a.correct);
  const correctAnswerIndex = correctAnswerObj ? question.answers.indexOf(correctAnswerObj) : -1;
  const correctAnswer = correctAnswerIndex !== -1 ? (['A', 'B', 'C', 'D'][correctAnswerIndex] as AnswerEnum) : undefined;
  const isCorrect = selectedAnswer === correctAnswer;

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

      <Typography variant="body1" sx={{ mb: 3, fontWeight: 500, color: isDarkMode ? color.gray200 : color.gray800 }}>
        {question.content}
      </Typography>

      <Box sx={{ mb: 3 }}>
        {question.answers.map((answer, idx) => {
          const optionLetter = (['A', 'B', 'C', 'D'][idx]) as AnswerEnum;
          const isSelectedOption = selectedAnswer === optionLetter;
          const isCorrectOption = correctAnswer === optionLetter;
          
          return (
            <Box
              key={answer.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1.5,
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isCorrectOption
                  ? isDarkMode ? color.green600 : color.green400
                  : isSelectedOption
                    ? isDarkMode ? color.red600 : color.red400
                    : isDarkMode ? color.gray700 : color.gray300,
                bgcolor: isCorrectOption
                  ? isDarkMode ? alpha(color.green800, 0.2) : alpha(color.green100, 0.5)
                  : isSelectedOption
                    ? isDarkMode ? alpha(color.red800, 0.2) : alpha(color.red100, 0.5)
                    : 'transparent',
              }}
            >
              <Chip
                label={optionLetter}
                size="small"
                sx={{
                  bgcolor: isCorrectOption
                    ? isDarkMode ? color.green700 : color.green500
                    : isSelectedOption
                      ? isDarkMode ? color.red700 : color.red500
                      : isDarkMode ? color.gray700 : color.gray300,
                  color: isCorrectOption || isSelectedOption
                    ? color.white
                    : isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 600,
                  width: 28,
                  height: 28,
                }}
              />
              <Typography
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontWeight: isCorrectOption || isSelectedOption ? 600 : 400,
                  flex: 1
                }}
              >
                {answer.content}
              </Typography>
              {isCorrectOption && (
                <CheckCircleIcon sx={{ color: isDarkMode ? color.green400 : color.green600 }} />
              )}
              {isSelectedOption && !isCorrectOption && (
                <CancelIcon sx={{ color: isDarkMode ? color.red400 : color.red600 }} />
              )}
            </Box>
          );
        })}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
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
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Correct answer:
          </Typography>
          <Chip
            label={correctAnswer || 'N/A'}
            sx={{
              bgcolor: isDarkMode ? color.green800 : color.green100,
              color: isDarkMode ? color.green100 : color.green800,
              fontWeight: 600
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}