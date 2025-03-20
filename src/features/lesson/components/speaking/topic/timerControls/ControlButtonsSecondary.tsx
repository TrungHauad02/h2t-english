import { Button, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface PauseButtonProps {
  pauseRecording: () => void;
}

export function PauseButton({ pauseRecording }: PauseButtonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Button
      variant="contained"
      startIcon={<PauseIcon />}
      onClick={pauseRecording}
      sx={{
        bgcolor: isDarkMode ? color.warning : color.warning,
        "&:hover": {
          bgcolor: isDarkMode ? `${color.warning}dd` : `${color.warning}dd`,
          transform: "translateY(-2px)",
          boxShadow: `0 4px 8px ${color.warning}40`,
        },
        transition: "all 0.2s ease",
        borderRadius: "24px",
        boxShadow: `0 2px 4px ${color.warning}30`,
        px: { xs: 2, sm: 3 },
        py: { xs: 0.75, sm: 1 },
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        flexGrow: { xs: 1, sm: 0 },
      }}
    >
      Pause
    </Button>
  );
}

interface MuteButtonProps {
  toggleMute: () => void;
  isMuted: boolean;
  isXs: boolean;
}

export function MuteButton({ toggleMute, isMuted, isXs }: MuteButtonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Tooltip title={isMuted ? "Unmute" : "Mute"} placement="top">
      <IconButton
        onClick={toggleMute}
        sx={{
          color: isMuted
            ? color.red500
            : isDarkMode
            ? color.gray300
            : color.gray700,
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray600 : color.gray300,
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s ease",
          boxShadow: isMuted ? `0 0 0 2px ${color.red500}40` : "none",
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
        }}
        size={isXs ? "small" : "medium"}
      >
        {isMuted ? (
          <VolumeMuteIcon fontSize={isXs ? "small" : "medium"} />
        ) : (
          <VolumeUpIcon fontSize={isXs ? "small" : "medium"} />
        )}
      </IconButton>
    </Tooltip>
  );
}

interface ResumeButtonProps {
  resumeRecording: () => void;
  isXs: boolean;
}

export function ResumeButton({ resumeRecording, isXs }: ResumeButtonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Button
      variant="contained"
      startIcon={<PlayArrowIcon />}
      onClick={resumeRecording}
      sx={{
        bgcolor: isDarkMode ? color.success : color.success,
        "&:hover": {
          bgcolor: isDarkMode ? `${color.success}dd` : `${color.success}dd`,
          transform: "translateY(-2px)",
          boxShadow: `0 4px 8px ${color.success}40`,
        },
        transition: "all 0.2s ease",
        borderRadius: "24px",
        boxShadow: `0 2px 4px ${color.success}30`,
        px: { xs: 2, sm: 3 },
        py: { xs: 0.75, sm: 1 },
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        flexGrow: { xs: 1, sm: 0 },
      }}
    >
      Resume
    </Button>
  );
}

interface StopButtonProps {
  stopRecording: () => void;
}

export function StopButton({ stopRecording }: StopButtonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Button
      variant="contained"
      startIcon={<StopIcon />}
      onClick={stopRecording}
      sx={{
        bgcolor: isDarkMode ? color.error : color.error,
        "&:hover": {
          bgcolor: isDarkMode ? `${color.error}dd` : `${color.error}dd`,
          transform: "translateY(-2px)",
          boxShadow: `0 4px 8px ${color.error}40`,
        },
        transition: "all 0.2s ease",
        borderRadius: "24px",
        boxShadow: `0 2px 4px ${color.error}30`,
        px: { xs: 2, sm: 3 },
        py: { xs: 0.75, sm: 1 },
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        flexGrow: { xs: 1, sm: 0 },
      }}
    >
      Stop
    </Button>
  );
}
