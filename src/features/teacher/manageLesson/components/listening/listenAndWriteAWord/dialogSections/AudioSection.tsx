import { Typography, Box, Button } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";
import { WEAudioInputVer2 } from "components/input";

interface AudioSectionProps {
  audio: string;
  isPlaying: boolean;
  handlePlayAudio: () => void;
  handleChange: (name: keyof ListenAndWriteAWord, value: any) => void;
  isSaving: boolean;
}

export default function AudioSection({
  audio,
  isPlaying,
  handlePlayAudio,
  handleChange,
  isSaving,
}: AudioSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.teal300 : color.teal700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box component="span" sx={{ fontSize: "1.2rem" }}>
          🎤
        </Box>
        Audio Recording
      </Typography>

      <WEAudioInputVer2
        value={audio}
        onChange={(base64: string) => handleChange("audio", base64)}
        label=""
        disabled={isSaving}
        required
      />

      {audio && (
        <Button
          variant="outlined"
          onClick={handlePlayAudio}
          disabled={isSaving || !audio}
          sx={{
            mt: 2,
            borderColor: isDarkMode ? color.teal700 : color.teal500,
            color: isDarkMode ? color.teal300 : color.teal700,
            "&:hover": {
              borderColor: isDarkMode ? color.teal600 : color.teal600,
              backgroundColor: isDarkMode
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.04)",
            },
          }}
        >
          {isPlaying ? "Pause Audio" : "Play Audio"}
        </Button>
      )}
    </>
  );
}
