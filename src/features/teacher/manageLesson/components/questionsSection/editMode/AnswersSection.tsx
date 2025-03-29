import { Box, Button, Stack, Typography } from "@mui/material";
import { LessonQuestion, LessonAnswer } from "interfaces";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import AnswerItem from "./AnswerItem";
import StyledCard from "../../common/StyledCard";

interface AnswersSectionProps {
  editData: LessonQuestion;
  handleAnswerChange: (
    index: number,
    field: keyof LessonAnswer,
    value: any
  ) => void;
  handleAddAnswer: () => void;
  handleRemoveAnswer: (index: number) => void;
  accentColor: string;
}

export default function AnswersSection({
  editData,
  handleAnswerChange,
  handleAddAnswer,
  handleRemoveAnswer,
  accentColor,
}: AnswersSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <StyledCard>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium" color={accentColor}>
          Answers
        </Typography>

        <Button
          startIcon={<AddCircleIcon />}
          onClick={handleAddAnswer}
          sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
        >
          Add Answer
        </Button>
      </Box>

      <Stack spacing={2}>
        {editData?.answers.map((answer, index) => (
          <AnswerItem
            key={answer.id}
            answer={answer}
            index={index}
            handleAnswerChange={handleAnswerChange}
            handleRemoveAnswer={handleRemoveAnswer}
            accentColor={accentColor}
          />
        ))}
      </Stack>
    </StyledCard>
  );
}
