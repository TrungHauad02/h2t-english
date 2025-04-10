import { mockData } from "./mockData";
import { 
  Toeic, 
  ToeicPart1, 
  ToeicPart2, 
  ToeicPart3_4, 
  ToeicPart5, 
  ToeicPart6, 
  ToeicPart7,
  ToeicPart7Question,
  AnswerEnum
} from "interfaces";
import BaseEntity from "interfaces";

interface ToeicFilter {
  status?: boolean;
  title?: string;
  minScore?: number;
  maxScore?: number;
}

const getToeicById = (toeicId: number): Toeic | null => {
  return mockData.toeics.find((t) => t.id === toeicId) || null;
};

const getToeicTests = (filter?: ToeicFilter): Toeic[] => {
  let filteredToeics = [...mockData.toeics];

  if (filter?.status !== undefined) {
    filteredToeics = filteredToeics.filter(
      (toeic) => toeic.status === filter.status
    );
  }

  if (filter?.title) {
    filteredToeics = filteredToeics.filter((toeic) =>
      toeic.title.toLowerCase().includes(filter.title?.toLowerCase() || "")
    );
  }

  if (filter?.minScore !== undefined) {
    filteredToeics = filteredToeics.filter(
      (toeic) => (toeic.scoreLastOfTest || 0) >= (filter.minScore || 0)
    );
  }

  if (filter?.maxScore !== undefined) {
    filteredToeics = filteredToeics.filter(
      (toeic) => (toeic.scoreLastOfTest || 0) <= (filter.maxScore || 990)
    );
  }

  return filteredToeics;
};

const createToeicTest = (toeicData: Omit<Toeic, keyof BaseEntity | "totalQuestions" | "scoreLastOfTest">): Toeic => {
  const newId = Math.max(...mockData.toeics.map(t => t.id), 0) + 1;
  const now = new Date();
  
  const newToeic: Toeic = {
    id: newId,
    title: toeicData.title,
    duration: toeicData.duration,
    questionsPart1: toeicData.questionsPart1,
    questionsPart2: toeicData.questionsPart2,
    questionsPart3: toeicData.questionsPart3,
    questionsPart4: toeicData.questionsPart4,
    questionsPart5: toeicData.questionsPart5,
    questionsPart6: toeicData.questionsPart6,
    questionsPart7: toeicData.questionsPart7,
    totalQuestions: 200, // Fixed as per interface
    scoreLastOfTest: null, // Initialize as null
    status: false, // Default to unpublished
    createdAt: now,
    updatedAt: now
  };
  
  mockData.toeics.push(newToeic);
  return newToeic;
};

const updateToeicTest = (id: number, data: Partial<Toeic>): Toeic | null => {
  const index = mockData.toeics.findIndex(t => t.id === id);
  if (index !== -1) {
    // Ensure totalQuestions remains 200 as per interface
    if (data.totalQuestions !== undefined && data.totalQuestions !== 200) {
      data.totalQuestions = 200;
    }
    
    mockData.toeics[index] = {
      ...mockData.toeics[index],
      ...data,
      updatedAt: new Date()
    };
    return mockData.toeics[index];
  }
  return null;
};

const deleteToeicTest = (id: number): boolean => {
  const index = mockData.toeics.findIndex(t => t.id === id);
  if (index !== -1) {
    mockData.toeics.splice(index, 1);
    return true;
  }
  return false;
};

const updateToeicScore = (id: number, score: number): Toeic | null => {
  const index = mockData.toeics.findIndex(t => t.id === id);
  if (index !== -1) {
    // Ensure score is within valid TOEIC range (0-990)
    const validScore = Math.max(0, Math.min(990, score));
    
    mockData.toeics[index] = {
      ...mockData.toeics[index],
      scoreLastOfTest: validScore,
      updatedAt: new Date()
    };
    return mockData.toeics[index];
  }
  return null;
};

// Part-specific methods
const getToeicPart1ByIds = (ids: number[]): ToeicPart1[] => {
  return mockData.toeicPart1s.filter(p => ids.includes(p.id));
};

const getToeicPart2ByIds = (ids: number[]): ToeicPart2[] => {
  return mockData.toeicPart2s.filter(p => ids.includes(p.id));
};

const getToeicPart3ByIds = (ids: number[]): ToeicPart3_4[] => {
  return mockData.toeicPart3s.filter(p => ids.includes(p.id));
};

const getToeicPart4ByIds = (ids: number[]): ToeicPart3_4[] => {
  return mockData.toeicPart4s.filter(p => ids.includes(p.id));
};

const getToeicPart5ByIds = (ids: number[]): ToeicPart5[] => {
  return mockData.toeicPart5s.filter(p => ids.includes(p.id));
};

const getToeicPart6ByIds = (ids: number[]): ToeicPart6[] => {
  return mockData.toeicPart6s.filter(p => ids.includes(p.id));
};

const getToeicPart7ByIds = (ids: number[]): ToeicPart7[] => {
  return mockData.toeicPart7s.filter(p => ids.includes(p.id));
};

const getToeicPart7QuestionsByIds = (ids: number[]): ToeicPart7Question[] => {
  return mockData.toeicPart7Questions.filter(q => ids.includes(q.id));
};

export const toeicService = {
  getToeicById,
  getToeicTests,
  createToeicTest,
  updateToeicTest,
  deleteToeicTest,
  updateToeicScore,
  
  // Added individual part getter methods
  getToeicPart1ByIds,
  getToeicPart2ByIds,
  getToeicPart3ByIds,
  getToeicPart4ByIds,
  getToeicPart5ByIds,
  getToeicPart6ByIds,
  getToeicPart7ByIds,
  getToeicPart7QuestionsByIds
};