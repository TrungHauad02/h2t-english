import { Grid } from "@mui/material";
import { lessonService } from "features/lesson/services/lessonService";
import { useParams } from "react-router-dom";
import VocabularyCard from "./VocabularyCard";

export default function FlashcardSection() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");
  return (
    <Grid container direction={"row"}>
      {listVocab.map((vocab) => (
        <Grid xs={12} sm={6} md={4} lg={3}>
          <VocabularyCard vocab={vocab} />
        </Grid>
      ))}
    </Grid>
  );
}
