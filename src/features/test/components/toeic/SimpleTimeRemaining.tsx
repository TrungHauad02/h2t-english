import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SimpleTimeRemainingProps {
  createAt: Date;
  duration: number; // duration in minutes
  onTimeUp?: () => void;
}

export default function SimpleTimeRemaining({ 
  createAt,
  duration,
  onTimeUp
}: SimpleTimeRemainingProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [hasTimeExpired, setHasTimeExpired] = useState(false);
  
  const durationInSeconds = duration * 60; // Convert minutes to seconds
  
  useEffect(() => {
    if (!createAt) return;
    
    const updateTimeElapsed = () => {
      const createTime = new Date(createAt).getTime();
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.floor((currentTime - createTime) / 1000);
      
      setTimeElapsed(elapsedTimeInSeconds);
    };
    
    updateTimeElapsed();
    
    const intervalId = setInterval(updateTimeElapsed, 1000);
    
    return () => clearInterval(intervalId);
  }, [createAt]);
  
  const timeRemaining = Math.max(0, durationInSeconds - timeElapsed);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getTimeColor = () => {
    const percentageUsed = (timeElapsed / durationInSeconds) * 100;
    
    if (timeRemaining <= 0) return color.red600;
    if (percentageUsed > 90) return color.red500;
    if (percentageUsed > 75) return color.warning;
    return color.white;
  };

  useEffect(() => {
    // Time up
    if (timeRemaining === 0 && !hasTimeExpired) {
      setHasTimeExpired(true);
      if (onTimeUp) {
        onTimeUp();
      }
    }
  }, [timeRemaining, hasTimeExpired, onTimeUp]);

  const percentageUsed = (timeElapsed / durationInSeconds) * 100;
  const shouldBlink = percentageUsed > 90 && timeRemaining > 0;

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 1,
        animation: shouldBlink ? 'blink 1s ease-in-out infinite' : 'none',
        '@keyframes blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 }
        }
      }}
    >
      <AccessTimeIcon 
        sx={{ 
          fontSize: 20,
          color: getTimeColor()
        }} 
      />
      <Typography 
        fontWeight={600} 
        fontSize="1rem"
        sx={{
          color: getTimeColor(),
          fontFamily: "monospace",
          letterSpacing: "0.025em",
          minWidth: timeRemaining >= 3600 ? "80px" : "60px" // Prevent layout shift
        }}
      >
        {formatTime(timeRemaining)}
      </Typography>
    </Box>
  );
}