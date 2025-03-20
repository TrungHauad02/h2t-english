import { Box } from "@mui/material";
import AccessMicrophoneButton from "./AccessMicrophoneButton";
import LoadingButton from "./LoadingButton";
import StartRecordingButton from "./StartRecordingButton";
import {
  MuteButton,
  PauseButton,
  ResumeButton,
  StopButton,
} from "./ControlButtonsSecondary";

interface ControlButtonsProps {
  isRecording: boolean;
  isPaused: boolean;
  audioUrl: string;
  microphoneAccess: boolean | null;
  isLoading: boolean;
  isMuted: boolean;
  isXs: boolean;
  requestMicrophoneAccess: () => Promise<void>;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  toggleMute: () => void;
}

export default function ControlButtons({
  isRecording,
  isPaused,
  audioUrl,
  microphoneAccess,
  isLoading,
  isMuted,
  isXs,
  requestMicrophoneAccess,
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  toggleMute,
}: ControlButtonsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, sm: 1.5 },
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "flex-end" },
        width: { xs: "100%", md: "auto" },
        mt: { xs: 1, md: 0 },
      }}
    >
      {!isRecording && !audioUrl && !microphoneAccess && !isLoading && (
        <AccessMicrophoneButton
          requestMicrophoneAccess={requestMicrophoneAccess}
        />
      )}

      {isLoading && <LoadingButton />}

      {microphoneAccess && !isRecording && !audioUrl && (
        <StartRecordingButton startRecording={startRecording} />
      )}

      {isRecording && !isPaused && (
        <>
          <PauseButton pauseRecording={pauseRecording} />

          <MuteButton toggleMute={toggleMute} isMuted={isMuted} isXs={isXs} />
        </>
      )}

      {isRecording && isPaused && (
        <ResumeButton resumeRecording={resumeRecording} isXs={isXs} />
      )}

      {isRecording && <StopButton stopRecording={stopRecording} />}
    </Box>
  );
}
