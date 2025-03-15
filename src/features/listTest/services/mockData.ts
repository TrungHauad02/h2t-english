import { Test, StatusEnum, TestTypeEnum } from "interfaces";

const tests: Test[] = Object.values(TestTypeEnum).flatMap((type, typeIndex) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: typeIndex * 10 + i + 1,
    title: `${type} Test ${i + 1}`,
    description: `${type} test to assess skills in ${type.toLowerCase()}.`,
    duration: 10 + i * 5 + (typeIndex % 2 === 0 ? 5 : 0),
    totalQuestions: 15 + i * 2,
    scoreLastOfTest: 90 - i * (typeIndex + 1),
    type,
    parts: Array.from({ length: Math.min(3, i % 3 + 1) }, (_, j) => i * 5 + typeIndex * 10 + j + 1), 
    routeNodeId: i + 100 + typeIndex * 10,
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
);


export const mockData = {
  tests,
};
