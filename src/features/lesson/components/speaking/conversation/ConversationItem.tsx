import { Paper, Box } from "@mui/material";
import { SpeakingConversation } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import CharacterInfoSection from "./CharacterInfoSection";
import AudioControlsSection from "./AudioControlsSection";
import UserRecordingSection from "./UserRecordingSection";
import { useRef } from "react";

interface ConversationItemProps {
  item: SpeakingConversation;
  isSelectedCharacter: boolean;
  isRecording: number | null;
  playingAudio: number | null;
  userRecordings: Record<number, string>;
  startRecording: (id: number) => void;
  stopRecording: (id: number) => void;
  deleteRecording: (id: number) => void;
  togglePlayAudio: (id: number, url: string) => void;
}

export default function ConversationItem({
  item,
  isSelectedCharacter,
  isRecording,
  playingAudio,
  userRecordings,
  startRecording,
  stopRecording,
  deleteRecording,
  togglePlayAudio,
}: ConversationItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Dynamic colors based on character selection and dark mode
  const getColors = () => {
    if (isSelectedCharacter) {
      return {
        border: isDarkMode ? color.teal400 : color.teal600,
        background: isDarkMode
          ? "rgba(20, 184, 166, 0.1)"
          : "rgba(13, 148, 136, 0.05)",
        highlight: isDarkMode ? color.teal300 : color.teal600,
        avatar: isDarkMode ? color.teal600 : color.teal500,
        chipBg: isDarkMode ? color.teal800 : color.teal100,
        chipText: isDarkMode ? color.teal100 : color.teal800,
      };
    } else {
      return {
        border: isDarkMode ? color.gray600 : color.gray300,
        background: isDarkMode ? color.gray800 : color.gray50,
        highlight: isDarkMode ? color.gray300 : color.gray700,
        avatar: isDarkMode ? color.gray600 : color.gray400,
        chipBg: isDarkMode ? color.gray700 : color.gray200,
        chipText: isDarkMode ? color.gray200 : color.gray700,
      };
    }
  };

  const colors = getColors();
  const isCurrentlyRecording = isRecording === item.id;
  const hasRecording = Boolean(userRecordings[item.id]);
  const isCurrentlyPlaying = playingAudio === item.id;

  // Sync audio element with playback state
  if (audioRef.current) {
    if (isCurrentlyPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }

  return (
    <Paper
      elevation={isSelectedCharacter ? 3 : 1}
      sx={{
        bgcolor: colors.background,
        borderRadius: 2,
        overflow: "hidden",
        borderLeft: `4px solid ${colors.border}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
        mb: 2.5,
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundImage: isSelectedCharacter
            ? `linear-gradient(to right, ${
                isDarkMode
                  ? "rgba(15, 118, 110, 0.2)"
                  : "rgba(20, 184, 166, 0.05)"
              }, transparent)`
            : "none",
        }}
      >
        <CharacterInfoSection
          item={item}
          isSelectedCharacter={isSelectedCharacter}
          colors={colors}
        />

        <AudioControlsSection
          item={item}
          isSelectedCharacter={isSelectedCharacter}
          isCurrentlyRecording={isCurrentlyRecording}
          isCurrentlyPlaying={isCurrentlyPlaying}
          hasRecording={hasRecording}
          userRecordings={userRecordings}
          startRecording={startRecording}
          stopRecording={stopRecording}
          deleteRecording={deleteRecording}
          togglePlayAudio={togglePlayAudio}
        />
      </Box>

      {isSelectedCharacter && hasRecording && (
        <UserRecordingSection
          itemId={item.id}
          userRecordings={userRecordings}
          audioRef={audioRef}
          playingAudio={playingAudio}
          togglePlayAudio={togglePlayAudio}
        />
      )}
    </Paper>
  );
}
