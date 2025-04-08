import { mockData } from "./mockData";
import { Toeic, Question } from "interfaces";
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

const getToeicQuestions = (toeicId: number): { [part: string]: Question[] } => {
  const toeic = getToeicById(toeicId);
  if (!toeic) return {};
  
  return {
    part1: mockData.questions.filter(q => toeic.questionsPart1.includes(q.id)),
    part2: mockData.questions.filter(q => toeic.questionsPart2.includes(q.id)),
    part3: mockData.questions.filter(q => toeic.questionsPart3.includes(q.id)),
    part4: mockData.questions.filter(q => toeic.questionsPart4.includes(q.id)),
    part5: mockData.questions.filter(q => toeic.questionsPart5.includes(q.id)),
    part6: mockData.questions.filter(q => toeic.questionsPart6.includes(q.id)),
    part7: mockData.questions.filter(q => toeic.questionsPart7.includes(q.id)),
  };
};

export const toeicService = {
  getToeicById,
  getToeicTests,
  createToeicTest,
  updateToeicTest,
  deleteToeicTest,
  updateToeicScore,
  getToeicQuestions
};