import { Tooltip, IconButton, Chip, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CharacterControlsProps {
  id: number;
  isCurrentlyRecording: boolean;
  hasRecording: boolean;
  isCurrentlyPlaying: boolean;
  userRecordings: Record<number, string>;
  startRecording: (id: number) => void;
  stopRecording: (id: number) => void;
  deleteRecording: (id: number) => void;
  togglePlayAudio: (id: number, url: string) => void;
}

export default function CharacterControls({
  id,
  isCurrentlyRecording,
  hasRecording,
  isCurrentlyPlaying,
  userRecordings,
  startRecording,
  stopRecording,
  deleteRecording,
  togglePlayAudio,
}: CharacterControlsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!hasRecording) {
    return (
      <Tooltip
        title={
          isCurrentlyRecording
            ? "Stop recording"
            : "Start recording"
        }
      >
        <IconButton
          sx={{
            bgcolor: isCurrentlyRecording
              ? color.red500
              : isDarkMode
              ? color.teal600
              : color.teal500,
            color: color.white,
            "&:hover": {
              bgcolor: isCurrentlyRecording
                ? color.red600
                : isDarkMode
                ? color.teal500
                : color.teal400,
            },
            boxShadow: 2,
            p: 1.5,
            width: 50,
            height: 50,
          }}
          onClick={() => {
            if (isCurrentlyRecording) {
              stopRecording(id);
            } else {
              startRecording(id);
            }
          }}
        >
          {isCurrentlyRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title={isCurrentlyPlaying ? "Pause" : "Play"}>
        <IconButton
          sx={{
            bgcolor: isDarkMode ? color.teal600 : color.teal500,
            color: color.white,
            "&:hover": {
              bgcolor: isDarkMode ? color.teal500 : color.teal400,
            },
            boxShadow: 2,
            p: 1.5,
          }}
          onClick={() =>
            togglePlayAudio(id, userRecordings[id])
          }
        >
          {isCurrentlyPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete recording">
        <IconButton
          color="error"
          sx={{
            bgcolor: isDarkMode
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(254, 226, 226, 0.7)",
            color: isDarkMode ? color.red400 : color.red600,
            "&:hover": {
              bgcolor: isDarkMode
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(254, 202, 202, 0.8)",
            },
          }}
          onClick={() => deleteRecording(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Chip
          label="Recorded"
          size="small"
          icon={<CheckCircleIcon sx={{ fontSize: "1rem" }} />}
          sx={{
            bgcolor: isDarkMode
              ? color.emerald800
              : color.emerald100,
            color: isDarkMode
              ? color.emerald100
              : color.emerald800,
            fontWeight: 500,
            borderRadius: 1.5,
            mr: 1,
            "& .MuiChip-icon": {
              color: isDarkMode
                ? color.emerald100
                : color.emerald800,
            },
          }}
        />

        <Tooltip title="Listen with controls">
          <HeadphonesIcon
            color="primary"
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
              fontSize: 18,
              mr: 0.5,
            }}
          />
        </Tooltip>
      </Box>
    </>
  );
}
