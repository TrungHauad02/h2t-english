import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface IntroducePartTestProps {
  type: TestPartTypeEnum;
}

const partSteps: Record<TestPartTypeEnum, string[]> = {
  VOCABULARY: [
    "You will see a sentence with a missing word.",
    "Choose the word that best completes the sentence.",
    "Think about context and meaning.",
  ],
  GRAMMAR: [
    "Read each sentence carefully.",
    "Choose the most grammatically correct option.",
    "Pay attention to verb tenses and word order.",
  ],
  READING: [
    "Read the passage thoroughly.",
    "Answer multiple-choice questions based on the passage.",
    "Focus on main ideas, details, and inferences.",
  ],
  LISTENING: [
    "Listen to each audio clip carefully.",
    "You will answer questions based on what you hear.",
    "Use headphones for better clarity.",
  ],
  SPEAKING: [
    "Read the question and think before you speak.",
    "Press the mic button to record your answer.",
    "Try to speak clearly and naturally.",
  ],
  WRITING: [
    "Read the topic and understand the task.",
    "Write your essay within the word limit.",
    "Structure your writing with introduction, body, and conclusion.",
    "Check grammar and vocabulary before submitting.",
  ],
};

const IntroducePartTest: React.FC<IntroducePartTestProps> = ({ type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        bgcolor: isDarkMode
          ? alpha(color.emerald800, 0.2)
          : alpha(color.emerald100, 0.5),
        border: `1px solid ${isDarkMode ? color.emerald700 : color.emerald200}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <MenuBookIcon
          sx={{
            color: isDarkMode ? color.emerald300 : color.emerald600,
            mr: 2,
            mt: 0.5,
            fontSize: 24,
          }}
        />
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          fontWeight="600"
          sx={{ color: isDarkMode ? color.emerald200 : color.emerald800 }}
        >
          How to Do This Part
        </Typography>
      </Box>

      <Box sx={{ pl: 5 }}>
        <Stack spacing={1.5}>
          {partSteps[type].map((step, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
            >
              • {step}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default IntroducePartTest;
