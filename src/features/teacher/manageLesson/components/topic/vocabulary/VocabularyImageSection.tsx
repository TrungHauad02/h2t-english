import { Box, Chip } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface VocabularyImageSectionProps {
  image: string;
  word: string;
  wordType: string;
  status: boolean;
}

export default function VocabularyImageSection({
  image,
  word,
  wordType,
  status,
}: VocabularyImageSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ position: "relative", height: "180px" }}>
      <Box
        sx={{
          width: "100%",
          height: "180px",
          backgroundColor: isDarkMode ? color.gray800 : color.gray200,
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={word}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />
      </Box>
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
          label={wordType}
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
          label={status ? "Active" : "Inactive"}
          sx={{
            bgcolor: status
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
  );
}
