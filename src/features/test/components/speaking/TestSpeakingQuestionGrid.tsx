import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack,Button } from "@mui/material";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(false);

        const fetchedQuestions = await Promise.all(
          testSpeakings.flatMap(async (speaking) => {
            return await testService.getQuestionsByIds(speaking.questions);
          })
        );

        setQuestionsList(fetchedQuestions.flat());
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [testSpeakings]);

  let serial = 1;

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
      {loading ? (
        <Typography sx={{ textAlign: "center", color: "gray" }}>Loading...</Typography>
      ) : error ? (
        <Typography sx={{ textAlign: "center", color: "red" }}>Cannot load data. Try again.</Typography>
      ) : (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              fontSize: "1rem",
              color: isDarkMode ? color.gray200 : "black",
            }}
          >
            Time remaining: 
          </Typography>
          <Grid container spacing={1} justifyContent="flex-start">
            {questionsList.map((question) => (
              <Grid
                item
                key={serial}
                sx={{
                  flexBasis: "10%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack
                  sx={{
                    border: "1px solid",
                    borderColor: isDarkMode ? color.gray600 : "black",
                    padding: 0.6,
                    minWidth: 30,
                    minHeight: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    borderRadius: "4px",
                    bgcolor: isDarkMode ? color.gray800 : "white",
                    boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {serial++}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
          <Button
        variant="contained"
        sx={{
          width: "100%",
          mt: { xs: 1.5, sm: 2 },
          fontSize: { xs: "0.9rem", sm: "1rem" },
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
