import { Box, Stack, Typography, Paper, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ScoreDisplay({
  score,
  totalQuestions,
}: {
  score: number;
  totalQuestions: number;
}) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const scorePercent = (score / totalQuestions) * 100;

  let scoreCategory, scoreColor, bgColor, borderColor;

  if (scorePercent >= 80) {
    scoreCategory = "Excellent";
    scoreColor = isDarkMode ? color.green400 : color.green600;
    bgColor = isDarkMode
      ? alpha(color.green700, 0.2)
      : alpha(color.green100, 0.5);
    borderColor = isDarkMode ? color.green600 : color.green400;
  } else if (scorePercent >= 70) {
    scoreCategory = "Good";
    scoreColor = isDarkMode ? color.emerald400 : color.emerald600;
    bgColor = isDarkMode
      ? alpha(color.emerald700, 0.2)
      : alpha(color.emerald100, 0.5);
    borderColor = isDarkMode ? color.emerald600 : color.emerald400;
  } else if (scorePercent >= 60) {
    scoreCategory = "Satisfactory";
    scoreColor = isDarkMode ? color.teal400 : color.teal600;
    bgColor = isDarkMode
      ? alpha(color.teal700, 0.2)
      : alpha(color.teal100, 0.5);
    borderColor = isDarkMode ? color.teal600 : color.teal400;
  } else if (scorePercent >= 40) {
    scoreCategory = "Needs Improvement";
    scoreColor = isDarkMode ? color.warningDarkMode : color.warning;
    bgColor = isDarkMode
      ? alpha(color.warning, 0.2)
      : alpha(color.warning, 0.1);
    borderColor = isDarkMode ? color.warningDarkMode : color.warning;
  } else {
    scoreCategory = "Poor";
    scoreColor = isDarkMode ? color.red400 : color.red600;
    bgColor = isDarkMode ? alpha(color.red700, 0.2) : alpha(color.red100, 0.5);
    borderColor = isDarkMode ? color.red600 : color.red400;
  }

  if (score === null) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 3,
        borderRadius: 3,
        bgcolor: isDarkMode ? alpha(color.gray800, 0.7) : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <EmojiEventsIcon
            sx={{
              color: scoreColor,
              mr: 1.5,
              fontSize: 22,
            }}
          />
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
          >
            Your Score
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            py: 2,
            px: 3,
            borderRadius: 2,
            bgcolor: bgColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ color: scoreColor }}>
            {scorePercent}%
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="medium"
            sx={{ color: scoreColor, mt: 1 }}
          >
            {scoreCategory}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              mt: 1,
              textAlign: "center",
            }}
          >
            {score} correct answers out of {totalQuestions} questions
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
