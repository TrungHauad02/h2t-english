import { Card, Stack, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";
import VocabularyImageSection from "./VocabularyImageSection";
import VocabularyContentSection from "./VocabularyContentSection";

interface VocabularyViewModeProps {
  vocabulary: Vocabulary;
  handleEdit: (id: number) => void;
}

export default function VocabularyViewMode({
  vocabulary,
  handleEdit,
}: VocabularyViewModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Card
      sx={{
        bgcolor: isDarkMode ? color.gray800 : color.gray50,
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.2)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
      }}
    >
      {/* Image section */}
      <VocabularyImageSection
        image={vocabulary.image}
        word={vocabulary.word}
        wordType={vocabulary.wordType}
        status={vocabulary.status}
      />

      {/* Content section */}
      <Stack spacing={2} sx={{ p: 3, flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold">
            {vocabulary.word}
          </Typography>
          <IconButton
            onClick={() => handleEdit(vocabulary.id)}
            sx={{
              color: accentColor,
              bgcolor: isDarkMode ? color.gray600 : color.gray100,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray500 : color.gray300,
              },
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Stack>

        <VocabularyContentSection
          phonetic={vocabulary.phonetic}
          meaning={vocabulary.meaning}
          example={vocabulary.example}
        />
      </Stack>
    </Card>
  );
}
