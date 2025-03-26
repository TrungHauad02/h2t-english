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
    async function fetchQuestions() {
      try {
        const fetched = await Promise.all(
          testSpeakings.flatMap((s) => testService.getQuestionsByIds(s.questions))
        );
        setQuestionsList(fetched.flat());
      } catch {}
    }

    fetchQuestions();
  }, [testSpeakings]);

  const getColor = (index: number) => {
    const question = questionsList[index];
    const answer = submitSpeakings.find((s) => s.question_id === question?.id);
    if (!answer || !answer.transcript?.trim()) return color.red500;
    return color.emerald500;
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
      <Grid container spacing={1} >
        {questionsList.map((_, index) => (
          <Grid item key={index} xs={2} sm={4} >
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
                bgcolor: getColor(index),
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
