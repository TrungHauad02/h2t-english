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
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

type TestType = "reading" | "listening" | "speaking" | "writing";

interface TestInstructionProps {
  type: TestType;
}

const instructionSteps: Record<TestType, string[]> = {
  reading: [
    "Carefully read each passage before attempting the questions.",
    "Pay close attention to keywords, main ideas, and supporting details.",
    "Answer multiple-choice questions based on the content of the passage.",
  ],
  listening: [
    "Put on your headphones and adjust the volume to a comfortable level.",
    "Each audio will play automatically. Listen carefully without distraction.",
    "After the audio ends, answer the related questions promptly.",
  ],
  speaking: [
    "You will be presented with a question or topic to speak about.",
    "Take a few seconds to plan your response before recording.",
    "Click the mic button and speak clearly and naturally within the time limit.",
  ],
  writing: [
    "Read the given prompt or topic carefully.",
    "Organize your thoughts before you start writing.",
    "Write your response in a clear structure: introduction, body, and conclusion.",
    "Review your grammar, spelling, and coherence before submitting.",
  ],
};

const TestInstruction: React.FC<TestInstructionProps> = ({ type }) => {
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
          ? alpha(color.teal800, 0.2)
          : alpha(color.teal100, 0.4),
        border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <MenuBookIcon
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            mr: 2,
            mt: 0.5,
            fontSize: 24,
          }}
        />
        <Typography
          variant={isMobile ? "subtitle1" : "h6"}
          fontWeight="600"
          sx={{ color: isDarkMode ? color.teal200 : color.teal800 }}
        >
          Test Instructions
        </Typography>
      </Box>

      <Box sx={{ pl: 5 }}>
        <Stack spacing={1.5}>
          {instructionSteps[type].map((step, index) => (
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

export default TestInstruction;
