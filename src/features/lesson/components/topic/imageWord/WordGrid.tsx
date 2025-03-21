import { Grid, Paper, Typography, Zoom } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WordGridProps {
  words: string[];
  selectedWord: string;
  onSelectWord: (word: string) => void;
}

export default function WordGrid({
  words,
  selectedWord,
  onSelectWord,
}: WordGridProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "30%" },
        height: "100%",
        p: 2,
        borderRadius: 3,
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
        border: `1px solid ${isDarkMode ? color.teal800 : color.teal200}`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          color: isDarkMode ? color.teal300 : color.teal700,
          fontWeight: "bold",
        }}
      >
        Select a Word
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {words.map((word) => (
          <Grid item key={word} xs={12} sm={12} md={12} lg={6}>
            <Zoom in={true} style={{ transitionDelay: "100ms" }}>
              <Paper
                elevation={selectedWord === word ? 6 : 1}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  bgcolor:
                    selectedWord === word
                      ? isDarkMode
                        ? color.teal800
                        : color.teal300
                      : isDarkMode
                      ? color.gray700
                      : color.gray200,
                  color:
                    selectedWord === word
                      ? isDarkMode
                        ? color.teal50
                        : color.teal900
                      : isDarkMode
                      ? color.gray200
                      : color.gray800,
                  border: `2px solid ${
                    selectedWord === word
                      ? isDarkMode
                        ? color.teal600
                        : color.teal500
                      : "transparent"
                  }`,
                  boxShadow: selectedWord === word ? 6 : 1,
                  transform: selectedWord === word ? "scale(1.05)" : "scale(1)",
                  fontWeight: selectedWord === word ? "bold" : "normal",
                  ":hover": {
                    cursor: "pointer",
                    bgcolor: isDarkMode ? color.teal700 : color.teal200,
                    color: isDarkMode ? color.teal50 : color.teal900,
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => onSelectWord(word)}
              >
                <Typography variant="body1">{word}</Typography>
              </Paper>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
