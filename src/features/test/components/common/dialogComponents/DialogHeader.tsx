import { Box, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface DialogHeaderProps {
  score: number;
}

export default function DialogHeader({ score }: DialogHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getFeedback = (score: number) => {
    if (score >= 90)
      return "Excellent! You've completed the competition with outstanding results.";
    if (score >= 80)
      return "Great job! You have a solid performance in this competition.";
    if (score >= 70) return "Good work! You've achieved a respectable score.";
    if (score >= 60) return "Fair result! You've passed the competition.";
    if (score >= 50)
      return "Passing grade. You can improve your ranking next time.";
    return "Keep practicing to improve your competition ranking.";
  };

  return (
    <Box
      sx={{
        py: 3,
        px: 4,
        backgroundColor: isDarkMode ? color.gray700 : color.teal50,
        borderBottom: "1px solid",
        borderColor: isDarkMode ? color.gray600 : color.teal100,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <FlagIcon
        sx={{
          fontSize: 28,
          color: isDarkMode ? color.teal300 : color.teal600,
        }}
      />
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          Competition Completed
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 400,
          }}
        >
          {getFeedback(score)}
        </Typography>
      </Box>
    </Box>
  );
}
