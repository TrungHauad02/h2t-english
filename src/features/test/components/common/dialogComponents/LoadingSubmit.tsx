import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { keyframes } from "@mui/system";
import SchoolIcon from "@mui/icons-material/School";
import GradingIcon from "@mui/icons-material/Grading";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export default function LoadingSubmit({ title = "Calculating Results" }: { title?: string }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loadingText, setLoadingText] = useState(0);

  const icons = [
    <SchoolIcon sx={{ fontSize: 60 }} />,
    <GradingIcon sx={{ fontSize: 60 }} />,
    <AnalyticsIcon sx={{ fontSize: 60 }} />,
    <EmojiEventsIcon sx={{ fontSize: 60 }} />,
    <AssignmentTurnedInIcon sx={{ fontSize: 60 }} />,
  ];

  const loadingMessages = [
    "Analyzing your responses...",
    "Calculating your score...",
    "Evaluating your performance...",
    "Preparing competition results...",
    "Almost there...",
  ];

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => {
      clearInterval(iconInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "450px",
        minWidth: { xs: "300px", sm: "500px" },
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: 0.05,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color.teal400} 0%, ${color.emerald500} 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `${pulse} ${4 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </Box>

      {/* Main loading container */}
      <Box sx={{ position: "relative", mb: 4 }}>
        {/* Outer rotating ring */}
        <Box
          sx={{
            position: "absolute",
            top: "-30px",
            left: "-30px",
            width: "180px",
            height: "180px",
            border: `3px dashed ${isDarkMode ? color.teal400 : color.teal500}`,
            borderRadius: "50%",
            animation: `${rotate} 20s linear infinite`,
          }}
        />

        {/* Inner rotating ring */}
        <Box
          sx={{
            position: "absolute",
            top: "-20px",
            left: "-20px",
            width: "160px",
            height: "160px",
            border: `2px dotted ${isDarkMode ? color.emerald400 : color.emerald500}`,
            borderRadius: "50%",
            animation: `${rotate} 15s linear infinite reverse`,
          }}
        />

        {/* Central icon container */}
        <Box
          sx={{
            width: "120px",
            height: "120px",
            background: `linear-gradient(135deg, ${color.teal400} 0%, ${color.emerald500} 100%)`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `${bounce} 2s ease-in-out infinite`,
            boxShadow: isDarkMode
              ? `0 10px 40px ${color.teal500}50, 0 0 80px ${color.teal500}30`
              : `0 10px 40px ${color.teal300}50, 0 0 80px ${color.teal300}30`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              color: color.white,
              animation: `${pulse} 1.5s ease-in-out infinite`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icons[currentIcon]}
          </Box>

          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: "10%",
              right: "10%",
              color: color.yellow,
              fontSize: 20,
              animation: `${pulse} 2s infinite`,
            }}
          />
        </Box>
      </Box>

      {/* Loading text */}
      <Stack spacing={3} alignItems="center">
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: isDarkMode ? color.gray100 : color.gray800,
            animation: `${slideIn} 0.5s ease-out`,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ width: "400px", maxWidth: "90%" }}>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              animation: `${slideIn} 0.7s ease-out`,
              mb: 3,
            }}
          >
            {loadingMessages[loadingText]}
          </Typography>

          <Stack spacing={1}>
            {[...Array(5)].map((_, i) => (
              <Paper
                key={i}
                elevation={0}
                sx={{
                  height: "4px",
                  width: `${20 + i * 20}%`,
                  background: `linear-gradient(90deg, 
                    ${isDarkMode ? color.teal400 : color.teal500} 0%, 
                    ${isDarkMode ? color.emerald400 : color.emerald500} 100%)`,
                  opacity: i === currentIcon ? 1 : 0.3,
                  transition: "all 0.3s ease",
                  mx: "auto",
                  animation: i === currentIcon ? `${pulse} 1s infinite` : "none",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            mt: 4,
            p: 2,
            maxWidth: "350px",
            borderRadius: "12px",
            bgcolor: isDarkMode ? color.gray700 : color.gray50,
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
            animation: `${slideIn} 1s ease-out`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              fontStyle: "italic",
            }}
          >
            💡 Did you know? Regular practice in competitions helps improve your
            English skills by 40% faster!
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
