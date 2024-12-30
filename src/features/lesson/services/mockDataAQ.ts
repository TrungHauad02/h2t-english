import { Answer, Question } from "interfaces";

const generateId = (prefix: string, index: number) => `${prefix}${index}`;

const generateAnswers = (questionId: string): Answer[] => {
  return Array.from({ length: 4 }, (_, index) => ({
    id: generateId("as", index + 1),
    content: `This is answer ${index + 1}${index === 2 ? " (true)" : ""}`,
    correct: index === 2,
    status: true,
    questionId,
  }));
};

const generateQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, (_, index) => {
    const questionId = generateId("qs", index + 1);
    return {
      id: questionId,
      content: `This is question ${index + 1} ?`,
      explanation: "Explain the answer to you",
      serial: index + 1,
      status: true,
      answers: generateAnswers(questionId),
      lessonId: "1",
    };
  });
};

export const listAQ: Question[] = generateQuestions(4);
