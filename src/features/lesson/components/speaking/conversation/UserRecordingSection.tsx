import { Box, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { RefObject } from "react";

interface UserRecordingSectionProps {
  itemId: number;
  userRecordings: Record<number, string>;
  audioRef: RefObject<HTMLAudioElement | null>;
  playingAudio: number | null;
  togglePlayAudio: (id: number, url: string) => void;
}

export default function UserRecordingSection({
  itemId,
  userRecordings,
  audioRef,
  playingAudio,
  togglePlayAudio,
}: UserRecordingSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
        borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: "block",
          color: isDarkMode ? color.gray400 : color.gray600,
          mb: 0.5,
          fontWeight: 500,
        }}
      >
        Your recording:
      </Typography>

      <audio
        ref={audioRef}
        src={userRecordings[itemId]}
        controls
        style={{
          width: "100%",
          height: 40,
          borderRadius: 8,
          backgroundColor: isDarkMode ? color.gray700 : color.white,
        }}
        onEnded={() => {
          // Handle playback ended
          if (playingAudio === itemId) {
            togglePlayAudio(itemId, userRecordings[itemId]);
          }
        }}
      />
    </Box>
  );
}
