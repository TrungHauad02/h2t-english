import { Box } from "@mui/material";

interface SentenceDisplayProps {
  sentence: string;
  missingIndex: number;
  correctAnswer: string;
  showBlank?: boolean;
  highlightBgColor: string;
}

export default function SentenceDisplay({
  sentence,
  missingIndex,
  correctAnswer,
  showBlank = false,
  highlightBgColor,
}: SentenceDisplayProps) {
  if (showBlank) {
    const words = sentence.split(" ");

    return (
      <Box component="span">
        {words.map((word, index) => {
          if (index === missingIndex) {
            return (
              <Box
                component="span"
                key={index}
                sx={{
                  backgroundColor: highlightBgColor,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  mx: 0.5,
                  display: "inline-block",
                }}
              >
                ______
              </Box>
            );
          }
          return (
            <span key={index}>
              {index > 0 ? " " : ""}
              {word}
            </span>
          );
        })}
      </Box>
    );
  } else {
    const words = sentence.split(" ");
    const completeWords = [...words];

    if (missingIndex >= 0 && missingIndex <= words.length) {
      completeWords.splice(missingIndex, 0, correctAnswer);
    }

    return (
      <Box component="span">
        {completeWords.map((word, index) => {
          if (index === missingIndex && word === correctAnswer) {
            return (
              <Box
                component="span"
                key={index}
                sx={{
                  backgroundColor: highlightBgColor,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  mx: 0.5,
                  display: "inline-block",
                }}
              >
                {word}
              </Box>
            );
          }
          return (
            <span key={index}>
              {index > 0 ? " " : ""}
              {word}
            </span>
          );
        })}
      </Box>
    );
  }
}
