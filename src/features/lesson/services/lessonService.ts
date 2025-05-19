import { RouteNodeEnum } from "interfaces";
import {
  grammarService,
  listeningService,
  readingService,
  speakingService,
  topicService,
  writingService,
} from "services";
import { completeRouteNode } from "utils/updateProcess";

/*
  Find lesson by id and increase the view count
*/
const findLessonById = async (id: number, type: string, userId: number) => {
  switch (type) {
    case "topics":
      const topicData = await topicService.findById(id);
      topicService.patch(id, { views: topicData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.VOCABULARY);
      return topicData;
    case "grammars":
      const grammarData = await grammarService.findById(id);
      grammarService.patch(id, { views: grammarData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.GRAMMAR);
      return grammarData;
    case "readings":
      const readingData = await readingService.findById(id);
      readingService.patch(id, { views: readingData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.READING);
      return readingData;
    case "speakings":
      const speakingData = await speakingService.findById(id);
      speakingService.patch(id, { views: speakingData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.SPEAKING);
      return speakingData;
    case "listenings":
      const listeningData = await listeningService.findById(id);
      listeningService.patch(id, { views: listeningData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.LISTENING);
      return listeningData;
    default:
      const writingData = await writingService.findById(id);
      writingService.patch(id, { views: writingData.data.views + 1 });
      completeRouteNode(id, userId, RouteNodeEnum.WRITING);
      return writingData;
  }
};

export const lessonService = {
  findLessonById,
};
