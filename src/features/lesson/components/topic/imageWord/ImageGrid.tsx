import { Grid, Box, Typography, Paper, Grow, Tooltip } from "@mui/material";
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
    <Paper
      elevation={2}
      sx={{
        width: { xs: "100%", sm: "70%" },
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
        Match Images
      </Typography>

      <Grid container spacing={2}>
        {vocabList.map((vocab, index) => (
          <Grid item key={vocab.word} xs={12} sm={6} md={4} lg={3}>
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              timeout={(index % vocabList.length) * 100}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  border: `1px solid ${
                    isDarkMode ? color.teal700 : color.teal300
                  }`,
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Tooltip
                  title={isShowExplain ? vocab.word : ""}
                  arrow
                  placement="top"
                >
                  <Box>
                    <img
                      src={vocab.image}
                      alt={vocab.word}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Tooltip>

                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: isDarkMode ? color.teal700 : color.teal400,
                    color: isDarkMode ? color.gray50 : color.gray900,
                    transition: "background-color 0.3s ease",
                    ":hover": {
                      cursor: "pointer",
                      bgcolor: isDarkMode ? color.teal600 : color.teal500,
                    },
                  }}
                  onClick={() => onSelectImage(vocab.word)}
                >
                  <Typography
                    variant="body1"
                    textAlign="center"
                    fontWeight="medium"
                    sx={{
                      minHeight: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isShowExplain
                      ? vocab.word
                      : getWordWithImage(vocab.word)?.word || ""}
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
