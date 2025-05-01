import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TimeRemainingProps {
  timeUsed?: number; // Time used in seconds
  timeLimit?: number; // Time limit in seconds
}

const TimeRemaining: React.FC<TimeRemainingProps> = ({
  timeUsed = 0,
  timeLimit = 7200 // Default 2 hours
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // Calculate time remaining
  const timeRemaining = Math.max(0, timeLimit - timeUsed);
  const percentageUsed = Math.min(100, (timeUsed / timeLimit) * 100);
  
  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Determine color based on time remaining
  const getProgressColor = () => {
    if (percentageUsed > 90) return isDarkMode ? color.red500 : color.red600;
    if (percentageUsed > 75) return isDarkMode ? color.warning : color.warning;
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
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mb: 1
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon 
            sx={{ 
              mr: 1, 
              color: getProgressColor()
            }} 
          />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: isDarkMode ? color.gray200 : color.gray800
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
            fontFamily: "monospace" 
          }}
        >
          {formatTime(timeRemaining)}
        </Typography>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={percentageUsed}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          '& .MuiLinearProgress-bar': {
            backgroundColor: getProgressColor(),
            borderRadius: 4
          }
        }}
      />
      
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mt: 1,
        fontSize: "0.75rem",
        color: isDarkMode ? color.gray400 : color.gray600 
      }}>
        <Typography variant="caption">
          Elapsed: {formatTime(timeUsed)}
        </Typography>
        <Typography variant="caption">
          Total: {formatTime(timeLimit)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TimeRemaining;