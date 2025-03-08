import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { VocabularyHeader } from "./vocabulary";

export default function VocabularySection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        my: 4,
      }}
    >
      <VocabularyHeader numberOfVocab={2} />
    </Box>
  );
}
