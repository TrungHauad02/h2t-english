import { Card, Stack, Typography, Box, IconButton, Chip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";

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
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

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
      {/* Image section with word type chip */}
      <Box sx={{ position: "relative" }}>
        <img
          src={vocabulary.image}
          alt={vocabulary.word}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            m: 1.5,
          }}
        >
          <Chip
            size="small"
            label={vocabulary.wordType}
            color="primary"
            sx={{
              bgcolor: isDarkMode ? `${color.teal700}CC` : `${color.teal600}CC`,
              color: color.white,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            m: 1.5,
          }}
        >
          <Chip
            size="small"
            label={vocabulary.status ? "Active" : "Inactive"}
            sx={{
              bgcolor: vocabulary.status
                ? isDarkMode
                  ? `${color.emerald700}CC`
                  : `${color.emerald600}CC`
                : `${color.gray500}CC`,
              color: color.white,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
            }}
          />
        </Box>
      </Box>

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
            Phonetic: <strong>{vocabulary.phonetic}</strong>
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
            Meaning: <strong>{vocabulary.meaning}</strong>
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
            Example: <strong>{vocabulary.example}</strong>
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
