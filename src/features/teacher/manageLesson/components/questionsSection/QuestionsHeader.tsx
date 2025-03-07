import { Box, Typography, Button } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface QuestionsHeaderProps {
  numberOfQuestions: number;
  accentColor: string;
}

export default function QuestionsHeader({
  numberOfQuestions,
  accentColor,
}: QuestionsHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <QuizIcon
          sx={{
            mr: 1.5,
            color: accentColor,
            fontSize: 28,
          }}
        />
        <Typography variant="h5" fontWeight="medium">
          Questions ({numberOfQuestions})
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
          color: "white",
          "&:hover": {
            bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
          },
        }}
      >
        Add Question
      </Button>
    </Box>
  );
}
