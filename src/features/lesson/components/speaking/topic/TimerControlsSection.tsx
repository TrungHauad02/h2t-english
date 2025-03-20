import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Speaking } from "interfaces";
import { useState } from "react";
import { ControlButtons, TimerDisplay, TimerInfo } from "./timerControls";

interface TimerControlsSectionProps {
  data: Speaking;
  isRecording: boolean;
  isPaused: boolean;
  timeLeft: number;
  audioUrl: string;
  microphoneAccess: boolean | null;
  isLoading: boolean;
  isMuted: boolean;
  requestMicrophoneAccess: () => Promise<void>;
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  toggleMute: () => void;
}

export default function TimerControlsSection({
  data,
  isRecording,
  isPaused,
  timeLeft,
  audioUrl,
  microphoneAccess,
  isLoading,
  isMuted,
  requestMicrophoneAccess,
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  toggleMute,
}: TimerControlsSectionProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [timeDisplay, setTimeDisplay] = useState<"digital" | "visual">(
    "digital"
  );

  const percentRemaining = (timeLeft / data.duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimeDisplay = () => {
    setTimeDisplay((prev) => (prev === "digital" ? "visual" : "digital"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        mb: { xs: 2, sm: 3, md: 4 },
        gap: { xs: 1, sm: 2 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          mb: { xs: 1, sm: 2, md: 0 },
          gap: { xs: 2, sm: 3 },
          width: { xs: "100%", md: "auto" },
        }}
      >
        <TimerDisplay
          timeDisplay={timeDisplay}
          toggleTimeDisplay={toggleTimeDisplay}
          percentRemaining={percentRemaining}
          minutes={minutes}
          seconds={seconds}
          isXs={isXs}
          isMd={isMd}
        />

        <TimerInfo
          percentRemaining={percentRemaining}
          timeLeft={timeLeft}
          isRecording={isRecording}
          isPaused={isPaused}
          isXs={isXs}
        />
      </Box>

      <ControlButtons
        isRecording={isRecording}
        isPaused={isPaused}
        audioUrl={audioUrl}
        microphoneAccess={microphoneAccess}
        isLoading={isLoading}
        isMuted={isMuted}
        isXs={isXs}
        requestMicrophoneAccess={requestMicrophoneAccess}
        startRecording={startRecording}
        pauseRecording={pauseRecording}
        resumeRecording={resumeRecording}
        stopRecording={stopRecording}
        toggleMute={toggleMute}
      />
    </Box>
  );
}
