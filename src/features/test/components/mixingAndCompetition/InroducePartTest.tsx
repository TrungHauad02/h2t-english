import React from "react";
import { Box, Typography } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import MenuBookIcon from "@mui/icons-material/MenuBook"; 

interface IntroducePartTestProps {
  type: TestPartTypeEnum;
}

const partDescriptions: Record<TestPartTypeEnum, string> = {
  VOCABULARY: "Choose the most appropriate word to complete each sentence.",
  GRAMMAR: "Select the correct grammatical structure that fits the context.",
  READING: "Read the passage carefully and answer the following questions.",
  LISTENING: "Listen to the audio and choose the correct answer based on what you hear.",
  SPEAKING: "Respond to the question by recording your voice clearly.",
  WRITING: "Write an essay based on the given topic. Pay attention to word limits.",
};

const IntroducePartTest: React.FC<IntroducePartTestProps> = ({ type }) => {
  const color = useColor();

  return (
    <Box
      sx={{
        borderRadius: "12px",
        p: 2.5,
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: color.emerald400,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Đổ bóng nhẹ
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          bgcolor: color.emerald500, // Hover hiệu ứng sáng hơn
        },
      }}
    >
      <MenuBookIcon sx={{ fontSize: 32, color: "white" }} />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "white", mb: 0.5 }}>
          Instructions
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {partDescriptions[type]}
        </Typography>
      </Box>
    </Box>
  );
};

export default IntroducePartTest;
