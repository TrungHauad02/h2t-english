import { mockData } from "./mockData";
import {
  Test,
  CompetitionTest,
  TestPart,
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  Question,
  TestPartTypeEnum,
} from "interfaces";

// Existing functions
const getTestById = (testId: number): Test | null => {
  return mockData.tests.find((t) => t.id === testId) || null;
};

const getCompetitionTestById = (competitionTestId: number): CompetitionTest | null => {
  return mockData.CompetitionTests.find((t) => t.id === competitionTestId) || null;
};

const getTestPartsByIds = (partIds: number[]): TestPart[] => {
  return mockData.testParts.filter((part) => partIds.includes(part.id));
};

const getQuestionsByIds = (questionIds: number[]): Question[] => {
  return mockData.questions.filter((q) => questionIds.includes(q.id));
};

const getQuestionsByIdsAndType = (questionIds: number[], type: TestPartTypeEnum): Question[] => {
  switch (type) {
    case TestPartTypeEnum.VOCABULARY:
    case TestPartTypeEnum.GRAMMAR:
      return mockData.questions.filter((q) => questionIds.includes(q.id));

    case TestPartTypeEnum.READING:
      return mockData.testReadings
        .filter((reading) => questionIds.includes(reading.id))
        .flatMap((reading) => mockData.questions.filter((q) => reading.questions.includes(q.id)));

    case TestPartTypeEnum.LISTENING:
      return mockData.testListenings
        .filter((listening) => questionIds.includes(listening.id))
        .flatMap((listening) => mockData.questions.filter((q) => listening.questions.includes(q.id)));

    case TestPartTypeEnum.SPEAKING:
      return mockData.testSpeakings
        .filter((speaking) => questionIds.includes(speaking.id))
        .flatMap((speaking) => mockData.questions.filter((q) => speaking.questions.includes(q.id)));
    default:
      return [];
  }
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

// New competition test management functions
interface CompetitionFilter {
  status?: boolean;
  title?: string;
  dateRange?: {
    startDate?: Date;
    endDate?: Date;
  };
}

const getCompetitionTests = (filter?: CompetitionFilter): CompetitionTest[] => {
  let filteredCompetitions = [...mockData.CompetitionTests];

  if (filter?.status !== undefined) {
    filteredCompetitions = filteredCompetitions.filter(
      (competition) => competition.status === filter.status
    );
  }

  if (filter?.title) {
    filteredCompetitions = filteredCompetitions.filter((competition) =>
      competition.title.toLowerCase().includes(filter.title?.toLowerCase() || "")
    );
  }

  if (filter?.dateRange) {
    if (filter.dateRange.startDate) {
      filteredCompetitions = filteredCompetitions.filter(
        (competition) => new Date(competition.startTime) >= filter.dateRange!.startDate!
      );
    }
    if (filter.dateRange.endDate) {
      filteredCompetitions = filteredCompetitions.filter(
        (competition) => new Date(competition.endTime) <= filter.dateRange!.endDate!
      );
    }
  }

  return filteredCompetitions;
};

const createCompetitionTest = (competition: Omit<CompetitionTest, "id" | "status" | "createdAt" | "updatedAt">): CompetitionTest => {
  const newId = Math.max(...mockData.CompetitionTests.map(c => c.id), 0) + 1;
  const now = new Date();
  
  const newCompetition: CompetitionTest = {
    id: newId,
    title: competition.title,
    duration: competition.duration,
    totalQuestions: competition.totalQuestions,
    startTime: competition.startTime,
    endTime: competition.endTime,
    parts: competition.parts,
    status: false, // Default to unpublished
    createdAt: now,
    updatedAt: now
  };
  
  mockData.CompetitionTests.push(newCompetition);
  return newCompetition;
};
  


const updateCompetitionTest = (id: number, data: Partial<CompetitionTest>): CompetitionTest | null => {
  const index = mockData.CompetitionTests.findIndex(c => c.id === id);
  if (index !== -1) {
    mockData.CompetitionTests[index] = {
      ...mockData.CompetitionTests[index],
      ...data,
      updatedAt: new Date()
    };
    return mockData.CompetitionTests[index];
  }
  return null;
};

const deleteCompetitionTest = (id: number): boolean => {
  const index = mockData.CompetitionTests.findIndex(c => c.id === id);
  if (index !== -1) {
    mockData.CompetitionTests.splice(index, 1);
    return true;
  }
  return false;
};

const getCompetitionTestsByStatus = (status: 'upcoming' | 'active' | 'past'): CompetitionTest[] => {
  const now = new Date();

  switch (status) {
    case 'upcoming':
      return mockData.CompetitionTests.filter(comp => new Date(comp.startTime) > now);
    case 'active':
      return mockData.CompetitionTests.filter(comp => 
        new Date(comp.startTime) <= now && new Date(comp.endTime) >= now
      );
    case 'past':
      return mockData.CompetitionTests.filter(comp => new Date(comp.endTime) < now);
    default:
      return [];
  }
};

export const testService = {
  // Existing exports
  getTestById,
  getTestByIdAndType,
  getCompetitionTestById,
  getTestPartsByIds,
  getQuestionsByIds,
  getTestReadingsByIds,
  getTestListeningsByIds,
  getTestSpeakingsByIds,
  getTestWritingsByIds,
  getDataTestByTypeAndId,
  getQuestionsByIdsAndType,
  
  // New competition management exports
  getCompetitionTests,
  createCompetitionTest,
  updateCompetitionTest,
  deleteCompetitionTest,
  getCompetitionTestsByStatus
};