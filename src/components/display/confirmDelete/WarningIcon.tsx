import React from "react";
import { Avatar, Box, Fade, Grow, alpha } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { StyleProps } from "./types";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WarningIconProps extends StyleProps {
  animateWarning: boolean;
}

export default function WarningIcon({
  animateWarning,
  paperShredding,
  isDeleting,
  unlocked,
}: WarningIconProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  const warningBgColor = isDarkMode ? `${colors.red700}30` : `${colors.red100}`;
  const iconColor = colors.red500;

  return (
    <Box
      sx={{
        position: "relative",
        mt: 1,
        mb: 1,
        perspective: "1000px",
      }}
    >
      <Grow in={animateWarning} timeout={800}>
        <Avatar
          sx={{
            bgcolor: warningBgColor,
            width: 80,
            height: 80,
            transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: paperShredding
              ? "rotateY(180deg) scale(1.2)"
              : "rotateY(0) scale(1)",
            transformStyle: "preserve-3d",
            boxShadow: paperShredding
              ? `0 0 30px ${alpha(colors.red500, 0.7)}`
              : "none",
          }}
        >
          {paperShredding ? (
            <DeleteForeverIcon
              sx={{
                color: colors.red600,
                fontSize: 45,
                animation: "shake 0.5s infinite",
                "@keyframes shake": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "10%, 30%, 50%, 70%, 90%": {
                    transform: "translateX(-2px)",
                  },
                  "20%, 40%, 60%, 80%": {
                    transform: "translateX(2px)",
                  },
                },
              }}
            />
          ) : (
            <DeleteOutlineIcon
              sx={{
                color: iconColor,
                fontSize: 45,
                animation: isDeleting
                  ? "spin 1s linear infinite"
                  : unlocked
                  ? "pulse 1.5s infinite"
                  : "none",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)", color: colors.red500 },
                  "50%": {
                    transform: "scale(1.2)",
                    color: colors.red700,
                  },
                  "100%": {
                    transform: "scale(1)",
                    color: colors.red500,
                  },
                },
              }}
            />
          )}
        </Avatar>
      </Grow>

      {/* Radiating effect */}
      {animateWarning && !paperShredding && (
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: `2px solid ${alpha(colors.red500, 0.6)}`,
              animation: "radiate 2s infinite",
              "@keyframes radiate": {
                "0%": { transform: "scale(1)", opacity: 0.7 },
                "70%": { transform: "scale(1.5)", opacity: 0 },
                "100%": { transform: "scale(1.5)", opacity: 0 },
              },
            }}
          />
        </Fade>
      )}

      {/* Second radiating ring */}
      {animateWarning && !paperShredding && (
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: `2px solid ${alpha(colors.red500, 0.4)}`,
              animation: "radiate2 2s infinite 0.5s",
              "@keyframes radiate2": {
                "0%": { transform: "scale(1)", opacity: 0.5 },
                "70%": { transform: "scale(1.7)", opacity: 0 },
                "100%": { transform: "scale(1.7)", opacity: 0 },
              },
            }}
          />
        </Fade>
      )}
    </Box>
  );
}
