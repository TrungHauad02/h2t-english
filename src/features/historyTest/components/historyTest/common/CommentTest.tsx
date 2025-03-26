import React from "react";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CommentTestProps {
  text: string;
}

const CommentTest: React.FC<CommentTestProps> = ({ text }) => {
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
          AI Feedback
        </Typography>
      </Box>

      <Box sx={{ pl: 5 }}>
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray200 : color.gray800, whiteSpace: "pre-line" ,}}
        >
          {text || "No comment provided."}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CommentTest;
