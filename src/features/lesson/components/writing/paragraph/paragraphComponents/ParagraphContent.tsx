import { Box, TextField, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ParagraphContentProps {
  displayWords: string[];
  hooks: any;
}

export default function ParagraphContent({
  displayWords,
  hooks,
}: ParagraphContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const backgroundSecondary = isDarkMode ? color.gray800 : color.white;

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: "12px",
        bgcolor: backgroundSecondary,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        wordBreak: "break-word",
        whiteSpace: "normal",
        lineHeight: { xs: 1.8, md: 2 },
        fontSize: { xs: "1rem", md: "1.1rem" },
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

          const hasValue = hooks.userAnswers[missingIndex]?.trim();

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
              }}
            >
              <TextField
                value={hooks.userAnswers[missingIndex] || ""}
                onChange={(e) =>
                  hooks.handleInputChange(missingIndex, e.target.value)
                }
                variant="outlined"
                size="small"
                placeholder="___"
                disabled={!!hooks.score}
                sx={{
                  width: { xs: "100px", sm: "120px", md: "140px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    bgcolor: isDarkMode ? color.gray700 : color.white,
                    transition: "all 0.2s ease",
                    "& fieldset": {
                      borderColor: showFeedback
                        ? feedbackColor
                        : hasValue
                        ? accentColor
                        : isDarkMode
                        ? color.gray600
                        : color.gray300,
                      borderWidth: showFeedback || hasValue ? "2px" : "1px",
                    },
                    "&:hover fieldset": {
                      borderColor: showFeedback ? feedbackColor : accentColor,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: showFeedback ? feedbackColor : accentColor,
                    },
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    "&::placeholder": {
                      color: isDarkMode ? color.gray500 : color.gray400,
                      opacity: 0.8,
                    },
                  },
                }}
              />
              {showFeedback && (
                <Chip
                  label={answer.correctAnswer}
                  size="small"
                  sx={{
                    mt: 0.5,
                    ml: "auto",
                    mr: "auto",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: isDarkMode
                      ? color.emerald800
                      : color.emerald200,
                    color: isDarkMode ? color.emerald200 : color.emerald800,
                  }}
                />
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
              fontWeight: 400,
            }}
          >
            {word}
          </Box>
        );
      })}
    </Box>
  );
}
