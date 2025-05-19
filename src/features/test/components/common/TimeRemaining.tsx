import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Paper, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TimeRemainingProps {
  createAt: Date;
  duration: number;
  onTimeUp?: () => void;
}

export default function TimeRemaining({ 
  createAt,
  duration,
  onTimeUp
}: TimeRemainingProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [timeUsed, setTimeUsed] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [hasTimeExpired, setHasTimeExpired] = useState(false);
  
  useEffect(() => {
    if (!createAt) return;
    
    const updateTimeUsed = () => {
      const createTime = new Date(createAt).getTime();
      const currentTime = new Date().getTime();
      const elapsedTimeInSeconds = Math.floor((currentTime - createTime) / 1000);
      
      setTimeUsed(elapsedTimeInSeconds);
    };
    
    updateTimeUsed();
    
    const intervalId = setInterval(updateTimeUsed, 1000);
    
    return () => clearInterval(intervalId);
  }, [createAt]);
  
  const durationInSeconds = (duration || 0) * 60;
  
  const timeRemaining = Math.max(0, durationInSeconds - timeUsed);
  const percentageUsed = Math.min(100, (timeUsed / durationInSeconds) * 100);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgressColor = () => {
    if (percentageUsed > 90) return isDarkMode ? color.red500 : color.red600;
    if (percentageUsed > 75) return isDarkMode ? color.warning : color.warning;
    return isDarkMode ? color.emerald500 : color.emerald600;
  };

  useEffect(() => {
    if (timeRemaining <= 300 && timeRemaining > 0) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
    
    if (timeRemaining === 0 && !hasTimeExpired) {
      setHasTimeExpired(true);
      if (onTimeUp) {
        onTimeUp();
      }
    }
  }, [timeRemaining, hasTimeExpired, onTimeUp]);

  const warningAnimation = isWarning ? {
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.7 },
      '100%': { opacity: 1 }
    }
  } : {};

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: "2px solid",
        borderColor: hasTimeExpired
          ? (isDarkMode ? color.red600 : color.red500)
          : isWarning 
          ? (isDarkMode ? color.red500 : color.red400)
          : (isDarkMode ? color.gray700 : color.gray200),
        transition: "all 0.3s ease",
        ...warningAnimation
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mb: 1.5
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ position: "relative" }}>
            <AccessTimeIcon 
              sx={{ 
                fontSize: 28,
                color: getProgressColor(),
                transition: "color 0.3s ease"
              }} 
            />
            {(isWarning || hasTimeExpired) && (
              <WarningIcon 
                sx={{ 
                  position: "absolute",
                  top: -8,
                  right: -8,
                  fontSize: 16,
                  color: color.red500,
                  animation: hasTimeExpired ? 'bounce 1s ease-in-out infinite' : 'none',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-3px)' }
                  }
                }} 
              />
            )}
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              color: isDarkMode ? color.gray200 : color.gray800,
              letterSpacing: "0.025em"
            }}
          >
            Time Remaining
          </Typography>
        </Box>
        
        <Tooltip 
          title={
            hasTimeExpired 
              ? "Time's up!" 
              : isWarning 
              ? "Time is running out!" 
              : ""
          }
          placement="left"
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: getProgressColor(),
              fontFamily: "monospace",
              fontSize: "1.5rem",
              transition: "color 0.3s ease",
              userSelect: "none"
            }}
          >
            {formatTime(timeRemaining)}
          </Typography>
        </Tooltip>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={percentageUsed}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          '& .MuiLinearProgress-bar': {
            backgroundColor: getProgressColor(),
            borderRadius: 5,
            transition: "background-color 0.3s ease"
          }
        }}
      />
      
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        mt: 1.5,
        fontSize: "0.875rem"
      }}>
        <Typography 
          variant="caption"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
            fontWeight: 500 
          }}
        >
          Elapsed: {formatTime(timeUsed)}
        </Typography>
        <Typography 
          variant="caption"
          sx={{ 
            color: isDarkMode ? color.gray400 : color.gray600,
            fontWeight: 500
          }}
        >
          Total: {formatTime(durationInSeconds)}
        </Typography>
      </Box>
      
      {hasTimeExpired && (
        <Box 
          sx={{ 
            mt: 2, 
            p: 1.5,
            borderRadius: "8px",
            backgroundColor: isDarkMode 
              ? `${color.red900}30` 
              : `${color.red100}70`,
            display: "flex",
            alignItems: "center",
            gap: 1,
            border: `1px solid ${isDarkMode ? color.red600 : color.red400}`
          }}
        >
          <WarningIcon 
            sx={{ 
              fontSize: 18, 
              color: isDarkMode ? color.red400 : color.red600 
            }} 
          />
          <Typography 
            variant="body2" 
            sx={{ 
              color: isDarkMode ? color.red400 : color.red600,
              fontWeight: 600
            }}
          >
            Time's up! Please submit your test now.
          </Typography>
        </Box>
      )}
      
      {isWarning && !hasTimeExpired && (
        <Box 
          sx={{ 
            mt: 2, 
            p: 1,
            borderRadius: "8px",
            backgroundColor: isDarkMode 
              ? `${color.warning}15` 
              : `${color.warning}20`,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <WarningIcon 
            sx={{ 
              fontSize: 16, 
              color: isDarkMode ? color.warningDarkMode : color.warning 
            }} 
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: isDarkMode ? color.warningDarkMode : color.warning,
              fontWeight: 600
            }}
          >
            Less than 5 minutes remaining!
          </Typography>
        </Box>
      )}
    </Paper>
  );
}