import { Box, Stack, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useMatchImageWord from "./useMatchImageWord";

export default function MatchImageWordSection() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const hooks = useMatchImageWord();

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
        {hooks.displayWord.map((vocab) => (
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
                hooks.selectedWord === vocab
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
            onClick={() => hooks.onSelectWord(vocab)}
          >
            {vocab}
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ width: { xs: "100%", sm: "70%" } }}>
        {hooks.listVocab.map((vocab) => (
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
              onClick={() => hooks.onSelectImage(vocab.word)}
            >
              {hooks.getWordWithImage(vocab.word) && (
                <Typography textAlign={"center"}>
                  {hooks.getWordWithImage(vocab.word)?.word}
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
