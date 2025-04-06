import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

interface AudioControlsProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export default function AudioControls({
  audioUrl,
  isPlaying,
  onPlayPause,
}: AudioControlsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        backgroundColor: isDarkMode ? color.gray800 : color.gray100,
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        "&:hover": {
          backgroundColor: isDarkMode ? color.gray700 : color.gray200,
          borderColor: isDarkMode ? color.teal700 : color.teal300,
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
        <Tooltip title={isPlaying ? "Pause" : "Play"} arrow>
          <IconButton
            onClick={onPlayPause}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              backgroundColor: isDarkMode
                ? isPlaying
                  ? color.teal800
                  : color.gray700
                : isPlaying
                ? color.teal100
                : color.white,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? isPlaying
                    ? color.teal700
                    : color.gray600
                  : isPlaying
                  ? color.teal200
                  : color.gray50,
                transform: "scale(1.05)",
              },
              width: 38,
              height: 38,
              borderRadius: "50%",
              boxShadow: isDarkMode
                ? "0 4px 8px rgba(0,0,0,0.3)"
                : "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: "1.3rem" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: "1.3rem" }} />
            )}
          </IconButton>
        </Tooltip>

        <Stack sx={{ flexGrow: 1, width: "100%" }} spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <VolumeUpIcon
              fontSize="small"
              sx={{
                color: isDarkMode
                  ? isPlaying
                    ? color.teal400
                    : color.gray400
                  : isPlaying
                  ? color.teal600
                  : color.gray500,
                fontSize: "1rem",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode
                  ? isPlaying
                    ? color.teal300
                    : color.gray300
                  : isPlaying
                  ? color.teal700
                  : color.gray600,
                fontWeight: isPlaying ? 600 : 400,
                flexGrow: 1,
              }}
            >
              {isPlaying ? "Now playing" : "Audio clip"}
            </Typography>

            {hovered && (
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  opacity: 0.8,
                }}
              >
                Click to {isPlaying ? "pause" : "play"}
              </Typography>
            )}
          </Stack>

          <LinearProgress
            variant="determinate"
            value={isPlaying ? 35 : 0}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              "& .MuiLinearProgress-bar": {
                backgroundColor: isDarkMode ? color.teal400 : color.teal500,
                transition: "transform 0.4s linear",
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
