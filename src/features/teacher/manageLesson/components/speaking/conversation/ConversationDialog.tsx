import { Grid, Button, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { useState, useRef, useEffect, useCallback } from "react";
import { SpeakingConversation, Voice } from "interfaces";
import { WEDialog } from "components/display";
import { AudioPreviewPlayer, ConversationForm, VoiceSelector } from "./dialog";

interface ConversationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editData: SpeakingConversation;
  handleInputChange: (field: keyof SpeakingConversation, value: any) => void;
  voices: Voice[];
  onGenerateAudio: (text: string, voice: string) => void;
  isGenerating: boolean;
}

export default function ConversationDialog({
  open,
  onClose,
  onSave,
  editData,
  handleInputChange,
  voices,
  onGenerateAudio,
  isGenerating,
}: ConversationDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [selectedVoice, setSelectedVoice] = useState<string>(
    voices.length > 0 ? voices[0].voice : ""
  );

  // Audio playback state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Cleanup function
  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleAudioEnded);
      audioRef.current.removeEventListener("error", handleAudioError);
      audioRef.current.removeEventListener(
        "canplaythrough",
        handleCanPlayThrough
      );
      audioRef.current.removeEventListener("loadstart", handleLoadStart);
      audioRef.current = null;
    }
    setIsPlaying(false);
    setAudioError(false);
    setIsAudioLoading(false);
    setAudioProgress(0);
  }, []);

  // Event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    setAudioProgress(0);
  }, []);

  const handleAudioError = useCallback((e: Event) => {
    console.error("Audio error:", e);
    setAudioError(true);
    setIsPlaying(false);
    setIsAudioLoading(false);
  }, []);

  const handleCanPlayThrough = useCallback(() => {
    setIsAudioLoading(false);
    setAudioError(false);
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsAudioLoading(true);
  }, []);

  // Reset audio when audioUrl changes
  useEffect(() => {
    cleanupAudio();
  }, [editData.audioUrl, cleanupAudio]);

  // Reset audio state when dialog closes
  useEffect(() => {
    if (!open) {
      cleanupAudio();
    }
  }, [open, cleanupAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Handle audio playback
  const handlePlayAudio = useCallback(async () => {
    if (!editData.audioUrl) {
      console.error("No audio URL provided");
      return;
    }

    // If currently playing, pause it
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      // Clean up any existing audio
      cleanupAudio();

      // Create new audio element
      const audio = new Audio();

      // Set up event listeners before setting src
      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleAudioEnded);
      audio.addEventListener("error", handleAudioError);

      // Set crossOrigin if needed (for CORS)
      audio.crossOrigin = "anonymous";

      // Set the source
      audio.src = editData.audioUrl;

      // Store reference
      audioRef.current = audio;

      // Load the audio
      audio.load();

      // Try to play
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch((error) => {
            console.error("Play promise rejected:", error);
            setAudioError(true);
            setIsAudioLoading(false);
          });
      }
    } catch (error) {
      console.error("Error setting up audio:", error);
      setAudioError(true);
      setIsAudioLoading(false);
    }
  }, [
    editData.audioUrl,
    isPlaying,
    cleanupAudio,
    handleTimeUpdate,
    handleAudioEnded,
    handleAudioError,
    handleCanPlayThrough,
    handleLoadStart,
  ]);

  return (
    <WEDialog
      open={open}
      onCancel={onClose}
      onOk={onSave}
      disableButtons={!editData.audioUrl}
      title={editData.id ? "Edit Conversation" : "Add New Conversation"}
      sx={{
        width: { xs: "95%", sm: "80%", md: "70%" },
        maxWidth: "900px",
        "& .MuiDialog-paper": {
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: isDarkMode
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.8)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Grid container spacing={3}>
        {/* Conversation Form */}
        <Grid item xs={12}>
          <ConversationForm
            editData={editData}
            handleInputChange={handleInputChange}
          />
        </Grid>

        {/* Audio Player - Show when audioUrl exists */}
        {editData.audioUrl && (
          <Grid item xs={12}>
            <AudioPreviewPlayer
              isPlaying={isPlaying}
              audioError={audioError}
              isAudioLoading={isAudioLoading}
              handlePlayAudio={handlePlayAudio}
              audioProgress={audioProgress}
            />
          </Grid>
        )}

        {/* Voice Selection and Generate Audio */}
        <Grid item xs={12} md={8}>
          <VoiceSelector
            voices={voices}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Button
            variant="contained"
            disabled={isGenerating || !editData.content || !selectedVoice}
            onClick={() => onGenerateAudio(editData.content, selectedVoice)}
            startIcon={
              isGenerating ? (
                <CircularProgress size={20} />
              ) : (
                <RecordVoiceOverIcon />
              )
            }
            sx={{
              backgroundColor: isDarkMode
                ? color.btnSubmitBg
                : color.btnSubmitBg,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? color.btnSubmitHoverBg
                  : color.btnSubmitHoverBg,
                transform: "translateY(-2px)",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(16, 185, 129, 0.3)"
                  : "0 4px 12px rgba(16, 185, 129, 0.2)",
              },
              "&.Mui-disabled": {
                backgroundColor: isDarkMode ? color.gray700 : color.gray300,
                color: isDarkMode ? color.gray500 : color.gray500,
              },
              transition: "all 0.3s ease",
              height: "48px",
              borderRadius: "0.75rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: isDarkMode
                ? "0 2px 6px rgba(16, 185, 129, 0.2)"
                : "0 2px 6px rgba(16, 185, 129, 0.1)",
            }}
          >
            {isGenerating ? "Generating..." : "Generate Audio"}
          </Button>
        </Grid>
      </Grid>
    </WEDialog>
  );
}
