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

interface AudioPreviewPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioError: boolean;
  isAudioLoading: boolean;
  handlePlayAudio: () => void;
}

export default function AudioPreviewPlayer({
  isPlaying,
  audioError,
  isAudioLoading,
  handlePlayAudio,
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
        justifyContent: "space-between",
        alignItems: "center",
        border: `2px solid ${
          isPlaying
            ? isDarkMode
              ? color.teal500
              : color.teal600
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
          : "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          disabled={audioError}
          onClick={handlePlayAudio}
          size="medium"
          sx={{
            backgroundColor: audioError
              ? isDarkMode
                ? color.gray600
                : color.gray300
              : isPlaying
              ? isDarkMode
                ? color.teal700
                : color.teal600
              : isDarkMode
              ? color.gray600
              : color.gray300,
            color: audioError
              ? isDarkMode
                ? color.gray400
                : color.gray500
              : isPlaying
              ? color.white
              : isDarkMode
              ? color.teal300
              : color.teal600,
            "&:hover": {
              backgroundColor: audioError
                ? isDarkMode
                  ? color.gray600
                  : color.gray300
                : isPlaying
                ? isDarkMode
                  ? color.teal800
                  : color.teal700
                : isDarkMode
                ? color.teal700
                : color.teal500,
              transform: "scale(1.1)",
            },
            transition: "all 0.2s",
            width: 42,
            height: 42,
            mr: 2,
          }}
        >
          {isAudioLoading ? (
            <CircularProgress
              size={20}
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
            <VolumeUpIcon />
          )}
        </IconButton>

        <Typography
          variant="subtitle1"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: isPlaying ? 600 : 500,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Preview Current Audio
          {audioError && (
            <Tooltip title="Error playing audio">
              <ErrorOutlineIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? color.errorDarkMode : color.error,
                  ml: 0.5,
                }}
              />
            </Tooltip>
          )}
        </Typography>
      </Box>

      {isPlaying && (
        <Box sx={{ width: "100%", position: "absolute", bottom: 0, left: 0 }}>
          <LinearProgress
            sx={{
              height: 4,
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              "& .MuiLinearProgress-bar": {
                backgroundColor: isDarkMode ? color.teal400 : color.teal600,
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
}
