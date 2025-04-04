import { Box, Paper, Tooltip, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface SentencePreviewFieldProps {
  sentence: string;
  missingIndex: number;
  correctAnswer: string;
}

export default function SentencePreviewField({
  sentence,
  missingIndex,
  correctAnswer,
}: SentencePreviewFieldProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!sentence) return null;

  // Split the sentence into an array of words
  const words = sentence.split(" ");

  // Create an array for the complete sentence (with the word inserted)
  const completeWords = [...words];
  completeWords.splice(missingIndex, 0, correctAnswer);

  // Create a copy for the incomplete display (with blank)
  const incompleteWords = [...words];
  incompleteWords.splice(missingIndex, 0, "________");

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 600,
          mb: 2,
          color: isDarkMode ? color.gray300 : color.gray700,
        }}
      >
        Complete Sentence:
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: "8px",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.6,
            color: isDarkMode ? color.white : color.gray800,
          }}
        >
          {completeWords.map((word, index) => (
            <Box
              component="span"
              key={index}
              sx={{
                backgroundColor:
                  index === missingIndex
                    ? isDarkMode
                      ? color.teal700
                      : color.teal100
                    : "transparent",
                color:
                  index === missingIndex
                    ? isDarkMode
                      ? color.white
                      : color.teal900
                    : "inherit",
                px: index === missingIndex ? 1 : 0,
                py: index === missingIndex ? 0.5 : 0,
                borderRadius: index === missingIndex ? "4px" : 0,
                fontWeight: index === missingIndex ? 600 : "inherit",
                mx: 0.5,
              }}
            >
              {word}
            </Box>
          ))}
        </Typography>
      </Paper>

      <Typography
        sx={{
          fontWeight: 600,
          mb: 2,
          color: isDarkMode ? color.gray300 : color.gray700,
        }}
      >
        Student View (Word Missing):
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "8px",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.6,
            color: isDarkMode ? color.white : color.gray800,
          }}
        >
          {incompleteWords.map((word, index) => (
            <Box
              component="span"
              key={index}
              sx={{
                backgroundColor:
                  word === "________"
                    ? isDarkMode
                      ? color.emerald900
                      : color.emerald50
                    : "transparent",
                color:
                  word === "________"
                    ? isDarkMode
                      ? color.emerald300
                      : color.emerald800
                    : "inherit",
                px: word === "________" ? 1.5 : 0,
                py: word === "________" ? 0.5 : 0,
                borderRadius: word === "________" ? "4px" : 0,
                borderBottom:
                  word === "________"
                    ? `2px dashed ${
                        isDarkMode ? color.emerald500 : color.emerald500
                      }`
                    : "none",
                fontWeight: word === "________" ? 600 : "inherit",
                fontStyle: word === "________" ? "italic" : "normal",
                mx: 0.5,
              }}
            >
              {word === "________" ? (
                <Tooltip
                  title={`Correct answer: ${correctAnswer}`}
                  arrow
                  placement="top"
                >
                  <span>{word}</span>
                </Tooltip>
              ) : (
                word
              )}
            </Box>
          ))}
        </Typography>
      </Paper>
    </Box>
  );
}
