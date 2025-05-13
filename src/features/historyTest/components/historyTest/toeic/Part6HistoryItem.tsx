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
import { ToeicPart6, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

type Props = {
  passage: ToeicPart6;
  questions: ToeicQuestion[];
  questionNumberStart: number;
  selectedAnswers: Record<number, AnswerEnum>;
  isReview: boolean;
};

export default function Part6HistoryItem({
  passage,
  questions,
  questionNumberStart,
  selectedAnswers,
  isReview
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isDarkMode ? color.teal600 : color.teal400,
      }}
    >
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
        <Typography variant="h6" fontWeight={700}>
          Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
        <Chip
          label={`${questions.length} questions`}
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color.white, 0.3)}`
          }}
        />
      </Box>

      <Grid container>
        <Grid item xs={12} md={6} sx={{
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          borderRight: { md: '1px solid' },
          borderBottom: { xs: '1px solid', md: 'none' },
          borderColor: isDarkMode ? color.gray700 : color.gray200,
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: isDarkMode ? color.gray900 : color.white,
              border: '1px solid',
              borderColor: isDarkMode ? color.gray700 : color.gray200,
            }}
          >
            <WEDocumentViewer
              fileUrl={passage.file}
              lineHeight="2"
              sx={{
                my: 2,
                filter: isDarkMode ? 'brightness(0.9)' : 'none'
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.white,
        }}>
          {questions.map((question, idx) => {
            const number = questionNumberStart + idx;
            const selected = selectedAnswers[question.id];
            const correctAnswerObj = question.answers.find(a => a.correct);
            const correctAnswerIndex = correctAnswerObj ? question.answers.indexOf(correctAnswerObj) : -1;
            const correctAnswer = correctAnswerIndex !== -1 ? (['A', 'B', 'C', 'D'][correctAnswerIndex] as AnswerEnum) : undefined;
            const isCorrect = selected === correctAnswer;

            return (
              <Box
                key={question.id}
                mb={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? color.gray900 : color.gray50,
                  border: '2px solid',
                  borderColor: selected
                    ? isCorrect
                      ? (isDarkMode ? color.green600 : color.green400)
                      : (isDarkMode ? color.red600 : color.red400)
                    : (isDarkMode ? color.gray700 : color.gray200),
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography
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
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: isDarkMode ? color.teal800 : color.teal100,
                        color: isDarkMode ? color.teal200 : color.teal700,
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}
                    >
                      {number}
                    </Box>
                    Question {number}
                  </Typography>
                  
                  {selected && (
                    <Chip
                      icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                      label={isCorrect ? 'Correct' : 'Incorrect'}
                      size="small"
                      sx={{
                        bgcolor: isCorrect
                          ? (isDarkMode ? color.green800 : color.green100)
                          : (isDarkMode ? color.red800 : color.red100),
                        color: isCorrect
                          ? (isDarkMode ? color.green100 : color.green800)
                          : (isDarkMode ? color.red100 : color.red800),
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: 'inherit',
                          fontSize: '1rem'
                        }
                      }}
                    />
                  )}
                </Box>

                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                  {question.content}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Your answer:
                    </Typography>
                    <Chip
                      label={selected || 'Not answered'}
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: selected
                          ? (isCorrect
                            ? (isDarkMode ? color.green800 : color.green100)
                            : (isDarkMode ? color.red800 : color.red100))
                          : (isDarkMode ? color.gray700 : color.gray200),
                        color: selected
                          ? (isCorrect
                            ? (isDarkMode ? color.green100 : color.green800)
                            : (isDarkMode ? color.red100 : color.red800))
                          : (isDarkMode ? color.gray300 : color.gray700),
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Correct:
                    </Typography>
                    <Chip
                      label={correctAnswer || 'N/A'}
                      size="small"
                      sx={{
                        ml: 1,
                        bgcolor: isDarkMode ? color.green800 : color.green100,
                        color: isDarkMode ? color.green100 : color.green800,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}