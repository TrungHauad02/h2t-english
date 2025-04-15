import { mockData } from "./mockData";
import { 
  Toeic, 
  ToeicPart1, 
  ToeicPart2, 
  ToeicPart3_4, 
  ToeicPart6, 
  ToeicPart7,
  ToeicQuestion,
  ToeicAnswer,
} from "interfaces";

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

const createToeicTest = (toeicData: Omit<Toeic, 'id' | 'createdAt' | 'updatedAt' | 'totalQuestions' | 'scoreLastOfTest'>): Toeic => {
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

const getToeicPart3_4ByIds = (ids: number[]): ToeicPart3_4[] => {
  return mockData.toeicPart3List.filter(p => ids.includes(p.id));
};

const getToeicPart6ByIds = (ids: number[]): ToeicPart6[] => {
  return mockData.toeicPart6List.filter(p => ids.includes(p.id));
};

const getToeicPart7ByIds = (ids: number[]): ToeicPart7[] => {
  return mockData.toeicPart7List?.filter(p => ids.includes(p.id)) || [];
};

const getToeicQuestionsByIds = (ids: number[]): ToeicQuestion[] => {
  return mockData.toeicQuestions.filter(q => ids.includes(q.id));
};

const getToeicAnswersByIds = (ids: number[]): ToeicAnswer[] => {
  return mockData.toeicAnswers.filter(a => ids.includes(a.id));
};

export const toeicService = {
  getToeicById,
  getToeicTests,
  createToeicTest,
  updateToeicTest,
  deleteToeicTest,
  updateToeicScore,
  
  getToeicPart1ByIds,
  getToeicPart2ByIds,
  getToeicPart3_4ByIds,
  getToeicPart6ByIds,
  getToeicPart7ByIds,
  getToeicQuestionsByIds,
  getToeicAnswersByIds
};