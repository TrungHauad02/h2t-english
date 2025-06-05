import { Box, Typography, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RefreshIcon from "@mui/icons-material/Refresh";
import SendIcon from "@mui/icons-material/Send";
import LoadingSubmit from "../LoadingSubmit";
import { useState } from "react";

interface AudioPlayerSubmissionProps {
  audioUrl: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isSubmitting: boolean;
  resetRecording: () => void;
  submitRecording: () => void;
}

export default function AudioPlayerSubmission({
  audioUrl,
  audioRef,
  isSubmitting,
  resetRecording,
  submitRecording,
}: AudioPlayerSubmissionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isShowingLoadingSubmit, setIsShowingLoadingSubmit] =
    useState<boolean>(false);

  const onComplete = () => {
    setIsShowingLoadingSubmit(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: isDarkMode ? color.gray700 : color.gray200,
        borderRadius: 2,
        mb: 3,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h6"
        mb={2}
        sx={{ color: isDarkMode ? color.white : color.gray900 }}
      >
        Your Recording
      </Typography>

      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: isDarkMode ? color.gray600 : color.gray100,
          borderRadius: 1,
        }}
      >
        <audio
          ref={audioRef}
          src={audioUrl}
          controls
          style={{ width: "100%" }}
        />
      </Box>

      <Typography
        variant="body2"
        mb={2}
        sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
      >
        Review your recording before submission. You can re-record if needed.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={resetRecording}
          sx={{
            borderColor: isDarkMode ? color.gray400 : color.gray500,
            color: isDarkMode ? color.gray300 : color.gray700,
            "&:hover": {
              borderColor: isDarkMode ? color.gray300 : color.gray600,
              bgcolor: isDarkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={submitRecording}
          disabled={isSubmitting}
          sx={{
            bgcolor: isDarkMode ? color.emerald700 : color.btnSubmitBg,
            "&:hover": {
              bgcolor: isDarkMode ? color.emerald600 : color.btnSubmitHoverBg,
            },
            transition: "all 0.2s ease",
          }}
        >
          Submit
        </Button>
      </Box>

      {isShowingLoadingSubmit && (
        <LoadingSubmit isLoading={isSubmitting} onComplete={onComplete} />
      )}
    </Box>
  );
}
