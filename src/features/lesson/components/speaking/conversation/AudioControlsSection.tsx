import { Box, Stack } from "@mui/material";
import { SpeakingConversation } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import RecordingStatusIndicator from "./RecordingStatusIndicator";
import CharacterControls from "./CharacterControls";
import OtherCharacterControls from "./OtherCharacterControls";

interface AudioControlsSectionProps {
  item: SpeakingConversation;
  isSelectedCharacter: boolean;
  isCurrentlyRecording: boolean;
  isCurrentlyPlaying: boolean;
  hasRecording: boolean;
  userRecordings: Record<number, string>;
  startRecording: (id: number) => void;
  stopRecording: (id: number) => void;
  deleteRecording: (id: number) => void;
  togglePlayAudio: (id: number, url: string) => void;
}

export default function AudioControlsSection({
  item,
  isSelectedCharacter,
  isCurrentlyRecording,
  isCurrentlyPlaying,
  hasRecording,
  userRecordings,
  startRecording,
  stopRecording,
  deleteRecording,
  togglePlayAudio,
}: AudioControlsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        pb: isSelectedCharacter && hasRecording ? 1 : 2,
      }}
    >
      <RecordingStatusIndicator isRecording={isCurrentlyRecording} />

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          borderTop: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pt: 1.5,
          mt: 1,
        }}
      >
        {isSelectedCharacter ? (
          <CharacterControls
            id={item.id}
            isCurrentlyRecording={isCurrentlyRecording}
            hasRecording={hasRecording}
            isCurrentlyPlaying={isCurrentlyPlaying}
            userRecordings={userRecordings}
            startRecording={startRecording}
            stopRecording={stopRecording}
            deleteRecording={deleteRecording}
            togglePlayAudio={togglePlayAudio}
          />
        ) : (
          <OtherCharacterControls
            id={item.id}
            audioUrl={item.audioUrl}
            isCurrentlyPlaying={isCurrentlyPlaying}
            togglePlayAudio={togglePlayAudio}
          />
        )}
      </Stack>
    </Box>
  );
}
