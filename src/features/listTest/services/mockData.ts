import { Test } from "interfaces";
type TestTypeEnum = "MIXING" | "LISTENING" | "READING"| "SPEAKING"| "WRITING";
const tests: Test[] = [
  // MIXING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Mixed Skills Test ${i + 1}`,
    serial: i + 1,
    duration: 30 + i * 5,
    totalQuestions: 20 + i,
    scoreLastOfTest: 80 - i * 2,
    type: "MIXING" as TestTypeEnum, 
    status: true,
  })),
  // LISTENING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 11}`,
    title: `Listening Practice ${i + 1}`,
    serial: i + 11,
    duration: 15 + i * 5,
    totalQuestions: 15 + i,
    scoreLastOfTest: 75 - i,
    type: "LISTENING" as TestTypeEnum, // Explicitly cast type
    status: true,
  })),
  // READING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 21}`,
    title: `Reading Test ${i + 1}`,
    serial: i + 21,
    duration: 20 + i * 5,
    totalQuestions: 25 + i,
    scoreLastOfTest: 85 - i * 3,
    type: "READING" as TestTypeEnum, 
    status: true,
  })),
  // SPEAKING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 31}`,
    title: `Speaking Practice ${i + 1}`,
    serial: i + 31,
    duration: 10 + i * 5,
    totalQuestions: 10 + i,
    scoreLastOfTest: 70 - i * 2,
    type: "SPEAKING" as TestTypeEnum, 
    status: true,
  })),
  // WRITING
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 41}`,
    title: `Writing Test ${i + 1}`,
    serial: i + 41,
    duration: 25 + i * 5,
    totalQuestions: 30 + i,
    scoreLastOfTest: 90 - i * 4,
    type: "WRITING" as TestTypeEnum, 
    status: true,
  })),
];


export const mockData = {
  tests,
};
