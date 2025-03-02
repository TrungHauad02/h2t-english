import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WritingTopicSectionProps {
  topic: string;
}

export default function WritingTopicSection({
  topic,
}: WritingTopicSectionProps) {
  const [essay, setEssay] = useState<string>("");
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const wordCount = essay
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  // Màu sắc dựa trên chế độ darkMode
  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        p: 3,
        backgroundColor: backgroundColor,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal500,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Writing Exercise
      </Typography>

      {/* Tiêu đề phụ và đề bài */}
      <Typography
        variant="body1"
        component="p"
        sx={{
          color: textColor,
          mb: 3,
          fontStyle: "italic",
        }}
      >
        Write a paragraph about the following topic:
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: isDarkMode ? color.teal200 : color.teal600,
          mb: 3,
        }}
      >
        {topic}
      </Typography>

      {/* Ô nhập bài viết */}
      <TextField
        fullWidth
        multiline
        rows={6}
        value={essay}
        onChange={handleEssayChange}
        placeholder="Write your paragraph here..."
        variant="outlined"
        sx={{
          backgroundColor: isDarkMode ? color.gray700 : color.white,
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: borderColor,
            },
            "&:hover fieldset": {
              borderColor: isDarkMode ? color.teal300 : color.teal500,
            },
            "&.Mui-focused fieldset": {
              borderColor: isDarkMode ? color.teal300 : color.teal500,
            },
          },
          "& .MuiInputBase-input": {
            color: textColor,
          },
        }}
      />

      {/* Đếm số lượng từ */}
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: isDarkMode ? color.gray400 : color.gray600,
          fontStyle: "italic",
        }}
      >
        Word count: {wordCount}
      </Typography>
    </Box>
  );
}
