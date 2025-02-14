import { Box, Grid } from "@mui/material";
import { lessonService } from "features/lesson/services/lessonService";
import { useParams } from "react-router-dom";
import VocabularyCard from "./VocabularyCard";
import { WEPaginationSelect } from "components/pagination";
import { useState } from "react";

export default function FlashcardSection() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(Number(id) || 0);
  const [page, setPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(8);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLessonsPerPageChange = (value: string | number) => {
    setLessonsPerPage(value as number);
    setPage(1);
  };

  const paginatedLessons = listVocab.slice(
    (page - 1) * lessonsPerPage,
    page * lessonsPerPage
  );

  return (
    <Box sx={{ mx: 2 }}>
      <Grid container direction={"row"}>
        {paginatedLessons.map((vocab) => (
          <Grid xs={12} sm={6} md={4} lg={3}>
            <VocabularyCard vocab={vocab} />
          </Grid>
        ))}
      </Grid>
      <WEPaginationSelect
        page={page}
        totalPage={Math.ceil(listVocab.length / lessonsPerPage)}
        itemsPerPage={lessonsPerPage}
        onPageChange={handleChangePage}
        onItemsPerPageChange={handleLessonsPerPageChange}
      />
    </Box>
  );
}
