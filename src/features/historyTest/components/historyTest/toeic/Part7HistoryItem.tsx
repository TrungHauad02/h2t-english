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
import { ToeicPart7, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';

type Props = {
  passageNumber: number;
  passage: ToeicPart7;
  questions: ToeicQuestion[];
  questionNumberStart: number;
  selectedAnswers: Record<number, AnswerEnum>;
  correctAnswers: Record<number, string>;
  isReview: boolean;
};

export default function Part7HistoryItem({
  passageNumber,
  passage,
  questions,
  questionNumberStart,
  selectedAnswers,
  correctAnswers,
  isReview
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getCorrectCount = () => {
    return questions.filter(q => 
      selectedAnswers[q.id] === correctAnswers[q.id]
    ).length;
  };

  const correctCount = getCorrectCount();
  const totalQuestions = questions.length;
  const isAllCorrect = correctCount === totalQuestions;

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
            : (isDarkMode ? color.red600 : color.red400),
      }}
    >
      <Box
        sx={{
          background: isAllCorrect 
            ? (isDarkMode
              ? `linear-gradient(135deg, ${color.green700} 0%, ${color.green900} 100%)`
              : `linear-gradient(135deg, ${color.green400} 0%, ${color.green600} 100%)`)
            : correctCount > 0
              ? (isDarkMode
                ? `linear-gradient(135deg, ${color.emerald700} 0%, ${color.emerald900} 100%)`
                : `linear-gradient(135deg, ${color.emerald400} 0%, ${color.emerald600} 100%)`)
              : (isDarkMode
                ? `linear-gradient(135deg, ${color.red700} 0%, ${color.red900} 100%)`
                : `linear-gradient(135deg, ${color.red400} 0%, ${color.red600} 100%)`),
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Passage {passageNumber} • Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
          <Chip
            label={`${correctCount}/${totalQuestions} Correct`}
            sx={{
              bgcolor: alpha(color.white, 0.2),
              color: color.white,
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(color.white, 0.3)}`,
              '& .MuiChip-icon': {
                color: 'inherit',
                fontSize: '1rem'
              }
            }}
          />
        </Box>
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
              maxHeight: '600px',
              overflowY: 'auto'
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
          <Box sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
            {questions.map((question, idx) => {
              const number = questionNumberStart + idx;
              const selected = selectedAnswers[question.id];
              const correct = correctAnswers[question.id];
              const isCorrect = selected === correct;

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

                  {/* Answer options */}
                  <Box sx={{ mb: 2 }}>
                    {question.answers.map((answer, i) => {
                      const optionLetter = ['A', 'B', 'C', 'D'][i] as AnswerEnum;
                      const isSelected = selected === optionLetter;
                      const isCorrectOption = correct === optionLetter;
                      
                      return (
                        <Box
                          key={answer.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            mb: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: isCorrectOption
                              ? (isDarkMode ? color.green600 : color.green400)
                              : isSelected
                                ? (isDarkMode ? color.red600 : color.red400)
                                : (isDarkMode ? color.gray600 : color.gray300),
                            bgcolor: isCorrectOption
                              ? (isDarkMode ? alpha(color.green900, 0.2) : alpha(color.green100, 0.5))
                              : isSelected
                                ? (isDarkMode ? alpha(color.red900, 0.2) : alpha(color.red100, 0.5))
                                : 'transparent',
                          }}
                        >
                          <Chip
                            label={optionLetter}
                            size="small"
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: isCorrectOption
                                ? (isDarkMode ? color.green700 : color.green500)
                                : isSelected
                                  ? (isDarkMode ? color.red700 : color.red500)
                                  : (isDarkMode ? color.gray700 : color.gray300),
                              color: isCorrectOption || isSelected
                                ? color.white
                                : (isDarkMode ? color.gray300 : color.gray700),
                              fontWeight: 700,
                            }}
                          />
                          <Typography
                            sx={{
                              flex: 1,
                              color: isDarkMode ? color.gray200 : color.gray800,
                              fontWeight: isCorrectOption || isSelected ? 600 : 400,
                            }}
                          >
                            {answer.content}
                          </Typography>
                          {isSelected && !isCorrectOption && (
                            <Chip
                              label="Your answer"
                              size="small"
                              sx={{
                                bgcolor: isDarkMode ? color.red800 : color.red100,
                                color: isDarkMode ? color.red100 : color.red800,
                                fontWeight: 600,
                                height: 24
                              }}
                            />
                          )}
                          {isCorrectOption && (
                            <Chip
                              label="Correct"
                              size="small"
                              sx={{
                                bgcolor: isDarkMode ? color.green800 : color.green100,
                                color: isDarkMode ? color.green100 : color.green800,
                                fontWeight: 600,
                                height: 24
                              }}
                            />
                          )}
                        </Box>
                      );
                    })}
                  </Box>

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
                        label={correct || 'N/A'}
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}