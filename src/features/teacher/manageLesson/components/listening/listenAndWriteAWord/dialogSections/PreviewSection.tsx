import { Typography, Box, Paper, Alert } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ListenAndWriteAWord } from "interfaces";
import SentencePreviewField from "../SentencePreviewField";

interface PreviewSectionProps {
  formData: ListenAndWriteAWord;
  sentenceWords: string[];
}

export default function PreviewSection({
  formData,
  sentenceWords,
}: PreviewSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
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
        ) : formData.correctAnswer.trim() === "" ? (
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
            Enter the missing word to complete the preview
          </Alert>
        ) : (
          <SentencePreviewField
            sentence={formData.sentence}
            missingIndex={formData.missingIndex}
            correctAnswer={formData.correctAnswer}
          />
        )}
      </Paper>
    </>
  );
}
