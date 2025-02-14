import { Lesson } from "interfaces";
import { listLessonService } from "../services/listLessonService";
import { Box, Grid } from "@mui/material";
import LessonItem from "./LessonItem";
import { WEPaginationSelect } from "components/pagination";
import { useState } from "react";

interface ListLessonProps {
  type: string;
}

export default function ListLesson({ type }: ListLessonProps) {
  const [page, setPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(8);

  const listLesson: Lesson[] = listLessonService.getListLessonByType(type);

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

  const paginatedLessons = listLesson.slice(
    (page - 1) * lessonsPerPage,
    page * lessonsPerPage
  );

  return (
    <Box sx={{ mx: 4 }}>
      <Grid container spacing={3}>
        {paginatedLessons.map((lesson) => (
          <LessonItem lesson={lesson} key={lesson.id} />
        ))}
      </Grid>
      <WEPaginationSelect
        page={page}
        totalPage={Math.ceil(listLesson.length / lessonsPerPage)}
        itemsPerPage={lessonsPerPage}
        onPageChange={handleChangePage}
        onItemsPerPageChange={handleLessonsPerPageChange}
      />
    </Box>
  );
}
