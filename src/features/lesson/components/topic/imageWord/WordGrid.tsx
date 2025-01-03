import { Grid } from "@mui/material";
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
    <Grid
      container
      sx={{
        width: { xs: "100%", sm: "30%" },
        height: "100%",
      }}
    >
      {words.map((word) => (
        <Grid
          key={word}
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
            boxShadow: selectedWord === word ? 6 : 2,
            bgcolor:
              selectedWord === word
                ? isDarkMode
                  ? color.teal800
                  : color.teal400
                : isDarkMode
                ? color.gray700
                : color.gray300,
            ":hover": { cursor: "pointer" },
          }}
          onClick={() => onSelectWord(word)}
        >
          {word}
        </Grid>
      ))}
    </Grid>
  );
}
