import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  alpha,
  IconButton,
  Collapse,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';

interface QuestionHistoryItemProps {
  questionNumber: number;
  question: ToeicQuestion;
  selectedAnswer?: AnswerEnum;
  isReview: boolean;
  showExplanation?: boolean;
  canCollapse?: boolean;
  isPart5?: boolean;
}

export default function QuestionHistoryItem({
  questionNumber,
  question,
  selectedAnswer,
  isReview,
  showExplanation = true,
  canCollapse = false,
  isPart5 = false
}: QuestionHistoryItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Find the correct answer
  const correctAnswerObj = question.answers.find(a => a.correct);
  const correctAnswerIndex = correctAnswerObj ? question.answers.indexOf(correctAnswerObj) : -1;
  const correctAnswer = correctAnswerIndex !== -1 ? (['A', 'B', 'C', 'D'][correctAnswerIndex] as AnswerEnum) : undefined;
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray800 : color.white,
        border: '2px solid',
        borderColor: isCorrect 
          ? (isDarkMode ? color.green600 : color.green400)
          : (isDarkMode ? color.red600 : color.red400),
        overflow: 'hidden'
      }}
    >
      {/* Header - với style khác nhau dựa trên isPart5 */}
      <Box 
        sx={{ 
          background: isPart5 
            ? (isDarkMode
              ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
              : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`)
            : 'none',
          backgroundColor: !isPart5 ? (isDarkMode ? color.gray800 : color.white) : undefined,
          color: isPart5 ? color.white : undefined,
          p: 3,
          cursor: canCollapse ? 'pointer' : 'default',
          '&:hover': canCollapse ? {
            background: isPart5 
              ? (isDarkMode
                ? `linear-gradient(135deg, ${color.teal600} 0%, ${color.teal800} 100%)`
                : `linear-gradient(135deg, ${color.teal300} 0%, ${color.teal500} 100%)`)
              : undefined,
            bgcolor: !isPart5 ? (isDarkMode ? color.gray700 : color.gray50) : undefined,
          } : {}
        }}
        onClick={canCollapse ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {isPart5 ? (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                bgcolor: alpha(color.white, 0.2),
                color: color.white,
                fontWeight: 800,
                fontSize: '0.95rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              {questionNumber}
            </Box>
          ) : (
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
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
              label={isCorrect ? 'Correct' : 'Incorrect'}
              sx={{
                bgcolor: isPart5 
                  ? alpha(color.white, 0.2)
                  : (isCorrect 
                    ? (isDarkMode ? color.green800 : color.green100)
                    : (isDarkMode ? color.red800 : color.red100)),
                color: isPart5
                  ? color.white
                  : (isCorrect
                    ? (isDarkMode ? color.green100 : color.green800)
                    : (isDarkMode ? color.red100 : color.red800)),
                fontWeight: 600,
                backdropFilter: isPart5 ? 'blur(10px)' : 'none',
                border: isPart5 ? `1px solid ${alpha(color.white, 0.3)}` : 'none',
                '& .MuiChip-icon': {
                  color: 'inherit'
                }
              }}
            />
            {canCollapse && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(!isCollapsed);
                }}
                sx={{
                  color: isPart5 ? color.white : (isDarkMode ? color.gray300 : color.gray700),
                  bgcolor: isPart5 
                    ? alpha(color.white, 0.2)
                    : (isDarkMode ? color.gray700 : color.gray100),
                  backdropFilter: isPart5 ? 'blur(10px)' : 'none',
                  '&:hover': {
                    bgcolor: isPart5
                      ? alpha(color.white, 0.3)
                      : (isDarkMode ? color.gray600 : color.gray200),
                  }
                }}
              >
                <ExpandMoreIcon 
                  sx={{ 
                    transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform 0.2s'
                  }} 
                />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {/* Collapsible Content - Giữ nguyên hoàn toàn */}
      <Collapse in={!isCollapsed}>
        <Divider />
        <Box sx={{ p: 3 }}>
          {/* Question Content */}
          <Typography variant="body1" sx={{ mb: 3, fontWeight: 500, color: isDarkMode ? color.gray200 : color.gray800 }}>
            {question.content}
          </Typography>

          {/* Answer Options */}
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
          
          {/* Answer Summary */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
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

          {/* Explanation - Always visible when available */}
          {showExplanation && question.explanation && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
                  Explanation
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                    borderRadius: 1,
                    border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray700,
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {question.explanation}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}