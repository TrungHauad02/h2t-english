import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestSpeaking, Question } from "interfaces";
import { testService } from "features/test/services/testServices";

interface TestSpeakingQuestionGridProps {
  testSpeakings: TestSpeaking[];
}

const TestSpeakingQuestionGrid: React.FC<TestSpeakingQuestionGridProps> = ({ testSpeakings }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [questionsList, setQuestionsList] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {

        const fetchedQuestions = await Promise.all(
          testSpeakings.flatMap(async (speaking) => testService.getQuestionsByIds(speaking.questions))
        );
        setQuestionsList(fetchedQuestions.flat());
      } catch (error) {
  
      } finally {

      }
    }

    fetchQuestions();
  }, [testSpeakings]);

  return (
    <Box sx={{ p: 2, border: "2px solid", borderColor: isDarkMode ? color.gray700 : "#ccc", borderRadius: "10px", bgcolor: isDarkMode ? color.gray900 : "#f9f9f9", textAlign: "center", width: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        Time remaining:
      </Typography>
      <Grid container spacing={1}>
        {questionsList.map((_, index) => (
          <Grid item key={index} xs={2}>
            <Stack sx={{ border: "1px solid", padding: 0.5, minWidth: 24, minHeight: 24, alignItems: "center", justifyContent: "center" }}>
              {index + 1}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          mt: { xs: 1.5, sm: 2 },
          fontSize: { xs: "0.6rem", sm: "1rem" },
          py: { xs: 0.4, sm: 0.6 },
          bgcolor: color.emerald400,
          "&:hover": {
            bgcolor: color.emerald500,
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default TestSpeakingQuestionGrid;
