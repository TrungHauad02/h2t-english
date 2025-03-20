import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface DigitalDisplayProps {
  minutes: number;
  seconds: number;
  percentRemaining: number;
  fontSizeDigital: "h4" | "h3" | "h2" | "h1";
  getTimerColor: () => string;
}

export default function DigitalDisplay({
  minutes,
  seconds,
  percentRemaining,
  fontSizeDigital,
  getTimerColor,
}: DigitalDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 2,
        p: 1,
      }}
    >
      <Typography
        variant={fontSizeDigital}
        fontWeight="bold"
        sx={{
          color: getTimerColor(),
          transition: "all 0.3s ease",
          letterSpacing: "1px",
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
        }}
      >
        {`${minutes}:${seconds.toString().padStart(2, "0")}`}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: isDarkMode ? color.gray400 : color.gray600,
          fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
          mt: -0.5,
          opacity: 0.8,
        }}
      >
        {Math.round(percentRemaining)}% remaining
      </Typography>
    </Box>
  );
}
