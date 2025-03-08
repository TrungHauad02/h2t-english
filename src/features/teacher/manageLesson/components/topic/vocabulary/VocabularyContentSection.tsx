import { Box, Stack, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface VocabularyContentSectionProps {
  phonetic: string;
  meaning: string;
  example: string;
}

export default function VocabularyContentSection({
  phonetic,
  meaning,
  example,
}: VocabularyContentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Stack spacing={2} sx={{ p: 3, flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          bgcolor: isDarkMode ? color.gray700 : color.teal50,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: secondaryTextColor,
            fontWeight: "medium",
          }}
        >
          Phonetic: <strong>{phonetic}</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          p: 1.5,
          bgcolor: isDarkMode ? color.gray700 : color.teal50,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: secondaryTextColor,
            fontWeight: "medium",
          }}
        >
          Meaning: <strong>{meaning}</strong>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          p: 1.5,
          bgcolor: isDarkMode ? color.gray700 : color.teal50,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: secondaryTextColor,
            fontWeight: "medium",
          }}
        >
          Example: <strong>{example}</strong>
        </Typography>
      </Box>
    </Stack>
  );
}
