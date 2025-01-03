import { Grid, Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";
import useColor from "theme/useColor";
import { ImageWord } from "./useMatchImageWord";

interface ImageGridProps {
  vocabList: Vocabulary[];
  onSelectImage: (img: string) => void;
  isShowExplain: boolean;
  getWordWithImage: (word: string) => ImageWord | undefined;
}

export default function ImageGrid({
  vocabList,
  onSelectImage,
  isShowExplain,
  getWordWithImage,
}: ImageGridProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Grid container sx={{ width: { xs: "100%", sm: "70%" } }}>
      {vocabList.map((vocab) => (
        <Grid key={vocab.word} xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
          <img
            src={vocab.image}
            alt={vocab.word}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
          <Box
            sx={{
              mt: 1,
              width: "100%",
              height: "50px",
              bgcolor: isDarkMode ? color.teal700 : color.teal400,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                cursor: "pointer",
                bgcolor: isDarkMode ? color.teal800 : color.teal500,
              },
            }}
            onClick={() => onSelectImage(vocab.word)}
          >
            <Typography textAlign="center">
              {isShowExplain
                ? vocab.word
                : getWordWithImage(vocab.word)?.word || ""}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
