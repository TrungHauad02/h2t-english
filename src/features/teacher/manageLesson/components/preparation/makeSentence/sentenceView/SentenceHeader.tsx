import React from "react";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { ViewList } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SentenceHeaderProps {
  count: number;
}

export default function SentenceHeader({ count }: SentenceHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        backgroundImage: `linear-gradient(to right, ${
          isDarkMode ? color.teal900 : color.teal50
        }, ${isDarkMode ? color.gray800 : color.gray50})`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center">
        <ViewList
          sx={{
            color: isDarkMode ? color.teal300 : color.teal700,
            mr: 1,
            fontSize: "2rem",
          }}
        />
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? color.white : color.gray900,
            mr: 2,
          }}
        >
          Sentences
        </Typography>
        <Chip
          label={`${count} items`}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal100,
            color: isDarkMode ? color.white : color.teal900,
            fontWeight: "bold",
          }}
        />
      </Box>
    </Paper>
  );
}
