import { Box, Typography, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function ResponseHeader() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: { xs: 2, md: 3 },
          background: isDarkMode 
            ? `linear-gradient(90deg, ${color.teal900}, ${color.emerald900})` 
            : `linear-gradient(90deg, ${color.teal400}, ${color.emerald400})`,
        }}
      >
        <AssessmentIcon
          sx={{
            fontSize: { xs: 32, md: 40 },
            color: isDarkMode ? color.teal200 : color.white,
            mr: 2,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? color.white : color.white,
            fontSize: { xs: "1.5rem", md: "2rem" },
            textShadow: isDarkMode
              ? "0 2px for ${color.black}"
              : "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Manage AI Responses
        </Typography>
      </Box>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: isDarkMode ? `${color.gray800}` : color.white,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Review and evaluate AI-generated responses from students. Track evaluation status and manage feedback.
        </Typography>
      </Box>
    </Paper>
  );
}