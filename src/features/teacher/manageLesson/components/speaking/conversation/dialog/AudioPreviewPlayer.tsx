import {
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PauseIcon from "@mui/icons-material/Pause";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface AudioPreviewPlayerProps {
  isPlaying: boolean;
  audioError: boolean;
  isAudioLoading: boolean;
  handlePlayAudio: () => void;
  audioProgress?: number;
}

export default function AudioPreviewPlayer({
  isPlaying,
  audioError,
  isAudioLoading,
  handlePlayAudio,
  audioProgress = 0,
}: AudioPreviewPlayerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray700 : color.gray100,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: `2px solid ${
          isPlaying
            ? isDarkMode
              ? color.teal500
              : color.teal600
            : audioError
            ? isDarkMode
              ? color.red600
              : color.red500
            : isDarkMode
            ? color.gray600
            : color.gray300
        }`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: isPlaying ? "scale(1.01)" : "scale(1)",
        boxShadow: isPlaying
          ? isDarkMode
            ? "0 4px 12px rgba(94, 234, 212, 0.2)"
            : "0 4px 12px rgba(20, 184, 166, 0.2)"
          : audioError
          ? isDarkMode
            ? "0 4px 12px rgba(239, 68, 68, 0.2)"
            : "0 4px 12px rgba(220, 38, 38, 0.2)"
          : "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip
          title={
            audioError
              ? "Audio playback error"
              : isAudioLoading
              ? "Loading audio..."
              : isPlaying
              ? "Pause"
              : "Play"
          }
          arrow
        >
          <span>
            <IconButton
              disabled={audioError || isAudioLoading}
              onClick={handlePlayAudio}
              size="medium"
              sx={{
                backgroundColor: audioError
                  ? isDarkMode
                    ? color.red900
                    : color.red100
                  : isPlaying
                  ? isDarkMode
                    ? color.teal700
                    : color.teal600
                  : isDarkMode
                  ? color.gray600
                  : color.gray300,
                color: audioError
                  ? isDarkMode
                    ? color.red400
                    : color.red600
                  : isPlaying
                  ? color.white
                  : isDarkMode
                  ? color.teal300
                  : color.teal600,
                "&:hover": {
                  backgroundColor: audioError
                    ? isDarkMode
                      ? color.red800
                      : color.red200
                    : isPlaying
                    ? isDarkMode
                      ? color.teal800
                      : color.teal700
                    : isDarkMode
                    ? color.teal700
                    : color.teal500,
                  transform:
                    !audioError && !isAudioLoading ? "scale(1.1)" : "scale(1)",
                },
                "&.Mui-disabled": {
                  backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                  color: isDarkMode ? color.gray500 : color.gray400,
                },
                transition: "all 0.2s",
                width: 48,
                height: 48,
              }}
            >
              {isAudioLoading ? (
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{
                    color: isDarkMode ? color.teal100 : color.teal800,
                  }}
                />
              ) : audioError ? (
                <VolumeOffIcon />
              ) : isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: audioError
                ? isDarkMode
                  ? color.red400
                  : color.red600
                : isDarkMode
                ? color.gray200
                : color.gray800,
              fontWeight: isPlaying ? 600 : 500,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {audioError ? "Audio Playback Error" : "Preview Generated Audio"}
            {audioError && (
              <Tooltip title="Failed to load or play audio. The audio file may be corrupted or the URL may be invalid.">
                <ErrorOutlineIcon
                  fontSize="small"
                  sx={{
                    color: isDarkMode ? color.errorDarkMode : color.error,
                    cursor: "help",
                  }}
                />
              </Tooltip>
            )}
          </Typography>

          {!audioError && (
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                display: "block",
                mt: 0.5,
              }}
            >
              {isAudioLoading
                ? "Loading audio file..."
                : isPlaying
                ? "Playing..."
                : "Click to preview the generated audio"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Progress bar */}
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant={isAudioLoading ? "indeterminate" : "determinate"}
          value={isAudioLoading ? 0 : audioProgress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: isDarkMode ? color.gray600 : color.gray300,
            "& .MuiLinearProgress-bar": {
              backgroundColor: audioError
                ? isDarkMode
                  ? color.red400
                  : color.red500
                : isDarkMode
                ? color.teal400
                : color.teal600,
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Audio status text */}
      {(isPlaying || audioProgress > 0) && !isAudioLoading && (
        <Typography
          variant="caption"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
            textAlign: "center",
            mt: -0.5,
          }}
        >
          {Math.round(audioProgress)}% complete
        </Typography>
      )}
    </Paper>
  );
}
