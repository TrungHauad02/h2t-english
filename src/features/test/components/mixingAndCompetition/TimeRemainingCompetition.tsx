import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TimeRemainingProps {
  endTime: Date | string;
  onTimeout?: () => void; 
  duration: number; 
}

export default function TimeRemaining({ endTime, onTimeout,duration }: TimeRemainingProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [percentageRemaining, setPercentageRemaining] = useState<number>(100);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false); // Tránh gọi lại nhiều lần

  useEffect(() => {
    const endDateObj = typeof endTime === "string" ? new Date(endTime) : endTime;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = endDateObj.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining(0);
        setPercentageRemaining(0);

        if (!hasSubmitted && onTimeout) {
          onTimeout();
          setHasSubmitted(true); // Đánh dấu đã gọi
        }

        return;
      }

      const seconds = Math.floor(diff / 1000);
      setTimeRemaining(seconds);

      const totalDuration = (duration !== undefined && duration > 0) ? duration * 60 : 2 * 60 * 60;

      const remainingPercentage = (seconds / totalDuration) * 100;
      setPercentageRemaining(Math.min(100, Math.max(0, remainingPercentage)));
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [endTime, onTimeout, hasSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    if (percentageRemaining < 10) return isDarkMode ? color.red500 : color.red600;
    if (percentageRemaining < 25) return isDarkMode ? color.warning : color.warning;
    return isDarkMode ? color.teal500 : color.teal600;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "12px",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: "1px solid",
        borderColor: isDarkMode ? color.gray700 : color.gray200,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1, color: getProgressColor() }} />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.gray200 : color.gray800,
            }}
          >
            Time Remaining
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: getProgressColor(),
            fontFamily: "monospace",
          }}
        >
          {formatTime(timeRemaining)}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={100 - percentageRemaining}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          "& .MuiLinearProgress-bar": {
            backgroundColor: getProgressColor(),
            borderRadius: 4,
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
          fontSize: "0.75rem",
          color: isDarkMode ? color.gray400 : color.gray600,
        }}
      >
        <Typography variant="caption">
          {timeRemaining <= 0 ? "Time's up!" : "Competition in progress"}
        </Typography>
      </Box>
    </Paper>
  );
}
