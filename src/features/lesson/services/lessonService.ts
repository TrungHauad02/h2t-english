import {
  grammarService,
  listeningService,
  readingService,
  speakingService,
  topicService,
  writingService,
} from "services";

/*
  Find lesson by id and increase the view count
*/
const findLessonById = async (id: number, type: string, userId: number) => {
  switch (type) {
    case "topics":
      const topicData = await topicService.findById(id);
      topicService.patch(id, { views: topicData.data.views + 1 });
      return topicData;
    case "grammars":
      const grammarData = await grammarService.findById(id);
      grammarService.patch(id, { views: grammarData.data.views + 1 });
      return grammarData;
    case "readings":
      const readingData = await readingService.findById(id);
      readingService.patch(id, { views: readingData.data.views + 1 });
      return readingData;
    case "speakings":
      const speakingData = await speakingService.findById(id);
      speakingService.patch(id, { views: speakingData.data.views + 1 });
      return speakingData;
    case "listenings":
      const listeningData = await listeningService.findById(id);
      listeningService.patch(id, { views: listeningData.data.views + 1 });
      return listeningData;
    default:
      const writingData = await writingService.findById(id);
      writingService.patch(id, { views: writingData.data.views + 1 });
      return writingData;
  }
};

export const lessonService = {
  findLessonById,
};
