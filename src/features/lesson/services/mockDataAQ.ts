import { Answer, Question } from "interfaces";

const listAnswer: Answer[] = [
  {
    id: "as1",
    content: "This is answer 1",
    correct: false,
    status: true,
    questionId: "qs1",
  },
  {
    id: "as2",
    content: "This is answer 2",
    correct: false,
    status: true,
    questionId: "qs1",
  },
  {
    id: "as3",
    content: "This is answer 3 (true)",
    correct: true,
    status: true,
    questionId: "qs1",
  },
  {
    id: "as4",
    content: "This is answer 4",
    correct: false,
    status: true,
    questionId: "qs1",
  },
];

export const listAQ: Question[] = [
  {
    id: "qs1",
    content: "This is question 1 ?",
    explanation: "Explain the answer to you",
    serial: 1,
    status: true,
    answers: listAnswer,
    lessonId: "1",
  },
  {
    id: "qs2",
    content: "This is question 2 ?",
    explanation: "Explain the answer to you",
    serial: 2,
    status: true,
    answers: listAnswer,
    lessonId: "1",
  },
  {
    id: "qs3",
    content: "This is question 3 ?",
    explanation: "Explain the answer to you",
    serial: 3,
    status: true,
    answers: listAnswer,
    lessonId: "1",
  },
  {
    id: "qs4",
    content: "This is question 4 ?",
    explanation: "Explain the answer to you",
    serial: 4,
    status: true,
    answers: listAnswer,
    lessonId: "1",
  },
];
