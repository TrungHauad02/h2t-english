import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SubmitTestButton from "../common/SubmitTestButton";

interface QuestionItem {
  serialNumber: number;
  questionId: number;
  partType: TestPartTypeEnum;
  isAnswered: boolean;
}

interface TestQuestionGridProps {
  questionItems: QuestionItem[];
  onQuestionSelect: (questionItem: QuestionItem) => void;
}

const TestQuestionGrid: React.FC<TestQuestionGridProps> = ({ questionItems, onQuestionSelect }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const questionsByType = React.useMemo(() => {
    const grouped: Record<TestPartTypeEnum, QuestionItem[]> = {
      [TestPartTypeEnum.VOCABULARY]: [],
      [TestPartTypeEnum.GRAMMAR]: [],
      [TestPartTypeEnum.READING]: [],
      [TestPartTypeEnum.LISTENING]: [],
      [TestPartTypeEnum.SPEAKING]: [],
      [TestPartTypeEnum.WRITING]: [],
    };

    questionItems.forEach(item => {
      grouped[item.partType].push(item);
    });

    return grouped;
  }, [questionItems]);

  return (
    <Box
      sx={{
        p: { xs: 0.5, sm: 2 },
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : "#ccc",
        borderRadius: "10px",
        bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
        textAlign: "center",
        maxWidth: { xs: "40%" },
        mx: "auto",
        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
      }}
    >
      {Object.entries(questionsByType).map(([section, items]) => {
        if (items.length === 0) return null;
        
        const sectionName = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
        
        return (
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
              {sectionName} 
            </Typography>
            <Grid container spacing={{ xs: 0.5, sm: 1 }} justifyContent="flex-start">
              {items.map((item) => (
                <Grid
                  item
                  key={item.questionId}
                  sx={{
                    flexBasis: { xs: "15%", sm: "18%", md: "16%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={() => onQuestionSelect(item)}
                >
                  <Stack
                    sx={{
                      border: "1px solid",
                      borderColor: isDarkMode ? 
                        (item.isAnswered ? color.teal600 : color.gray600) : 
                        (item.isAnswered ? color.teal500 : "black"),
                      padding: { xs: 0.1, sm: 0.6 },
                      minWidth: { xs: 15, sm: 24, md: 28 },
                      minHeight: { xs: 15, sm: 24, md: 28 },
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: { xs: "0.75rem", sm: "0.85rem" },
                      borderRadius: "4px",
                      bgcolor: isDarkMode ? 
                        (item.isAnswered ? color.teal800 : color.gray800) : 
                        (item.isAnswered ? color.teal50 : "white"),
                      boxShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        bgcolor: isDarkMode ? 
                          (item.isAnswered ? color.teal700 : color.gray700) : 
                          (item.isAnswered ? color.teal100 : color.gray100),
                      },
                    }}
                  >
                    {item.serialNumber}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
      <SubmitTestButton />
    </Box>
  );
};

export default TestQuestionGrid;