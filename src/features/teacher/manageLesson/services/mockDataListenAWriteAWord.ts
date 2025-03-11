import { ListenAndWriteAWord } from "interfaces";

export const mockData: ListenAndWriteAWord[] = [
  {
    id: 1,
    status: true,
    audio: "/basic_listening.mp3",
    serial: 1,
    sentence: "I to eat an apple a day.",
    missingIndex: 1,
    correctAnswer: "like",
    updatedAt: new Date(),
    createdAt: new Date(),
    listeningId: 1,
  },
  {
    id: 2,
    status: true,
    audio: "/basic_listening.mp3",
    serial: 2,
    sentence: "like to eat an apple a day.",
    missingIndex: 0,
    correctAnswer: "I",
    updatedAt: new Date(),
    createdAt: new Date(),
    listeningId: 1,
  },
];
