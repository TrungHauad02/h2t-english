import { mockData } from "./mockData";

const getListLessonByType = (type: string) => {
  switch (type) {
    case "topics":
      return mockData.topics;
    case "grammars":
      return mockData.grammars;
    case "readings":
      return mockData.readings;
    case "speakings":
      return mockData.speakings;
    case "listenings":
      return mockData.listenings;
    default:
      return mockData.writings;
  }
};

export const listLessonService = {
  getListLessonByType,
};
