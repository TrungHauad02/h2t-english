import React from "react";
import {
  Box,
  IconButton,
  Slide,
  Slider,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { StyleProps } from "./types";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface UnlockSliderProps extends StyleProps {
  animateWarning: boolean;
  sliderValue: number;
  onSliderChange: (event: Event, newValue: number | number[]) => void;
}

export default function UnlockSlider({
  animateWarning,
  sliderValue,
  onSliderChange,
  paperShredding,
  unlocked,
}: UnlockSliderProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? colors.gray400 : colors.gray600;
  const lockColor = unlocked
    ? colors.red600
    : isDarkMode
    ? colors.gray500
    : colors.gray600;

  return (
    <Slide direction="up" in={animateWarning} timeout={600}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 1,
          opacity: paperShredding ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          <IconButton
            size="small"
            disabled={unlocked}
            sx={{ color: lockColor }}
          >
            {unlocked ? <LockOpenIcon /> : <LockIcon />}
          </IconButton>

          <Slider
            value={sliderValue}
            onChange={onSliderChange}
            sx={{
              mx: 2,
              color: colors.red500,
              height: 8,
              borderRadius: 4,
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                bgcolor: unlocked
                  ? colors.red600
                  : isDarkMode
                  ? colors.gray400
                  : colors.gray600,
                boxShadow: unlocked ? `0 0 10px ${colors.red500}` : "none",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0 0 0 8px ${alpha(colors.red500, 0.16)}`,
                },
                "&.Mui-active": {
                  width: 32,
                  height: 32,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.5,
                backgroundColor: isDarkMode ? colors.gray600 : colors.gray400,
              },
            }}
          />

          <Tooltip title="Sound effect">
            <IconButton
              size="small"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray600,
                opacity: 0.5,
              }}
            >
              <VolumeUpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="caption"
          sx={{
            color: unlocked ? colors.red500 : secondaryTextColor,
            fontWeight: unlocked ? 600 : 400,
            mt: 1,
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            animation: unlocked ? "pulseText 1.5s infinite" : "none",
            "@keyframes pulseText": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.7 },
            },
          }}
        >
          {unlocked
            ? "UNLOCKED - READY TO DELETE"
            : "Slide to unlock delete confirmation"}
        </Typography>
      </Box>
    </Slide>
  );
}
