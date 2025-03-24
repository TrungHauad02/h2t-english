import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery, alpha } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ScoreDisplayProps {
  score: number;
  total?: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, total }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        ml: "auto", 
        width: isMobile ? "100%" : "fit-content",
        minWidth: "180px",
        marginBottom:"2%",
        bgcolor: isDarkMode
          ? alpha(color.emerald700, 0.2)
          : alpha(color.emerald100, 0.6),
        border: `2px solid ${isDarkMode ? color.emerald600 : color.emerald400}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <EmojiEventsIcon
          sx={{
            color: isDarkMode ? color.emerald300 : color.emerald600,
            mr: 1,
          }}
        />
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{ color: isDarkMode ? color.emerald200 : color.emerald800 }}
        >
          Your Score
        </Typography>
      </Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          textAlign: "right",
          color: isDarkMode ? color.emerald300 : color.emerald700,
        }}
      >
        {score}
        {typeof total === "number" ? ` / ${total}` : ""}
      </Typography>
    </Paper>
  );
};

export default ScoreDisplay;
