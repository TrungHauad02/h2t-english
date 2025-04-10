import {
  grammarService,
  listeningService,
  readingService,
  speakingService,
  topicService,
  writingService,
} from "services";

const findLessonById = async (id: number, type: string) => {
  switch (type) {
    case "topics":
      return await topicService.findById(id);
    case "grammars":
      return await grammarService.findById(id);
    case "readings":
      return await readingService.findById(id);
    case "speakings":
      return await speakingService.findById(id);
    case "listenings":
      return await listeningService.findById(id);
    default:
      return await writingService.findById(id);
  }
};

export const lessonService = {
  findLessonById,
};
