import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";
import {
  AudioSection,
  SentenceConfigSection,
  PreviewSection,
} from "./dialogSections";
import { base64ToBlobUrl } from "utils/convert";

interface ExerciseDialogProps {
  open: boolean;
  exercise: ListenAndWriteAWord;
  onClose: () => void;
  onSave: (exercise: ListenAndWriteAWord) => void;
}

export default function ExerciseDialog({
  open,
  exercise,
  onClose,
  onSave,
}: ExerciseDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState<ListenAndWriteAWord>(exercise);
  const [isSaving, setIsSaving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [sentenceWords, setSentenceWords] = useState<string[]>(
    formData.sentence ? formData.sentence.split(" ") : []
  );

  const isNewExercise = exercise.id === 0;

  const handleChange = (name: keyof ListenAndWriteAWord, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update sentence words when sentence changes
    if (name === "sentence") {
      const words = value.trim().split(" ");
      setSentenceWords(words);

      // Adjust missingIndex if necessary
      if (formData.missingIndex >= words.length) {
        setFormData((prev) => ({
          ...prev,
          missingIndex: Math.max(0, words.length - 1),
        }));
      }
    }
  };

  const handleMissingIndexChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    handleChange("missingIndex", newValue as number);
  };

  const handlePlayAudio = () => {
    if (!audioElement && formData.audio) {
      const audioUrl = base64ToBlobUrl(formData.audio, "audio/wav");
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play();
      setIsPlaying(true);
      setAudioElement(audio);
    } else if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.currentTime = 0;
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const isValidForm = () => {
    return (
      formData.sentence.trim() !== "" &&
      formData.correctAnswer.trim() !== "" &&
      formData.audio !== "" &&
      formData.missingIndex >= 0 &&
      formData.missingIndex < sentenceWords.length
    );
  };

  return (
    <Dialog
      open={open}
      onClose={isSaving ? undefined : onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "12px" },
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray300
          }`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              backgroundColor: isDarkMode ? color.teal700 : color.teal100,
              color: isDarkMode ? color.white : color.teal800,
            }}
          >
            🎧
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.white : color.gray900,
            }}
          >
            {isNewExercise
              ? "Add New Exercise"
              : `Edit Exercise #${exercise.serial}`}
          </Typography>
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={isSaving}
          aria-label="close"
          size="small"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: { xs: 2, sm: 3 },
          borderColor: isDarkMode ? color.gray700 : color.gray300,
        }}
      >
        <Grid container spacing={3}>
          {/* Audio Section */}
          <Grid item xs={12}>
            <AudioSection
              audio={formData.audio}
              isPlaying={isPlaying}
              handlePlayAudio={handlePlayAudio}
              handleChange={handleChange}
              isSaving={isSaving}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Sentence Configuration */}
          <Grid item xs={12}>
            <SentenceConfigSection
              formData={formData}
              sentenceWords={sentenceWords}
              handleChange={handleChange}
              handleMissingIndexChange={handleMissingIndexChange}
              isSaving={isSaving}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Preview */}
          <Grid item xs={12}>
            <PreviewSection formData={formData} sentenceWords={sentenceWords} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          disabled={isSaving}
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            "&:hover": {
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            },
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSaving || !isValidForm()}
          variant="contained"
          sx={{
            backgroundColor: color.btnSubmitBg,
            "&:hover": {
              backgroundColor: color.btnSubmitHoverBg,
            },
            textTransform: "none",
          }}
        >
          {isSaving ? "Saving..." : "Save Exercise"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
