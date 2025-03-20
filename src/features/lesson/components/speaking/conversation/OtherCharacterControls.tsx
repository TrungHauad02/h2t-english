import { Tooltip, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface OtherCharacterControlsProps {
  id: number;
  audioUrl: string | undefined;
  isCurrentlyPlaying: boolean;
  togglePlayAudio: (id: number, url: string) => void;
}

export default function OtherCharacterControls({
  id,
  audioUrl,
  isCurrentlyPlaying,
  togglePlayAudio,
}: OtherCharacterControlsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Tooltip title={isCurrentlyPlaying ? "Pause" : "Play"}>
      <IconButton
        sx={{
          bgcolor: isDarkMode ? color.gray600 : color.gray300,
          color: isDarkMode ? color.gray300 : color.gray700,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray500 : color.gray400,
          },
          p: 1.5,
        }}
        onClick={() => togglePlayAudio(id, audioUrl || "")}
        disabled={!audioUrl}
      >
        {isCurrentlyPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Tooltip>
  );
}
