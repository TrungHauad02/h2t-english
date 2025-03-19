import { Box, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useState, useRef } from "react";
import { Voice } from "interfaces";

export default function AvailableVoices({ voices }: { voices: Voice[] }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handlePlayVoice = (voice: Voice) => {
    if (playingVoice) {
      audioRefs.current[playingVoice].pause();
      audioRefs.current[playingVoice].currentTime = 0;
    }

    if (playingVoice === voice.file) {
      setPlayingVoice(null);
      return;
    }

    if (!audioRefs.current[voice.file]) {
      const audio = new Audio(voice.file);
      audio.onended = () => setPlayingVoice(null);
      audioRefs.current[voice.file] = audio;
    }

    audioRefs.current[voice.file].play();
    setPlayingVoice(voice.file);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          color: isDarkMode ? color.teal300 : color.teal700,
        }}
      >
        <RecordVoiceOverIcon sx={{ mr: 1 }} />
        Available Voices
      </Typography>
      <Grid container spacing={2}>
        {voices.map((voice, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: "0.5rem",
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
              >
                {voice.voice}
              </Typography>
              <RecordVoiceOverIcon
                sx={{
                  color:
                    playingVoice === voice.file
                      ? isDarkMode
                        ? color.teal100
                        : color.teal800
                      : isDarkMode
                      ? color.teal300
                      : color.teal600,
                  fontSize: 20,
                  cursor: "pointer",
                  animation:
                    playingVoice === voice.file
                      ? "pulse 1.5s infinite"
                      : "none",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                    "100%": { opacity: 1 },
                  },
                }}
                onClick={() => handlePlayVoice(voice)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
