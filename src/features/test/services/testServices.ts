import { mockData } from "./mockData";

const getDataTestByTypeAndId = (type: string, id: string) => {

  switch (type.toLowerCase()) {
    case "mixing":
        return {
            testMixingQuestions: mockData.testMixingQuestions.find((t) => t.testId === id),
            testReadings: mockData.testReadings.find((t) => t.testId === id),
            testListenings: mockData.testListenings.find((t) => t.testId === id),
            testSpeakings: mockData.testSpeakings.find((t) => t.testId === id),
            testWritings: mockData.testWritings.find((t) => t.testId === id),
          };
    case "readings":
      return mockData.testReadings.find((t) => t.testId === id);
    case "listenings":
        return mockData.testListenings.find((t) => t.testId === id);
    case "speakings":
        return mockData.testSpeakings.find((t) => t.testId === id);
    case "writings":
        return mockData.testWritings.find((t) => t.testId === id);
    default:
      return null;
  }
};

export const testService = {
  getDataTestByTypeAndId,
};
