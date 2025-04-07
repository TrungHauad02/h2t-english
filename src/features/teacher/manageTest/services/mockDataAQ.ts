import { LessonAnswer, LessonQuestion } from "interfaces";

const generateId = (index: number): number => {
  return parseInt(`${Date.now()}${index}`, 10);
};

const generateAnswers = (questionId: number): LessonAnswer[] => {
  return Array.from({ length: 4 }, (_, index) => ({
    id: generateId(index + 1),
    content: `This is answer ${index + 1}${index === 2 ? " (true)" : ""}`,
    correct: index === 2,
    status: true,
    questionId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};
const generateQuestions = (count: number): LessonQuestion[] => {
  return Array.from({ length: count }, (_, index) => {
    const questionId = generateId(index + 1);
    return {
      id: questionId,
      content: `This is question ${index + 1} ?`,
      explanation: "Explain the answer to you",
      serial: index + 1,
      status: true,
      answers: generateAnswers(questionId),
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};

export const listAQ: LessonQuestion[] = generateQuestions(4);
