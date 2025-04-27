import { Box, TextField, Chip, Zoom } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ParagraphContentProps {
  displayWords: string[];
  hooks: any; // Using any here as the hooks object has complex structure
}

export default function ParagraphContent({
  displayWords,
  hooks,
}: ParagraphContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const backgroundSecondary = isDarkMode ? color.gray700 : color.gray100;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "1rem",
        bgcolor: backgroundSecondary,
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.08)",
        wordBreak: "break-word",
        whiteSpace: "normal",
        lineHeight: 2.2,
        fontSize: { xs: "0.95rem", md: "1rem" },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          background: `linear-gradient(90deg, ${color.teal400}, ${color.emerald500})`,
        },
      }}
    >
      {displayWords.map((word, index) => {
        if (word.startsWith("blank_")) {
          const missingIndex = parseInt(word.split("_")[1]);
          const answer = hooks.sortedAnswers.find(
            (a: any) => a.missingIndex === missingIndex
          );

          if (!answer) return null;

          const isCorrect =
            hooks.userAnswers[missingIndex]?.trim().toLowerCase() ===
            answer.correctAnswer.trim().toLowerCase();

          const showFeedback = hooks.isShowExplain && hooks.score !== null;
          const feedbackColor = isCorrect ? color.success : color.error;
          const feedbackBgColor = isCorrect
            ? isDarkMode
              ? color.green900
              : color.green100
            : isDarkMode
            ? color.red900
            : color.red100;

          return (
            <Box
              component="span"
              key={`blank-${index}`}
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                mx: 0.5,
                mb: 1,
                verticalAlign: "middle",
                position: "relative",
              }}
            >
              <TextField
                value={hooks.userAnswers[missingIndex] || ""}
                onChange={(e) =>
                  hooks.handleInputChange(missingIndex, e.target.value)
                }
                variant="outlined"
                size="small"
                placeholder="answer"
                disabled={!!hooks.score}
                sx={{
                  width: { xs: "100px", sm: "130px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0.7rem",
                    bgcolor: isDarkMode ? color.gray800 : color.white,
                    borderColor: showFeedback ? feedbackColor : accentColor,
                    transition: "all 0.3s ease",
                    boxShadow: showFeedback
                      ? `0 0 0 1px ${feedbackColor}, 0 2px 8px ${feedbackBgColor}`
                      : "0 2px 6px rgba(0,0,0,0.1)",
                    "& fieldset": {
                      borderColor: showFeedback ? feedbackColor : accentColor,
                      borderWidth: showFeedback ? "2px" : "1px",
                    },
                    "&:hover fieldset": {
                      borderColor: showFeedback
                        ? feedbackColor
                        : isDarkMode
                        ? color.teal400
                        : color.teal500,
                    },
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontWeight: 500,
                  },
                }}
              />
              {showFeedback && (
                <Zoom in timeout={500}>
                  <Chip
                    label={answer.correctAnswer}
                    size="small"
                    sx={{
                      mt: 0.8,
                      ml: "auto",
                      mr: "auto",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor: isDarkMode
                        ? color.emerald800
                        : color.emerald300,
                      color: isDarkMode ? color.white : color.emerald900,
                      border: `1px solid ${
                        isDarkMode ? color.emerald700 : color.emerald400
                      }`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      px: 0.5,
                    }}
                  />
                </Zoom>
              )}
            </Box>
          );
        }

        return (
          <Box
            component="span"
            key={`word-${index}`}
            sx={{
              color: textColor,
              mr: 0.5,
            }}
          >
            {word}
          </Box>
        );
      })}
    </Box>
  );
}
