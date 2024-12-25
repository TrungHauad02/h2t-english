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

interface ListLessonProps {
  type: string;
}

export default function ListLesson({ type }: ListLessonProps) {
  const listLesson: (
    | Topic
    | Grammar
    | Reading
    | Speaking
    | Listening
    | Writing
  )[] = listLessonService.getListLessonByType(type);
  return (
    <Box sx={{ mx: 4 }}>
      <Grid container spacing={3}>
        {listLesson.map((lesson) => (
          <LessonItem lesson={lesson} />
        ))}
      </Grid>
    </Box>
  );
}
