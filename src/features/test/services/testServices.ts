import { mockData } from "./mockData";
import { Test } from "interfaces"; 

const getDataTestByTypeAndId = (type: string, id: string): Test | null => {
  const test = mockData.tests.find((t) => t.id === id);

  if (!test) {
    return null; 
  }
  switch (type.toLowerCase()) {
    case "mixing":
      return {
        ...test,
        testMixingQuestions: mockData.testMixingQuestions.filter(
          (question) => question.testId === id
        ),
        testReadings: [],
        testListening: [],
        testSpeaking: [],
        testWriting: [],
      };
    case "readings":
      return {
        ...test,
        testMixingQuestions: [],
        testReadings: mockData.testReadings.filter(
          (reading) => reading.testId === id
        ),
        testListening: [],
        testSpeaking: [],
        testWriting: [],
      };
    case "listenings":
      return {
        ...test,
        testMixingQuestions: [],
        testReadings: [],
        testListening: mockData.testListenings.filter(
          (listening) => listening.testId === id
        ),
        testSpeaking: [],
        testWriting: [],
      };
    case "speakings":
      return {
        ...test,
        testMixingQuestions: [],
        testReadings: [],
        testListening: [],
        testSpeaking: mockData.testSpeakings.filter(
          (speaking) => speaking.testId === id
        ),
        testWriting: [],
      };
    case "writings":
      return {
        ...test,
        testMixingQuestions: [],
        testReadings: [],
        testListening: [],
        testSpeaking: [],
        testWriting: mockData.testWritings.filter(
          (writing) => writing.testId === id
        ),
      };
    default:
      return null;
  }
};

export const testService = {
  getDataTestByTypeAndId,
};
