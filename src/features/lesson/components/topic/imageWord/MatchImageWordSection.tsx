import { Box, Stack, Grid, Typography } from "@mui/material";
import { lessonService } from "features/lesson/services/lessonService";
import { useDarkMode } from "hooks/useDarkMode";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useColor from "theme/useColor";

export default function MatchImageWordSection() {
  const { id } = useParams();
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");
  const [displayWord, setDisplayWord] = useState(
    listVocab.map((item) => item.word)
  );
  const [imgWordState, setImgWordState] = useState([{ img: "", word: "" }]);
  const [selectedWord, setSelectedWord] = useState<string>("");

  const onSelectWord = (word: string) => {
    setSelectedWord(word);
  };

  const onSelectImage = (img: string) => {
    const exits = imgWordState.find((item) => item.img === img);
    if (exits) {
      setImgWordState((prev) => prev.filter((item) => item.img !== img));
      setDisplayWord((prev) => [...prev, exits.word]);
    }
    if (selectedWord === "") return;
    setImgWordState((prev) => [...prev, { img, word: selectedWord }]);
    setDisplayWord((prev) => prev.filter((item) => item !== selectedWord));
    setSelectedWord("");
  };

  const getWordWithImage = (word: string) => {
    return imgWordState.find((item) => item.img === word);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mx: { xs: 2, sm: 4, md: 6, lg: 8 }, my: 2 }}
    >
      <Grid
        container
        sx={{
          width: { xs: "100%", sm: "30%" },
          height: "100%",
        }}
      >
        {displayWord.map((vocab) => (
          <Grid
            sm={12}
            md={6}
            lg={4}
            sx={{
              fontSize: "1rem",
              height: "50px",
              textAlign: "center",
              m: 2,
              p: 2,
              borderRadius: 2,
              bgcolor:
                selectedWord === vocab
                  ? isDarkMode
                    ? color.teal800
                    : color.teal400
                  : isDarkMode
                  ? color.gray700
                  : color.gray300,
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => onSelectWord(vocab)}
          >
            {vocab}
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ width: { xs: "100%", sm: "70%" } }}>
        {listVocab.map((vocab) => (
          <Grid xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
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
              {getWordWithImage(vocab.word) && (
                <Typography textAlign={"center"}>
                  {getWordWithImage(vocab.word)?.word}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
