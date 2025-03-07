import { Paper, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function NoQuestionSection({
  secondaryTextColor,
}: {
  secondaryTextColor: string;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        bgcolor: isDarkMode ? color.gray700 : color.teal50,
        color: secondaryTextColor,
        borderRadius: 3,
        border: `1px dashed ${isDarkMode ? color.gray600 : color.teal300}`,
      }}
    >
      <QuizIcon
        sx={{
          fontSize: 40,
          color: isDarkMode ? color.gray500 : color.teal300,
          mb: 1,
        }}
      />
      <Typography variant="body1">No questions added yet.</Typography>
    </Paper>
  );
}
