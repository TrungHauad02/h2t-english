import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { TestPartTypeEnum, Question, SubmitTestAnswer } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";


interface TestQuestionGridProps {
  questionCounts: Record<TestPartTypeEnum, number>;
  questions: Question[];
  submitAnswers: SubmitTestAnswer[];
}

const TestQuestionGrid: React.FC<TestQuestionGridProps> = ({ questionCounts, questions, submitAnswers }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  let serial = 1;

  const getAnswerStatus = (serialIndex: number): "correct" | "incorrect" | null => {
    let count = 0;
    for (const partType of Object.keys(questionCounts) as TestPartTypeEnum[]) {
      const partCount = questionCounts[partType];
      if (serialIndex <= count + partCount) {
        const question = questions[serialIndex - 1];
        const submitted = submitAnswers.find(sa => sa.question_id === question?.id);
        const answer = question?.answers.find(a => a.id === submitted?.answer_id);
        if (!submitted || !answer) return null;
        return answer.correct ? "correct" : "incorrect";
      }
      count += partCount;
    }
    return null;
  };

  return (
    <Box
      sx={{
        p: { xs: 0.5, sm: 2 },
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : "#ccc",
        borderRadius: "10px",
        bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
        textAlign: "center",
      
       
        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
      }}
    >
      {Object.entries(questionCounts).map(([section, count]) => (
        <Box key={section} sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
              color: isDarkMode ? color.gray200 : "black",
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()}
          </Typography>
          <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent="flex-start">
            {Array.from({ length: count }, () => {
              const status = getAnswerStatus(serial);
              const bgColor =
                status === "correct"
                  ? color.emerald500
                  : status === "incorrect"
                  ? color.red500
                  : isDarkMode
                  ? color.gray800
                  : "white";
              const currentSerial = serial++;
              return (
                <Grid
                  item
                  key={currentSerial}
                  sx={{
                    flexBasis: { xs: "15%", sm: "18%", md: "16%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    sx={{
                      border: "1px solid",
                      borderColor: isDarkMode ? color.gray600 : "black",
                      padding: { xs: 0.1, sm: 0.6 },
                      minWidth: { xs: 15, sm: 24, md: 28 },
                      minHeight: { xs: 15, sm: 24, md: 28 },
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: { xs: "0.75rem", sm: "0.85rem" },
                      borderRadius: "4px",
                      bgcolor: bgColor,
                      boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                      color: status ? "white" : "inherit",
                    }}
                  >
                    {currentSerial}
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
    
    </Box>
  );
};

export default TestQuestionGrid;
