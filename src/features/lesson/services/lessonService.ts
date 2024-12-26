import {
  Grammar,
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
} from "interfaces";
import { mockData } from "features/listLesson/services/mockData";

const getLessonById = (
  type: string,
  id: string
): Topic | Grammar | Reading | Speaking | Listening | Writing | undefined => {
  switch (type) {
    case "topics":
      return mockData.topics.find((item) => item.id === id);
    case "grammars":
      return mockData.grammars.find((item) => item.id === id);
    case "readings":
      return mockData.readings.find((item) => item.id === id);
    case "speakings":
      return mockData.speakings.find((item) => item.id === id);
    case "listenings":
      return mockData.listenings.find((item) => item.id === id);
    case "writings":
      return mockData.writings.find((item) => item.id === id);

    default:
      return undefined;
  }
};

const getVocabularyByTopicId = (topicId: string) => {
  return mockData.listVocabulary.filter((item) => item.topicId === topicId);
};

export const lessonService = {
  getLessonById,
  getVocabularyByTopicId,
};
