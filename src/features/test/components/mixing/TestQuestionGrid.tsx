import React from "react";
import { Box, Typography, Grid, Button, Stack } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TestQuestionGridProps {
  questionCounts: Record<TestPartTypeEnum, number>;
}

const TestQuestionGrid: React.FC<TestQuestionGridProps> = ({ questionCounts }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  let serial = 1;

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : "#ccc",
        borderRadius: "10px",
        bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
        textAlign: "center",
        width: { xs: "95%", sm: "80%", md: "250px" },
        maxWidth: "300px",
        mx: "auto",
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
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              color: isDarkMode ? color.gray200 : "black",
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()}
          </Typography>
          <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent="flex-start">
            {Array.from({ length: count }, () => (
              <Grid
                item
                key={serial}
                sx={{
                  flexBasis: { xs: "22%", sm: "18%", md: "16%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack
                  sx={{
                    border: "1px solid",
                    borderColor: isDarkMode ? color.gray600 : "black",
                    padding: { xs: 0.3, sm: 0.6 },
                    minWidth: { xs: 20, sm: 24, md: 28 },
                    minHeight: { xs: 20, sm: 24, md: 28 },
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
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
      ))}
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

export default TestQuestionGrid;
