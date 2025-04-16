import { Paper, Alert } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Speaking } from "interfaces";
import useColor from "theme/useColor";
import {
  AssessmentResultsCard,
  AudioPlayerSubmission,
  AudioVisualizer,
  Instructions,
  TimerControlsSection,
  TopicSection,
  useSpeakingTopicSection,
} from "./topic";

export default function SpeakingTopicSection({ data }: { data: Speaking }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useSpeakingTopicSection(data);

  return (
    <Paper
      elevation={3}
      sx={{
        mx: { xs: 0, md: 2 },
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Topic Section */}
      <TopicSection topic={data.topic} />

      {/* Error Message */}
      {hooks.errorMessage && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => hooks.setErrorMessage("")}
        >
          {hooks.errorMessage}
        </Alert>
      )}

      {/* Timer and Controls */}
      <TimerControlsSection
        data={data}
        isRecording={hooks.isRecording}
        isPaused={hooks.isPaused}
        timeLeft={hooks.timeLeft}
        audioUrl={hooks.audioUrl}
        microphoneAccess={hooks.microphoneAccess}
        isLoading={hooks.isLoading}
        isMuted={hooks.isMuted}
        requestMicrophoneAccess={hooks.requestMicrophoneAccess}
        startRecording={hooks.startRecording}
        pauseRecording={hooks.pauseRecording}
        resumeRecording={hooks.resumeRecording}
        stopRecording={hooks.stopRecording}
        toggleMute={hooks.toggleMute}
      />

      {/* Audio Visualizer */}
      {hooks.isRecording && (
        <AudioVisualizer
          isRecording={hooks.isRecording}
          audioLevel={hooks.audioLevel}
        />
      )}

      {/* Audio Player and Submission */}
      {hooks.audioUrl && !hooks.assessmentResult && (
        <AudioPlayerSubmission
          audioUrl={hooks.audioUrl}
          audioRef={hooks.audioRef}
          isSubmitting={hooks.isSubmitting}
          resetRecording={hooks.resetRecording}
          submitRecording={hooks.submitRecording}
        />
      )}

      {/* Assessment Results */}
      {hooks.assessmentResult && (
        <AssessmentResultsCard
          score={parseInt(hooks.assessmentResult.score)}
          feedback={hooks.assessmentResult.feedback}
          strengths={hooks.assessmentResult.strengths}
          areas_to_improve={hooks.assessmentResult.areas_to_improve}
          transcript={hooks.assessmentResult.transcript}
          resetRecording={hooks.resetRecording}
        />
      )}

      {/* Instructions */}
      <Instructions duration={data.duration} />
    </Paper>
  );
}
