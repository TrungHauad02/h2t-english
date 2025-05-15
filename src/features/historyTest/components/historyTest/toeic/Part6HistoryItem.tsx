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
import QuizIcon from '@mui/icons-material/Quiz';
import { ToeicPart6, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import QuestionHistoryItem from './QuestionHistoryItem';

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

  const correctCount = questions.filter(q => {
    const userAnswer = selectedAnswers[q.id];
    const correctAnswer = q.answers?.find(a => a.correct);
    if (!userAnswer || !correctAnswer) return false;
    const correctLetter = ['A', 'B', 'C', 'D'][q.answers.indexOf(correctAnswer)] as AnswerEnum;
    return userAnswer === correctLetter;
  }).length;

  const isAllCorrect = correctCount === questions.length;

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

      <Grid container>
        {/* Left side - Document */}
        <Grid item xs={12} md={6} sx={{
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          borderRight: { md: '1px solid' },
          borderBottom: { xs: '1px solid', md: 'none' },
          borderColor: isDarkMode ? color.gray700 : color.gray200,
        }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            fontWeight={500}
            mb={2}
          >
            Reading Passage
          </Typography>
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

        {/* Right side - Questions */}
        <Grid item xs={12} md={6} sx={{
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.white,
        }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            fontWeight={500}
            mb={2}
          >
            Questions Detail
          </Typography>
          
          {questions.map((question, index) => {
            const questionNumber = questionNumberStart + index;
            const userAnswer = selectedAnswers[question.id];

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
        </Grid>
      </Grid>
    </Paper>
  );
}