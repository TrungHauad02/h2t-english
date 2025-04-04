import { Test, TestTypeEnum, CompetitionTest,Toeic } from "interfaces";

const tests: Test[] = Object.values(TestTypeEnum).flatMap((type, typeIndex) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: typeIndex * 10 + i + 1,
    title: `${type} Test ${i + 1}`,
    description: `${type} test to assess skills in ${type.toLowerCase()}.`,
    duration: 10 + i * 5 + (typeIndex % 2 === 0 ? 5 : 0),
    totalQuestions: 15 + i * 2,
    scoreLastOfTest: i % 2 === 0 ? Math.floor(Math.random() * 101) : null,
    type,
    parts: Array.from(
      { length: Math.min(3, (i % 3) + 1) },
      (_, j) => i * 5 + typeIndex * 10 + j + 1
    ),
    routeNodeId: i + 100 + typeIndex * 10,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
);

const competitionTests: CompetitionTest[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "English Championship 2025",
    duration: 120,
    totalQuestions: 50,
    startTime: new Date("2025-03-01T10:00:00"),
    endTime: new Date("2025-03-01T12:00:00"),
    parts: [1, 2, 3],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Advanced Listening Competition",
    duration: 60,
    totalQuestions: 50,
    startTime: new Date("2025-03-22T14:00:00"),
    endTime: new Date("2025-03-23T15:00:00"),
    parts: [4],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Speaking Skills Contest",
    duration: 30,
    totalQuestions: 50,
    startTime: new Date("2025-04-03T09:00:00"),
    endTime: new Date("2025-04-03T09:30:00"),
    parts: [5],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Writing Challenge",
    duration: 90,
    totalQuestions: 50,
    startTime: new Date("2025-04-04T13:00:00"),
    endTime: new Date("2025-04-04T14:30:00"),
    parts: [6],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "General English Test",
    duration: 100,
    totalQuestions: 50,
    startTime: new Date("2025-04-05T11:00:00"),
    endTime: new Date("2025-04-05T13:20:00"),
    parts: [1, 2, 3, 4, 5, 6],
  },
];
const toeics: Toeic[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `TOEIC Practice Test ${i + 1}`,
  duration: 120,
  questionsPart1: [1,2],
  questionsPart2: [1,2],
  questionsPart3:[1,2],
  questionsPart4: [1,2],
  questionsPart5: [1,2],
  questionsPart6: [1,2],
  questionsPart7: [1,2],
  totalQuestions: 200,
  scoreLastOfTest: i % 2 === 0 ? Math.floor(Math.random() * 201) : null,
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const mockData = {
  tests,
  toeics,
  competitionTests,
};
