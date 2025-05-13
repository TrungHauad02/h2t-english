import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeadsetIcon from '@mui/icons-material/Headset';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { ToeicPart3_4, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';

type Props = {
  partData: ToeicPart3_4;
  questions: ToeicQuestion[];
  questionNumberStart: number;
  userAnswers: Record<number, AnswerEnum>;
  isReview: boolean;
};

export default function ListeningPart3And4HistoryItem({
  partData,
  questions,
  questionNumberStart,
  userAnswers,
  isReview
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

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: isDarkMode ? color.gray800 : color.white,
      }}
    >
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
            : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HeadsetIcon sx={{ fontSize: 28 }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
            }}
          >
            Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
          </Typography>
        </Box>
        
        <Chip
          label={`${correctCount}/${questions.length} Correct`}
          sx={{
            bgcolor: correctCount === questions.length
              ? alpha(color.green500, 0.2)
              : alpha(color.yellow, 0.2),
            color: color.white,
            fontWeight: 600,
            border: `1px solid ${alpha(color.white, 0.3)}`,
          }}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        {partData.audio && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Audio:
            </Typography>
            <audio controls style={{ width: '100%' }}>
              <source src={partData.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        )}

        {questions.map((question, index) => {
          const questionNumber = questionNumberStart + index;
          const userAnswer = userAnswers[question.id];
          const correctAnswer = question.answers?.find(a => a.correct);
          const correctLetter = correctAnswer && question.answers
            ? ['A', 'B', 'C', 'D'][question.answers.indexOf(correctAnswer)] as AnswerEnum
            : undefined;
          const isCorrect = userAnswer === correctLetter;

          return (
            <Accordion
              key={question.id}
              sx={{
                mb: 2,
                border: '2px solid',
                borderColor: isCorrect
                  ? (isDarkMode ? color.green600 : color.green400)
                  : (isDarkMode ? color.red600 : color.red400),
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%',
                  pr: 2
                }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: isDarkMode ? color.emerald300 : color.emerald700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: isDarkMode ? color.emerald800 : color.emerald200,
                        color: isDarkMode ? color.white : color.emerald900,
                        fontWeight: 800,
                        fontSize: '0.9rem',
                      }}
                    >
                      {questionNumber}
                    </Box>
                    {question.content}
                  </Typography>
                  
                  {isCorrect ? (
                    <CheckCircleIcon sx={{ color: isDarkMode ? color.green400 : color.green600 }} />
                  ) : (
                    <CancelIcon sx={{ color: isDarkMode ? color.red400 : color.red600 }} />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4, py: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Your answer:
                  </Typography>
                  <Chip
                    label={userAnswer || 'Not answered'}
                    sx={{
                      bgcolor: userAnswer
                        ? (isCorrect
                          ? (isDarkMode ? color.green800 : color.green100)
                          : (isDarkMode ? color.red800 : color.red100))
                        : (isDarkMode ? color.gray700 : color.gray200),
                      color: userAnswer
                        ? (isCorrect
                          ? (isDarkMode ? color.green100 : color.green800)
                          : (isDarkMode ? color.red100 : color.red800))
                        : (isDarkMode ? color.gray300 : color.gray700),
                      fontWeight: 600,
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5,
                      color: isDarkMode ? color.gray300 : color.gray700
                    }}
                  >
                    {userAnswer && question.answers?.find((a, i) => ['A', 'B', 'C', 'D'][i] === userAnswer)?.content}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Correct answer:
                  </Typography>
                  <Chip
                    label={correctLetter || 'N/A'}
                    sx={{
                      bgcolor: isDarkMode ? color.green800 : color.green100,
                      color: isDarkMode ? color.green100 : color.green800,
                      fontWeight: 600,
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5,
                      color: isDarkMode ? color.gray300 : color.gray700
                    }}
                  >
                    {correctAnswer?.content}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Paper>
  );
}