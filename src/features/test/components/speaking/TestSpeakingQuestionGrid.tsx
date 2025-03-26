import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestSpeaking, Question, SubmitTestSpeaking } from "interfaces";
import { testService } from "features/test/services/testServices";

interface Props {
  testSpeakings: TestSpeaking[];
  submitSpeakings: SubmitTestSpeaking[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const TestSpeakingQuestionGrid: React.FC<Props> = ({
  testSpeakings,
  submitSpeakings,
  currentIndex,
  onSelect,
}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [questionsList, setQuestionsList] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionPromises = testSpeakings.flatMap((s) =>
          testService.getQuestionsByIds(s.questions)
        );
        const fetchedQuestions = await Promise.all(questionPromises);
        setQuestionsList(fetchedQuestions.flat());
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchQuestions();
  }, [testSpeakings]);

  const isAnswered = (questionId: number) => {
    const submit = submitSpeakings.find((s) => s.question_id === questionId);
    return Boolean(submit && submit.transcript?.trim());
  };

  return (
    <Box
      sx={{
        p: 2,
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : "#ccc",
        borderRadius: "10px",
        bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        {questionsList.map((question, index) => (
          <Grid item key={question.id} xs={2} sm={4}>
            <Stack
              onClick={() => onSelect(index)}
              sx={{
                border: "1px solid",
                padding: 0.5,
                minWidth: 24,
                minHeight: 24,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: isAnswered(question.id)
                  ? color.emerald500
                  : "white",
                boxShadow:
                  currentIndex === index
                    ? `0 0 0 2px ${color.emerald300}`
                    : undefined,
                transition: "0.2s",
              }}
            >
              {index + 1}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestSpeakingQuestionGrid;