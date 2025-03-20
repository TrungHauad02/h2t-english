import { Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

interface StartRecordingButtonProps {
  startRecording: () => Promise<void>;
}

export default function StartRecordingButton({
  startRecording,
}: StartRecordingButtonProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Button
      variant="contained"
      startIcon={<KeyboardVoiceIcon />}
      onClick={startRecording}
      sx={{
        bgcolor: isDarkMode ? color.emerald700 : color.emerald600,
        "&:hover": {
          bgcolor: isDarkMode ? color.emerald600 : color.emerald500,
          transform: "translateY(-2px)",
          boxShadow: `0 4px 8px ${color.emerald600}40`,
        },
        transition: "all 0.2s ease",
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1 },
        borderRadius: "24px",
        boxShadow: `0 2px 4px ${color.emerald600}30`,
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      Start Recording
    </Button>
  );
}
