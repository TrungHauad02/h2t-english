import { Box, Typography } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { AnswerEnum, ToeicQuestion } from 'interfaces';
import { QuestionContent, AnswerOptionsGrid } from '../common';

interface QuestionSectionProps {
  question: ToeicQuestion | null;
  questionNumber: number;
}

export default function QuestionSection({ question, questionNumber }: QuestionSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!question) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4,
        color: isDarkMode ? color.gray400 : color.gray600
      }}>
        <QuestionAnswerIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
        <Typography>No question content available.</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Edit this item to add question content.
        </Typography>
      </Box>
    );
  }

  const correctAnswerIndex = question.answers.findIndex(a => a.correct);
  const correctAnswer = 
    correctAnswerIndex === 0 ? AnswerEnum.A : 
    correctAnswerIndex === 1 ? AnswerEnum.B : 
    correctAnswerIndex === 2 ? AnswerEnum.C : 
    AnswerEnum.D;

  return (
    <>
      <QuestionContent
        content={question.content}
        questionNumber={questionNumber}
      />
      <AnswerOptionsGrid
        options={question.answers.map((ans, i) => 
          `(${String.fromCharCode(65 + i)}) ${ans.content}`
        )}
        correctAnswer={correctAnswer}
      />
    </>
  );
}