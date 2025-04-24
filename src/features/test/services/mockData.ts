import {
  Test,
  TestPart,
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  Question,
  Answer,
  TestTypeEnum,
  TestPartTypeEnum,
  CompetitionTest,
  AnswerEnum,
  Toeic,
  ToeicPart1,
  ToeicPart2,
  ToeicPart3_4,
  ToeicPart6,
  ToeicPart7,
  ToeicQuestion,
  ToeicAnswer,
} from "interfaces";

const questions: Question[] = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  content: `Question ${i + 1}`,
  explanation:"1",
  answers: Array.from({ length: 4 }, (_, j) => ({
    id: i * 4 + j + 1,
    content: `Answer ${j + 1} for question ${i + 1}`,
    correct: j === 0,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Answer[],
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const testReadings: TestReading[] = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    file: `reading_${i + 1}.pdf`,
    questions: questions.slice(i * 5, i * 5 + 5).map((q) => q.id),
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
];

const testListenings: TestListening[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  audio: `listening_${i + 1}.mp3`,
  transcript: `Transcript for listening ${i + 1}`,
  questions: questions.slice(50 + i * 5, 50 + i * 5 + 5).map((q) => q.id),
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const testSpeakings: TestSpeaking[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `speaking_${i + 1}.mp4`,
  questions: questions.slice(100 + i * 5, 100 + i * 5 + 5).map((q) => q.id),
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const testWritings: TestWriting[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  topic: `Writing Topic ${i + 1}`,
  minWords: 100,
  maxWords: 500,
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const testParts: TestPart[] = [
  {
    id: 1,
    type: TestPartTypeEnum.VOCABULARY,
    questions: questions.slice(150, 155).map((q) => q.id),
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    type: TestPartTypeEnum.GRAMMAR,
    questions: questions.slice(155, 160).map((q) => q.id),
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    type: TestPartTypeEnum.READING,
    questions: [testReadings[3].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    type: TestPartTypeEnum.LISTENING,
    questions: [testListenings[4].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    type: TestPartTypeEnum.SPEAKING,
    questions: [testSpeakings[0].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    type: TestPartTypeEnum.WRITING,
    questions: [testWritings[0].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    type: TestPartTypeEnum.WRITING,
    questions: [testWritings[1].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    type: TestPartTypeEnum.READING,
    questions: [testReadings[11].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    type: TestPartTypeEnum.READING,
    questions: [testReadings[12].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    type: TestPartTypeEnum.LISTENING,
    questions: [testListenings[13].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    type: TestPartTypeEnum.LISTENING,
    questions: [testListenings[14].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    type: TestPartTypeEnum.SPEAKING,
    questions: [testSpeakings[0].id],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const tests: Test[] = [
  {
    id: 1,
    title: `Mixing Test 1`,
    description: `Mixing test including vocabulary, grammar, reading, listening, speaking, and writing.`,
    duration: 90,
    type: TestTypeEnum.MIXING,
    parts: [1,2,3,4,5,6,7,11],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    title: `Reading Test 1`,
    description: `Mixing test including vocabulary, grammar, reading, listening, speaking, and writing.`,
    duration: 90,
    type: TestTypeEnum.READING,
    parts: [11,12],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 21,
    title: `Listening Test 1`,
    description: `.`,
    duration: 90,
    type: TestTypeEnum.LISTENING,
    parts: [13,14],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 31,
    title: `Speaking Test 1`,
    description: `.`,
    duration: 90,
    type: TestTypeEnum.SPEAKING,
    parts: [5,15],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 41,
    title: `Writing Test 1`,
    description: `.`,
    duration: 90,
    type: TestTypeEnum.WRITING,
    parts: [6,7],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const CompetitionTests: CompetitionTest[] = [
  {
    id: 1,
    title: `Competition Test 1`,
    duration: 90,
    parts: testParts.map((p) => p.id),
    totalQuestions: 30,
    status: true,
    startTime: new Date(),
    endTime: new Date(Date.now() + 90 * 60000), 
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export const toeicMock: Toeic = {
  id: 1,
  title: "Mock TOEIC Test",
  duration: 120,
  questionsPart1: [1,2,3,4,5,6],
  questionsPart2: [1,2],
  questionsPart3:[1,2],
  questionsPart4: [1,2],
  questionsPart5:[1,2,3,4],
  questionsPart6: [1,2],
  questionsPart7: [1,2],
  scoreLastOfTest: 0,
  totalQuestions:200,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: true
};
export const toeicPart1List: ToeicPart1[] = [
  {
    id: 1,
    image: "/direction_part_1.png",
    audio: "/basic_listening.mp3",
    correctAnswer: AnswerEnum.A,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 2,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: AnswerEnum.C,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 3,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: AnswerEnum.C,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 4,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: AnswerEnum.C,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 5,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: AnswerEnum.C,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 6,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: AnswerEnum.C,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  
];
export const toeicPart2List: ToeicPart2[] = [
  {
    id: 1,
    audio: "/audio/p2_q1.mp3",
    correctAnswer: AnswerEnum.B,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  },
  {
    id: 2,
    audio: "/audio/p2_q2.mp3",
    correctAnswer: AnswerEnum.D,
    createdAt: new Date(),
    updatedAt: new Date(),
    transcript : "122222",
    status: true
  }
];
export const toeicPart3_4List : ToeicPart3_4[] = [
  {
    id: 1,
    audio: "/audio/p3_set1.mp3",
    image: "/images/p3_set1.png",
    transcript: "122222",
    questions: [1, 2, 3],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 2,
    audio: "/audio/p3_set1.mp3",
    image: "/images/p3_set1.png",
    transcript: "122222",
    questions: [4, 5, 6],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
];



export const toeicPart6List : ToeicPart6[] =[
  {
    id: 1,
    file: "/document.docx",
    questions: [7, 8, 9, 10],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 2,
    file: "/document.docx",
    questions: [11, 12, 13, 14],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  }
];

export const toeicPart7list : ToeicPart7[] =  [
  {
    id: 1,
    file: "/document.docx",
    questions: [15, 16],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 2,
    file: "/document.docx",
    questions: [17, 18],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
];

export const toeicQuestions: ToeicQuestion[] = [
  {
    id: 1,
    content: "What is the man doing?",
    explanation: "He is writing.",
    answers: [
      { id: 101, content: "Reading", correct: false, questionId: 1, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 102, content: "Sleeping", correct: false, questionId: 1, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 103, content: "Writing", correct: true, questionId: 1, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 104, content: "Cooking", correct: false, questionId: 1, createdAt: new Date(), updatedAt: new Date(), status: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 2,
    content: "Where are they?",
    explanation: "They are in an office.",
    answers: [
      { id: 105, content: "In a restaurant", correct: false, questionId: 2, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 106, content: "In an office", correct: true, questionId: 2, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 107, content: "At home", correct: false, questionId: 2, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 108, content: "In a classroom", correct: false, questionId: 2, createdAt: new Date(), updatedAt: new Date(), status: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 3,
    content: "What will happen next?",
    explanation: "The meeting ends.",
    answers: [
      { id: 109, content: "He will leave", correct: false, questionId: 3, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 110, content: "She will call", correct: false, questionId: 3, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 111, content: "They will meet", correct: false, questionId: 3, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 112, content: "The meeting ends", correct: true, questionId: 3, createdAt: new Date(), updatedAt: new Date(), status: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 15,
    content: "What is the topic of the passage?",
    explanation: "It's an email.",
    answers: [
      { id: 113, content: "A letter", correct: false, questionId: 15, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 114, content: "A memo", correct: false, questionId: 15, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 115, content: "An email", correct: true, questionId: 15, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 116, content: "A news article", correct: false, questionId: 15, createdAt: new Date(), updatedAt: new Date(), status: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  },
  {
    id: 16,
    content: "Who is the author?",
    explanation: "The employee.",
    answers: [
      { id: 117, content: "The boss", correct: false, questionId: 16, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 118, content: "The client", correct: false, questionId: 16, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 119, content: "The supplier", correct: false, questionId: 16, createdAt: new Date(), updatedAt: new Date(), status: true },
      { id: 120, content: "The employee", correct: true, questionId: 16, createdAt: new Date(), updatedAt: new Date(), status: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true
  }
];
const toeicAnswers: ToeicAnswer[] = toeicQuestions.flatMap(q => q.answers);



export const mockData = {
  tests,
  CompetitionTests,
  testParts,
  questions,
  testReadings,
  testListenings,
  testSpeakings,
  testWritings,
  toeic: toeicMock,
  toeicPart1List,
  toeicPart2List,
  toeicPart3_4List,
  toeicPart6List,
  toeicPart7list,
  toeicQuestions,
  toeicAnswers,
};

export { questions };
