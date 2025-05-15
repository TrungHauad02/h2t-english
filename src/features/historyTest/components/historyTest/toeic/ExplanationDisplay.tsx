import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicQuestion, ToeicAnswer } from 'interfaces';

interface ExplanationDisplayProps {
  question: ToeicQuestion;
  selectedAnswerId?: number;
  showCorrectAnswer?: boolean;
}

export default function ExplanationDisplay({ 
  question, 
  selectedAnswerId,
  showCorrectAnswer = true 
}: ExplanationDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!question) {
    return null;
  }

  const correctAnswer = question.answers.find(answer => answer.correct);
  const selectedAnswer = selectedAnswerId 
    ? question.answers.find(answer => answer.id === selectedAnswerId)
    : null;

  // Get letter (A, B, C, D) for answer
  const getAnswerLetter = (answer: ToeicAnswer) => {
    const index = question.answers.indexOf(answer);
    return index >= 0 ? String.fromCharCode(65 + index) : '';
  };

  return (
    <Box>
      {/* Explanation Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LightbulbIcon sx={{ fontSize: 20, color: color.teal600 }} />
        <Typography variant="subtitle1" fontWeight={600}>
          Explanation
        </Typography>
      </Box>

      {/* Answer Info Box */}
      <Box
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          borderRadius: 1,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
          mb: 3,
        }}
      >
        {/* Your Answer */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: isDarkMode ? color.gray400 : color.gray600,
              minWidth: 140,
            }}
          >
            Your answer:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selectedAnswer ? (
              <>
                {selectedAnswer.correct ? (
                  <CheckCircleIcon sx={{ fontSize: 20, color: color.green600 }} />
                ) : (
                  <CancelIcon sx={{ fontSize: 20, color: color.red }} />
                )}
                <Typography 
                  variant="body2" 
                  fontWeight={600}
                  sx={{ 
                    color: selectedAnswer.correct 
                      ? (isDarkMode ? color.green400 : color.green700)
                      : (isDarkMode ? color.red : color.red)
                  }}
                >
                  Option {question.answers.indexOf(selectedAnswer) + 1}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: isDarkMode ? color.gray300 : color.gray700,
                    fontStyle: 'italic'
                  }}
                >
                  {selectedAnswer.content}
                </Typography>
              </>
            ) : (
              <Typography 
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray600,
                }}
              >
                Not answered
              </Typography>
            )}
          </Box>
        </Box>

        {/* Correct Answer */}
        {showCorrectAnswer && correctAnswer && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? color.gray400 : color.gray600,
                minWidth: 140,
              }}
            >
              Correct answer:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 20, color: color.green600 }} />
              <Typography 
                variant="body2" 
                fontWeight={600}
                sx={{ 
                  color: isDarkMode ? color.green400 : color.green700
                }}
              >
                Option {question.answers.indexOf(correctAnswer) + 1}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontStyle: 'italic'
                }}
              >
                {correctAnswer.content}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Explanation Text */}
      {question.explanation && (
        <Box
          sx={{
            p: 2,
            backgroundColor: isDarkMode ? color.emerald950 : color.emerald50,
            borderRadius: 1,
            border: `1px solid ${isDarkMode ? color.emerald800 : color.emerald200}`,
            mb: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray200 : color.gray800,
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}
          >
            {question.explanation}
          </Typography>
        </Box>
      )}

      {/* All Answer Options */}
      <Box>
        <Typography 
          variant="body2" 
          sx={{ 
            color: isDarkMode ? color.gray400 : color.gray600,
            mb: 2,
          }}
        >
          All answer options:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {question.answers.map((answer, index) => (
            <Box 
              key={answer.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                p: 1.5,
                borderRadius: 1,
                backgroundColor: answer.correct
                  ? (isDarkMode ? color.green950 : color.green50)
                  : (isDarkMode ? color.gray800 : color.gray50),
                border: `1px solid ${
                  answer.correct
                    ? (isDarkMode ? color.green800 : color.green200)
                    : (isDarkMode ? color.gray700 : color.gray300)
                }`
              }}
            >
              <Typography 
                variant="body2"
                sx={{ 
                  minWidth: '30px',
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 600
                }}
              >
                {String.fromCharCode(65 + index)}.
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: isDarkMode ? color.gray200 : color.gray800,
                  flex: 1
                }}
              >
                {answer.content}
              </Typography>
              {answer.correct && (
                <CheckCircleIcon 
                  sx={{ 
                    fontSize: 18,
                    color: isDarkMode ? color.green400 : color.green600
                  }} 
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}