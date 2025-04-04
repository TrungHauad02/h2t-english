import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
  Slider,
  Stack,
  Divider,
  Alert,
  InputAdornment,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";
import AudioRecorder from "./AudioRecorder";
import SentencePreviewField from "./SentencePreviewField";

interface ExerciseFormProps {
  formData: ListenAndWriteAWord;
  onChange: (name: keyof ListenAndWriteAWord, value: any) => void;
  disabled?: boolean;
}

export function ExerciseForm({
  formData,
  onChange,
  disabled = false,
}: ExerciseFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formData.sentence) {
      const words = formData.sentence.trim().split(" ");
      setSentenceWords(words);

      // Validate missingIndex
      if (formData.missingIndex > words.length) {
        onChange("missingIndex", Math.max(0, words.length));
      }
    } else {
      setSentenceWords([]);
    }
  }, [formData.sentence]);

  const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange("sentence", value);

    if (!value.trim()) {
      setError("Sentence cannot be empty");
    } else {
      setError(null);
    }
  };

  const handleMissingIndexChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const value = newValue as number;
    onChange("missingIndex", value);
  };

  // Now the missing index can be from 0 to sentence.length (inclusive)
  // because we're inserting the word at that position, not replacing
  const maxMissingIndex = sentenceWords.length;
  const isValidMissingIndex =
    sentenceWords.length > 0 &&
    formData.missingIndex >= 0 &&
    formData.missingIndex <= sentenceWords.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.teal300 : color.teal700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ fontSize: "1.2rem" }}>
            🎤
          </Box>
          Audio Recording
        </Typography>
        <AudioRecorder
          audioBase64={formData.audio}
          onAudioChange={(base64) => onChange("audio", base64)}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.teal300 : color.teal700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ fontSize: "1.2rem" }}>
            ✏️
          </Box>
          Sentence Configuration
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Sentence"
            fullWidth
            multiline
            rows={2}
            value={formData.sentence}
            onChange={handleSentenceChange}
            disabled={disabled}
            error={!!error}
            helperText={error || "Enter the sentence WITHOUT the missing word"}
            InputProps={{
              sx: {
                backgroundColor: isDarkMode ? color.gray700 : "white",
                color: isDarkMode ? color.white : color.gray900,
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Typography
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              Insert Missing Word Position:
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              {formData.missingIndex}
            </Typography>
          </Stack>

          <Slider
            value={formData.missingIndex}
            min={0}
            max={maxMissingIndex}
            step={1}
            onChange={handleMissingIndexChange}
            disabled={disabled || sentenceWords.length === 0}
            marks
            valueLabelDisplay="auto"
            sx={{
              color: color.teal600,
              "& .MuiSlider-thumb": {
                height: 18,
                width: 18,
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              display: "block",
              mt: 1,
            }}
          >
            Select the position where the missing word should be inserted (from
            0 to {maxMissingIndex})
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              display: "block",
              mt: 1,
            }}
          >
            <strong>Note:</strong> Position 0 means before the first word,
            position 1 means after the first word, etc.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Word to Insert"
            fullWidth
            value={formData.correctAnswer}
            onChange={(e) => onChange("correctAnswer", e.target.value)}
            disabled={disabled || sentenceWords.length === 0}
            error={!formData.correctAnswer && isValidMissingIndex}
            helperText={
              !isValidMissingIndex
                ? "Add a valid sentence and select a valid position first"
                : "Enter the word that students need to identify and insert in the sentence"
            }
            InputProps={{
              startAdornment: isValidMissingIndex ? (
                <InputAdornment position="start">
                  {formData.missingIndex}:
                </InputAdornment>
              ) : undefined,
              sx: {
                backgroundColor: isDarkMode ? color.gray700 : "white",
                color: isDarkMode ? color.white : color.gray900,
              },
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.teal300 : color.teal700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ fontSize: "1.2rem" }}>
            👁️
          </Box>
          Preview
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
          }}
        >
          {!formData.sentence || sentenceWords.length === 0 ? (
            <Alert
              severity="info"
              sx={{
                backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                color: isDarkMode ? color.gray200 : color.gray800,
                ".MuiAlert-icon": {
                  color: isDarkMode ? color.teal300 : color.teal700,
                },
              }}
            >
              Enter a sentence to see the preview
            </Alert>
          ) : !isValidMissingIndex ? (
            <Alert
              severity="warning"
              sx={{
                backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                color: isDarkMode ? color.gray200 : color.gray800,
                ".MuiAlert-icon": {
                  color: isDarkMode ? color.warning : color.warning,
                },
              }}
            >
              Select a valid insertion position
            </Alert>
          ) : !formData.correctAnswer ? (
            <Alert
              severity="warning"
              sx={{
                backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                color: isDarkMode ? color.gray200 : color.gray800,
                ".MuiAlert-icon": {
                  color: isDarkMode ? color.warning : color.warning,
                },
              }}
            >
              Enter the word to insert
            </Alert>
          ) : (
            <SentencePreviewField
              sentence={formData.sentence}
              missingIndex={formData.missingIndex}
              correctAnswer={formData.correctAnswer}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ExerciseForm;
