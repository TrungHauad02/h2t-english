import {
  grammarService,
  listeningService,
  readingService,
  speakingService,
  topicService,
  writingService,
} from "services";

const getListLessonByType = async (
  type: string,
  page: number,
  itemsPerPage: number
) => {
  switch (type) {
    case "topics":
      return await topicService.getLessonsForStudent(page, itemsPerPage);
    case "grammars":
      return await grammarService.getLessonsForStudent(page, itemsPerPage);
    case "readings":
      return await readingService.getLessonsForStudent(page, itemsPerPage);
    case "speakings":
      return speakingService.getLessonsForStudent(page, itemsPerPage);
    case "listenings":
      return listeningService.getLessonsForStudent(page, itemsPerPage);
    default:
      return writingService.getLessonsForStudent(page, itemsPerPage);
  }
};

export const listLessonService = {
  getListLessonByType,
};
