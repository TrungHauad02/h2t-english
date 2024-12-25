import {
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
  Grammar,
} from "interfaces";
import { listLessonService } from "../services/listLessonService";
import { Box, Grid } from "@mui/material";
import LessonItem from "./LessonItem";
import { WEPagination } from "components/pagination";
import { useState } from "react";
import { WESelect } from "components/input";

interface ListLessonProps {
  type: string;
}

export default function ListLesson({ type }: ListLessonProps) {
  const [page, setPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(5);
  const itemPerPageOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];
  const listLesson: (
    | Topic
    | Grammar
    | Reading
    | Speaking
    | Listening
    | Writing
  )[] = listLessonService.getListLessonByType(type);

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
      <Box
        sx={{
          mt: 4,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <WEPagination
            page={page}
            totalPage={Math.ceil(listLesson.length / lessonsPerPage)}
            onChange={handleChangePage}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <WESelect
            label="Item per page"
            value={lessonsPerPage}
            options={itemPerPageOptions}
            onChange={handleLessonsPerPageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
