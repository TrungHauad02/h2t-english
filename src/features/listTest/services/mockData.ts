import { Test, StatusEnum,TestTypeEnum } from "interfaces";

const tests: Test[] = [
  // MIXING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `mixing-${i + 1}`,
    title: `Mixed Skills Test ${i + 1}`,
    serial: i + 1,
    duration: 30 + i * 5,
    totalQuestions: 20 + i,
    scoreLastOfTest: 80 - i * 2,
    type: TestTypeEnum.MIXING,
    status: StatusEnum.ACTIVE,
  })),
  // LISTENING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `listening-${i + 1}`, // ID liên kết với idTest trong TestListening
    title: `Listening Practice ${i + 1}`,
    serial: i + 11,
    duration: 15 + i * 5,
    totalQuestions: 15 + i,
    scoreLastOfTest: 75 - i,
    type: TestTypeEnum.LISTENING,
    status: StatusEnum.ACTIVE,
  })),
  // READING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `reading-${i + 1}`, // ID liên kết với idTest trong TestReading
    title: `Reading Test ${i + 1}`,
    serial: i + 21,
    duration: 20 + i * 5,
    totalQuestions: 25 + i,
    scoreLastOfTest: 85 - i * 3,
    type: TestTypeEnum.READING, 
    status: StatusEnum.ACTIVE,
  })),
  // SPEAKING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `speaking-${i + 1}`, // ID liên kết với idTest trong TestSpeaking
    title: `Speaking Practice ${i + 1}`,
    serial: i + 31,
    duration: 10 + i * 5,
    totalQuestions: 10 + i,
    scoreLastOfTest: 70 - i * 2,
    type: TestTypeEnum.SPEAKING, 
    status: StatusEnum.ACTIVE,
  })),
  // WRITING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `writing-${i + 1}`, // ID liên kết với idTest trong TestWriting
    title: `Writing Test ${i + 1}`,
    serial: i + 41,
    duration: 25 + i * 5,
    totalQuestions: 30 + i,
    scoreLastOfTest: 90 - i * 4,
    type: TestTypeEnum.WRITING, 
    status: StatusEnum.ACTIVE,
  })),
];

export const mockData = {
  tests,
};
