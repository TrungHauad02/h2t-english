import { listAQ } from "./mockDataAQ";

const getQuestionByLessonId = (lessonId: string, type: string) => {
  return listAQ;
};

export const aqService = {
  getQuestionByLessonId,
};
