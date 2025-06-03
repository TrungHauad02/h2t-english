import { Lesson } from "interfaces";
import { listLessonService } from "../services/listLessonService";
import { Box, Grid } from "@mui/material";
import LessonItem from "./LessonItem";
import { WEPaginationSelect } from "components/pagination";
import { useEffect, useState } from "react";

interface ListLessonProps {
  type: string;
}

export default function ListLesson({ type }: ListLessonProps) {
  const [page, setPage] = useState(1);
  const [lessonsPerPage, setLessonsPerPage] = useState(8);
  const [listLesson, setListLesson] = useState<Lesson[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listLessonService.getListLessonByType(
          type,
          page,
          lessonsPerPage
        );
        setListLesson(response.data.content);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };
    fetchData();
  }, [page, lessonsPerPage, type]);

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

  return (
    <Box sx={{ mx: 4, marginTop: 3 }}>
      <Grid container spacing={3}>
        {listLesson.map((lesson) => (
          <LessonItem lesson={lesson} key={lesson.id} />
        ))}
      </Grid>
      <WEPaginationSelect
        page={page}
        totalPage={totalPage}
        itemsPerPage={lessonsPerPage}
        onPageChange={handleChangePage}
        onItemsPerPageChange={handleLessonsPerPageChange}
      />
    </Box>
  );
}
