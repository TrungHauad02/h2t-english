import { Box, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SentencePreviewProps {
  sentence: string;
  missingIndex: number;
  correctAnswer: string;
  highlight?: boolean;
  truncate?: boolean;
}

export default function SentencePreview({
  sentence,
  missingIndex,
  correctAnswer,
  highlight = false,
  truncate = false,
}: SentencePreviewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Don't try to process empty sentences
  if (!sentence) return <Typography>No sentence data</Typography>;

  // Split the sentence into an array of words
  const words = sentence.split(" ");

  // Create an array for display with the missing word inserted
  const displayWords = [...words];
  displayWords.splice(missingIndex, 0, correctAnswer);

  // Get segments for display (especially for truncated view)
  const beforeMissing = words.slice(0, missingIndex).join(" ");
  const afterMissing = words.slice(missingIndex).join(" ");

  // If truncate is true and sentence is long, shorten it
  const maxLength = 60;
  const shouldTruncate =
    truncate &&
    beforeMissing.length + afterMissing.length + correctAnswer.length >
      maxLength;

  let displayBeforeMissing = beforeMissing;
  let displayAfterMissing = afterMissing;

  if (shouldTruncate) {
    if (beforeMissing.length > 25) {
      displayBeforeMissing = "..." + beforeMissing.slice(-25);
    }

    if (afterMissing.length > 25) {
      displayAfterMissing = afterMissing.slice(0, 25) + "...";
    }
  }

  return (
    <Box component="span" sx={{ display: "inline" }}>
      {displayBeforeMissing}{" "}
      <Box
        component="span"
        sx={{
          display: "inline-block",
          px: 1,
          py: 0.5,
          mx: 0.5,
          borderRadius: "4px",
          backgroundColor: highlight
            ? isDarkMode
              ? color.emerald800
              : color.emerald100
            : "transparent",
          color: highlight
            ? isDarkMode
              ? color.emerald200
              : color.emerald800
            : isDarkMode
            ? color.emerald400
            : color.emerald600,
          fontWeight: "bold",
          border: highlight
            ? `1px solid ${isDarkMode ? color.emerald600 : color.emerald300}`
            : `1px dashed ${isDarkMode ? color.gray500 : color.gray400}`,
        }}
      >
        {correctAnswer}
      </Box>{" "}
      {displayAfterMissing}
    </Box>
  );
}
