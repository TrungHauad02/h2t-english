import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import NoQuestionSection from "./NoQuestionSection";
import QuestionsHeader from "./QuestionsHeader";
import ListQuestion from "./ListQuestion";
import { useState } from "react";
import { LessonQuestion } from "interfaces";

interface QuestionsSectionProps {
  questions: number[];
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const [data, setData] = useState<LessonQuestion[]>([]);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <QuestionsHeader
        numberOfQuestions={questions.length}
        accentColor={accentColor}
      />

      {questions.length > 0 ? (
        <ListQuestion />
      ) : (
        <NoQuestionSection secondaryTextColor={secondaryTextColor} />
      )}
    </Box>
  );
}
