import { Box, Typography, Fade } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import useColor from "theme/useColor";
import { formatTime } from "utils/format";
import { useDarkMode } from "hooks/useDarkMode";

interface TimerInfoProps {
  percentRemaining: number;
  timeLeft: number;
  isRecording: boolean;
  isPaused: boolean;
  isXs: boolean;
}

export default function TimerInfo({
  percentRemaining,
  timeLeft,
  isRecording,
  isPaused,
  isXs,
}: TimerInfoProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getTimerColor = () => {
    if (percentRemaining < 10) return color.red500;
    if (percentRemaining < 30) return color.warning;
    return isDarkMode ? color.emerald400 : color.emerald600;
  };

  return (
    <Box
      sx={{
        ml: { xs: 0, sm: 2 },
        width: { xs: "100%", sm: "auto" },
        maxWidth: { xs: "100%", sm: "350px", md: "400px" },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <TimerIcon
          fontSize={isXs ? "small" : "medium"}
          color={percentRemaining < 30 ? "warning" : "success"}
        />
        <span>
          You have{" "}
          <b
            style={{
              color: getTimerColor(),
            }}
          >
            {formatTime(timeLeft)}
          </b>{" "}
          to speak about this topic
        </span>
      </Typography>

      {isRecording && (
        <Fade in={isRecording}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              padding: "4px 8px",
              borderRadius: "4px",
              background: isPaused ? `${color.warning}20` : `${color.red500}20`,
              width: "fit-content",
              mx: { xs: "auto", sm: 0 },
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: isPaused ? color.warning : color.red500,
                mr: 1,
                animation: isPaused
                  ? "none"
                  : "pulse-recording 1.5s infinite ease-in-out",
                "@keyframes pulse-recording": {
                  "0%": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                  "50%": {
                    opacity: 0.4,
                    transform: "scale(1.2)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isPaused ? color.warning : color.red500,
                fontWeight: "medium",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {isPaused ? "Recording paused" : "Recording in progress"}
            </Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
