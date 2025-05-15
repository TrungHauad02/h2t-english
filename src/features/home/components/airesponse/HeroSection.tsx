import { Box, Typography, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarIcon from "@mui/icons-material/Star";

export default function HeroSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack spacing={4} alignItems="center" mb={10}>
      <Box
        sx={{
          position: "relative",
          animation: "pulse 3s infinite ease-in-out",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${color.teal400} 0%, ${color.emerald500} 100%)`,
            borderRadius: "50%",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isDarkMode
              ? `0 0 60px ${color.teal500}50, 0 0 120px ${color.teal500}30`
              : `0 0 60px ${color.teal300}50, 0 0 120px ${color.teal300}30`,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 70, color: color.white }} />
        </Box>

        {/* Decorative stars */}
        <StarIcon
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            color: color.yellow,
            fontSize: 20,
            animation: "twinkle 2s infinite",
            "@keyframes twinkle": {
              "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
              "50%": { opacity: 1, transform: "scale(1.2)" },
            },
          }}
        />
        <StarIcon
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            color: color.yellow,
            fontSize: 16,
            animation: "twinkle 2s infinite 0.5s",
          }}
        />
      </Box>

      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            background: `linear-gradient(135deg, ${
              isDarkMode ? color.teal300 : color.teal600
            } 0%, ${isDarkMode ? color.emerald300 : color.emerald600} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          AI Response & Feedback
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            maxWidth: "700px",
            fontWeight: "normal",
            fontSize: { xs: "1.1rem", md: "1.5rem" },
            lineHeight: 1.6,
          }}
        >
          Revolutionary AI-powered feedback system that enhances your English
          learning journey with real-time, personalized insights
        </Typography>
      </Stack>
    </Stack>
  );
}
