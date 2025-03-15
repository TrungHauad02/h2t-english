import { mockData } from "./mockData";
import {
  Test,
  TestPart,
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  Question,
  TestPartTypeEnum,
} from "interfaces";

const getTestById = (testId: number): Test | null => {
  return mockData.tests.find((t) => t.id === testId) || null;
};
const getTestPartsByIds = (partIds: number[]): TestPart[] => {
  return mockData.testParts.filter((part) => partIds.includes(part.id));
};
const getQuestionsByIds = (questionIds: number[]): Question[] => {
  return mockData.questions.filter((q) => questionIds.includes(q.id));
};
const getTestReadingsByIds = (testIds: number[]): TestReading[] => {
  return mockData.testReadings.filter((t) => testIds.includes(t.id));
};
const getTestListeningsByIds = (testIds: number[]): TestListening[] => {
  return mockData.testListenings.filter((t) => testIds.includes(t.id));
};
const getTestSpeakingsByIds = (testIds: number[]): TestSpeaking[] => {
  return mockData.testSpeakings.filter((t) => testIds.includes(t.id));
};
const getTestWritingsByIds = (testIds: number[]): TestWriting[] => {
  return mockData.testWritings.filter((t) => testIds.includes(t.id));
};
const getDataTestByTypeAndId = (type: string, id: string) => {
  const testId = Number(id);
  if (isNaN(testId)) return null;
  const test = getTestById(testId);
  if (!test) return null;
  const testParts = getTestPartsByIds(test.parts);
  let questions: Question[] = [];
  let testReadings: TestReading[] = [];
  let testListenings: TestListening[] = [];
  let testSpeakings: TestSpeaking[] = [];
  let testWritings: TestWriting[] = [];

  testParts.forEach((part) => {
    switch (part.type) {
      case TestPartTypeEnum.VOCABULARY:
      case TestPartTypeEnum.GRAMMAR:
        questions.push(...getQuestionsByIds(part.questions));
        break;
      case TestPartTypeEnum.READING:
        testReadings.push(...getTestReadingsByIds(part.questions));
        break;
      case TestPartTypeEnum.LISTENING:
        testListenings.push(...getTestListeningsByIds(part.questions));
        break;
      case TestPartTypeEnum.SPEAKING:
        testSpeakings.push(...getTestSpeakingsByIds(part.questions));
        break;
      case TestPartTypeEnum.WRITING:
        testWritings.push(...getTestWritingsByIds(part.questions));
        break;
      default:
        break;
    }
  });
  switch (type.toLowerCase()) {
    case "mixing":
      return {
        questions,
        testReadings,
        testListenings,
        testSpeakings,
        testWritings,
      };
    case "reading":
      return testReadings;
    case "listening":
      return testListenings;
    case "speaking":
      return testSpeakings;
    case "writing":
      return testWritings;
    default:
      return null;
  }
};
const getTestByIdAndType = (testId: number, testType: string): Test | null => {
  return mockData.tests.find((t) => t.id === testId && t.type === testType) || null;
};

export const testService = {
  getTestById,
  getTestByIdAndType,
  getTestPartsByIds,
  getQuestionsByIds,
  getTestReadingsByIds,
  getTestListeningsByIds,
  getTestSpeakingsByIds,
  getTestWritingsByIds,
  getDataTestByTypeAndId,
};
