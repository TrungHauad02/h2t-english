import { Box, Typography, Chip, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { WritingAnswer } from "interfaces";
import useColor from "theme/useColor";
import { shuffleArray } from "utils/shuffleArray";
import { useMemo } from "react";
import { AutoAwesome } from "@mui/icons-material";

interface WordBankSectionProps {
  writingAnswers: WritingAnswer[];
  userAnswers: { [key: number]: string };
}

export default function WordBankSection({
  writingAnswers,
  userAnswers,
}: WordBankSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const shuffledAnswers = useMemo(() => {
    return shuffleArray(writingAnswers.map((answer) => answer.correctAnswer));
  }, [writingAnswers]);

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const getWordStatus = (word: string) => {
    const isUsed = Object.values(userAnswers).some(
      (answer) => answer.trim().toLowerCase() === word.toLowerCase()
    );
    return isUsed;
  };

  if (writingAnswers.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: "12px",
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2.5,
            gap: 1,
          }}
        >
          <AutoAwesome
            sx={{
              color: accentColor,
              fontSize: "1.2rem",
            }}
          />
          <Typography
            variant="h6"
            color={textColor}
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Available Words
          </Typography>
        </Box>

        {/* Word Grid */}
        <Grid container spacing={1}>
          {shuffledAnswers.map((word, index) => {
            const isUsed = getWordStatus(word);

            return (
              <Grid item xs={6} sm={4} md={3} key={`word-${index}`}>
                <Chip
                  label={word}
                  size="medium"
                  sx={{
                    width: "100%",
                    height: "40px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    borderRadius: "8px",
                    backgroundColor: isUsed
                      ? isDarkMode
                        ? color.gray700
                        : color.gray200
                      : isDarkMode
                      ? color.teal800
                      : color.teal100,
                    color: isUsed
                      ? isDarkMode
                        ? color.gray400
                        : color.gray500
                      : isDarkMode
                      ? color.teal200
                      : color.teal700,
                    border: `1px solid ${
                      isUsed
                        ? isDarkMode
                          ? color.gray600
                          : color.gray300
                        : isDarkMode
                        ? color.teal700
                        : color.teal300
                    }`,
                    transition: "all 0.2s ease",
                    opacity: isUsed ? 0.5 : 1,
                    "&:hover": {
                      backgroundColor: isUsed
                        ? isDarkMode
                          ? color.gray700
                          : color.gray200
                        : isDarkMode
                        ? color.teal700
                        : color.teal200,
                    },
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
