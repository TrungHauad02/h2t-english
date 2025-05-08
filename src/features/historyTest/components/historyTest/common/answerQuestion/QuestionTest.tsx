import { Box, Stack, Typography } from "@mui/material";
import RadioGroupTest from "./RadioGroupTest";
import { useDarkMode } from "hooks/useDarkMode";
import { Question } from "interfaces";
import useColor from "theme/useColor";

interface QuestionTestProps {
  question: Question;
  index: number;
  selectedAnswerId?: number;
  onAnswerChange: (answerId: number) => void;
  isDisabled?: boolean;
}

export default function QuestionTest({
  question,
  index,
  selectedAnswerId,
  onAnswerChange,
  isDisabled = false
}: QuestionTestProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const options = question.answers.map((item) => ({
    value: item.id,
    label: item.content,
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
        transition: 'background-color 0.3s ease',
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
          display: 'flex',
          alignItems: 'center',
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
            bgcolor: isDarkMode ? color.teal700 : color.teal400,
            color: "white",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
        >
          {index}
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
        />
      </Stack>
    </Stack>
  );
}