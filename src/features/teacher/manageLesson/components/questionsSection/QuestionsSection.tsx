import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import NoQuestionSection from "./NoQuestionSection";
import QuestionsHeader from "./QuestionsHeader";
import ListQuestion from "./ListQuestion";
import { useEffect, useState } from "react";
import { LessonQuestion } from "interfaces";
import { aqService } from "../../services/aqService";

interface QuestionsSectionProps {
  questions: number[];
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const [data, setData] = useState<LessonQuestion[]>([]);

  useEffect(() => {
    const questionsData = aqService.getQuestionByIds(questions);
    setData(questionsData);
  }, [questions]);

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

      {data.length > 0 ? (
        <ListQuestion data={data} setData={setData} />
      ) : (
        <NoQuestionSection secondaryTextColor={secondaryTextColor} />
      )}
    </Box>
  );
}
