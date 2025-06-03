import React from "react";
import {
  Box,
  Typography,
  Fade,
} from "@mui/material";
import { keyframes } from "@mui/system";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Loading...",
}: LoadingScreenProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const bounce = keyframes`
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  `;

  const ellipsis = keyframes`
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  `;

  const progress = keyframes`
    0%, 20% {
      width: 0;
    }
    40%, 60% {
      width: 50%;
    }
    80%, 100% {
      width: 100%;
    }
  `;

  return (
    <Fade in={true} timeout={300}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkMode ? color.gray800 : color.gray200,
          zIndex: 9999,
        }}
      >
        {/* Bouncing dots animation */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 4,
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: isDarkMode ? color.teal400 : color.teal600,
                animation: `${bounce} 1.4s ease-in-out infinite both`,
                animationDelay: `${index * 0.16}s`,
              }}
            />
          ))}
        </Box>

        {/* Loading text with animated ellipsis */}
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500,
            position: "relative",
            "&::after": {
              content: "'...'",
              animation: `${ellipsis} 2s steps(4) infinite`,
            },
          }}
        >
          {message}
        </Typography>

        {/* Progress indicator */}
        <Box
          sx={{
            mt: 3,
            width: 120,
            height: 2,
            borderRadius: 1,
            backgroundColor: isDarkMode ? color.gray600 : color.gray400,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "30%",
              backgroundColor: isDarkMode ? color.teal400 : color.teal600,
              borderRadius: 1,
              animation: `${progress} 2s ease-in-out infinite`,
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}