import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TimeRemainingProps {
  createAt: Date | string;
  endTime: Date | string;
  duration: number; 
  onTimeout?: () => void;
}

export default function TimeRemaining({ 
  createAt, 
  endTime, 
  duration, 
  onTimeout 
}: TimeRemainingProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [percentageRemaining, setPercentageRemaining] = useState<number>(100);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const createAtObj = typeof createAt === "string" ? new Date(createAt) : createAt;
    const endTimeObj = typeof endTime === "string" ? new Date(endTime) : endTime;
    const durationInMs = duration * 60 * 1000;

    const calculateTimeRemaining = () => {
      const now = new Date();
      let remainingTime;

      const timeBetweenEndAndCreate = endTimeObj.getTime() - createAtObj.getTime();
      
      if (timeBetweenEndAndCreate < durationInMs) {
    
        remainingTime = endTimeObj.getTime() - now.getTime();
      } else {
     
        const expectedEndTime = new Date(createAtObj.getTime() + durationInMs);
        remainingTime = expectedEndTime.getTime() - now.getTime();
      }

      // Chuyển từ ms sang seconds và đảm bảo không âm
      const remainingSeconds = Math.max(0, Math.floor(remainingTime / 1000));
      setTimeRemaining(remainingSeconds);

      const totalDurationInSeconds = duration * 60;
      const remainingPercentage = (remainingSeconds / totalDurationInSeconds) * 100;
      setPercentageRemaining(Math.min(100, Math.max(0, remainingPercentage)));

  
      if (remainingSeconds <= 0 && !hasSubmitted && onTimeout) {
        onTimeout();
        setHasSubmitted(true);
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [createAt, endTime, duration, onTimeout, hasSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    
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
          {/* Thời gian tổng cộng */}
          <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          mt: 2,
          py: 0.75,
          px: 1.5,
          borderRadius: "8px",
          backgroundColor: isDarkMode ? `${color.gray700}40` : `${color.gray100}90`,
          fontSize: "0.75rem",
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            display: "flex",
            alignItems: "center",
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
          Total Duration: {formatTime(duration * 60)}
        </Typography>
      </Box>
    </Paper>
  );
}