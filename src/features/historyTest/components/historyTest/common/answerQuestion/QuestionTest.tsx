import { Box, Stack, Typography } from "@mui/material";
import RadioGroupTest from "./RadioGroupTest";
import QuestionExplanation from "./QuestionExplanation";
import { useDarkMode } from "hooks/useDarkMode";
import { Question } from "interfaces";
import useColor from "theme/useColor";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface QuestionTestProps {
  question: Question;
  index: number;
  selectedAnswerId?: number;
  onAnswerChange: (answerId: number) => void;
  isDisabled?: boolean;
  showExplanation?: boolean;
  isReview?: boolean;
}

export default function QuestionTest({
  question,
  index,
  selectedAnswerId,
  onAnswerChange,
  isDisabled = false,
  showExplanation = false,
  isReview = false,
}: QuestionTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  // Find the correct answer
  const correctAnswerId = question.answers.find(answer => answer.correct)?.id;
  
  // Determine if the selected answer is correct
  const isCorrect = selectedAnswerId === correctAnswerId;

  const options = question.answers.map((item) => ({
    value: item.id,
    label: item.content,
    isCorrect: item.correct
  }));

  const handleChange = (value: string | number) => {
    const answerId = Number(value);
    onAnswerChange(answerId);
  };

  return (
    <Stack
      sx={{
        mt: 2,
        boxShadow: 3,
        borderRadius: 5,
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
        transition: "background-color 0.3s ease",
        overflow: "hidden",
        position: 'relative',
        '&::before': isReview ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '4px',
          height: '100%',
          backgroundColor: isCorrect 
            ? '#4ADE80' // light green color
            : '#FF6B6B', // light red color
        } : {}
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
          display: "flex",
          alignItems: "center",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: { xs: "40%", sm: "50% 0 0 0" },
            width: { xs: 40, sm: 60 },
            height: { xs: 30, sm: 40 },
            mr: 2,
            bgcolor: isReview
              ? (isCorrect 
                ? "#4ADE80" // light green
                : "#FF6B6B") // light red
              : (isDarkMode ? color.teal700 : color.teal400),
            color: "white",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
            position: 'relative'
          }}
        >
          {index}
          {isReview && (
            <Box 
              sx={{ 
                position: 'absolute', 
                right: -7, 
                top: -7,
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: isDarkMode ? color.gray800 : 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {isCorrect ? (
                <CheckCircleIcon 
                  sx={{ 
                    fontSize: 18,
                    color: isDarkMode ? color.green300 : color.green400 
                  }} 
                />
              ) : (
                <CancelIcon 
                  sx={{ 
                    fontSize: 18,
                    color: isDarkMode ? color.red300 : color.red400 
                  }} 
                />
              )}
            </Box>
          )}
        </Box>
        {question.content}
      </Typography>

      <Stack
        sx={{
          width: "100%",
          my: 1,
          px: { xs: 1, sm: 2 },
          boxSizing: "border-box",
        }}
      >
        <RadioGroupTest
          name={question.id}
          options={options}
          selectedValue={selectedAnswerId}
          onChange={handleChange}
          disabled={isDisabled}
          isReview={isReview}
        />
      </Stack>

      <QuestionExplanation
        explanation={question.explanation || ""}
        showExplanation={showExplanation}
      />
    </Stack>
  );
}