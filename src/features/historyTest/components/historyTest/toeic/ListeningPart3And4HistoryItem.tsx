import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  alpha
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QuizIcon from '@mui/icons-material/Quiz';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicPart3_4, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import TranscriptDisplay from './TranscriptDisplay';
import QuestionHistoryItem from './QuestionHistoryItem';

type Props = {
  partData: ToeicPart3_4;
  questions: ToeicQuestion[];
  questionNumberStart: number;
  userAnswers: Record<number, AnswerEnum>;
  isReview: boolean;
  partNumber: 3 | 4;
};

export default function ListeningPart3And4HistoryItem({
  partData,
  questions,
  questionNumberStart,
  userAnswers,
  isReview,
  partNumber = 3
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const correctCount = questions.filter(q => {
    const userAnswer = userAnswers[q.id];
    const correctAnswer = q.answers?.find(a => a.correct);
    if (!userAnswer || !correctAnswer) return false;
    const correctLetter = ['A', 'B', 'C', 'D'][q.answers.indexOf(correctAnswer)] as AnswerEnum;
    return userAnswer === correctLetter;
  }).length;

  const isAllCorrect = correctCount === questions.length;
  const partTitle = partNumber === 3 ? 'Short Conversations' : 'Short Talks';

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isAllCorrect 
          ? (isDarkMode ? color.green600 : color.green400)
          : correctCount > 0
            ? (isDarkMode ? color.yellow : color.yellow)
            : (isDarkMode ? color.red100 : color.red400),
      }}
    >
      {/* Header - Đồng bộ với Part 6-7 */}
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 90,
              height: 36,
              borderRadius: 18,
              bgcolor: alpha(color.white, 0.2),
              color: color.white,
              fontWeight: 800,
              fontSize: '0.85rem',
              px: 2,
              backdropFilter: 'blur(10px)'
            }}
          >
            {questionNumberStart}–{questionNumberStart + questions.length - 1}
          </Box>
        </Typography>
        
        <Chip
          icon={isAllCorrect ? <CheckCircleIcon /> : correctCount > 0 ? <QuizIcon /> : <CancelIcon />}
          label={`${correctCount}/${questions.length} Correct`}
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`,
            '& .MuiChip-icon': {
              color: 'inherit'
            }
          }}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Audio Section */}
        {partData.audio && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Audio:
            </Typography>
            <audio controls style={{ width: '100%' }}>
              <source src={partData.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            {/* Transcript display directly under audio */}
            {partData.transcript && (
              <TranscriptDisplay 
                part={partData} 
                partNumber={partNumber} 
              />
            )}
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Questions List */}
        <Box>
          <Typography 
            variant="subtitle1" 
            fontWeight={600}
            sx={{ 
              mb: 2.5,
              color: isDarkMode ? color.gray100 : color.gray900 
            }}
          >
            Questions Detail
          </Typography>

          {questions.map((question, index) => {
            const questionNumber = questionNumberStart + index;
            const userAnswer = userAnswers[question.id];

            return (
              <Box key={question.id} sx={{ mb: 2 }}>
                <QuestionHistoryItem
                  questionNumber={questionNumber}
                  question={question}
                  selectedAnswer={userAnswer}
                  isReview={isReview}
                  showExplanation={true}
                  canCollapse={true}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}