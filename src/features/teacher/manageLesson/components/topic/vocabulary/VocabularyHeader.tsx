import { Box, Typography, Button } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface VocabularyHeaderProps {
  numberOfVocab: number;
}

export default function VocabularyHeader({
  numberOfVocab,
}: VocabularyHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;

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
          Vocabularies ({numberOfVocab})
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
        Add Vocabulary
      </Button>
    </Box>
  );
}
