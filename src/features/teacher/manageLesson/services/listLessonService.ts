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

const getTopicById = (id: number) => {
  return mockData.topics.find((topic) => topic.id === id);
};

const getGrammarById = (id: number) => {
  return mockData.grammars.find((grammar) => grammar.id === id);
};

const getReadingById = (id: number) => {
  return mockData.readings.find((reading) => reading.id === id);
};

const getSpeakingById = (id: number) => {
  return mockData.speakings.find((speaking) => speaking.id === id);
};

const getListeningById = (id: number) => {
  return mockData.listenings.find((listening) => listening.id === id);
};

const getWritingById = (id: number) => {
  return mockData.writings.find((writing) => writing.id === id);
};

export const listLessonService = {
  getListLessonByType,
  getTopicById,
  getGrammarById,
  getReadingById,
  getSpeakingById,
  getListeningById,
  getWritingById,
};
