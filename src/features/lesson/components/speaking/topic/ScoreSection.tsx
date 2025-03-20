import { Box, Typography, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ScoreSection({ score }: { score: number }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        borderRadius: 2,
        bgcolor: isDarkMode ? color.gray600 : color.gray100,
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
      >
        Your Score
      </Typography>
      <Box
        sx={{
          width: 140,
          height: 140,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={score}
          size={140}
          thickness={6}
          sx={{
            color:
              score >= 80
                ? isDarkMode
                  ? color.emerald400
                  : color.emerald600
                : score >= 60
                ? isDarkMode
                  ? color.warning
                  : color.warning
                : isDarkMode
                ? color.red500
                : color.red600,
            position: "absolute",
            transition: "all 0.5s ease",
          }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: isDarkMode ? color.white : color.gray900,
            transition: "all 0.3s ease",
          }}
        >
          {score}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
      >
        out of 100
      </Typography>
    </Box>
  );
}
