import { Box, Stack, Grid } from "@mui/material";
import { lessonService } from "features/lesson/services/lessonService";
import { useParams } from "react-router-dom";

export default function MatchImageWordSection() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mx: 8, my: 2 }}
    >
      <Stack>
        {listVocab.map((vocab) => (
          <Box sx={{ m: 2 }}>{vocab.word}</Box>
        ))}
      </Stack>
      <Grid container>
        {listVocab.map((vocab) => (
          <Grid xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
            <img
              src={vocab.image}
              alt={vocab.word}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
