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
  Toeic,
  ToeicPart1,
  ToeicPart2,
  ToeicPart3_4,
  ToeicPart6,
  ToeicPart7,
  AnswerEnum,
  ToeicQuestion,
  ToeicAnswer,
} from "interfaces";

const questions: Question[] = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  content: `Question ${i + 1}`,
  explanation: `Explanation for question ${i + 1}`,
  answers: Array.from({ length: 4 }, (_, j) => ({
    id: i * 4 + j + 1,
    content: `Answer ${j + 1} for question ${i + 1}`,
    correct: j === 0,
    questionId:i+1,
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
  title: `School`,
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
    parts: [1,2,3,4,5,6,7,11,13,14,15],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 1,
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
    routeNodeId: 1,
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
  questionsPart1: [1, 2,3,4,5,6],
  questionsPart2: [1, 2],
  questionsPart3: [1, 2],
  questionsPart4: [1, 2],
  questionsPart5: [1, 2],
  questionsPart6: [1, 2],
  questionsPart7: [1, 2],
  totalQuestions: 200, // Fixed value as per interface
  scoreLastOfTest: i % 2 === 0 ? Math.floor(Math.random() * 990) + 10 : null, // Random score between 10-990
  status: i % 3 === 0 ? false : true, // Mix of published/unpublished
  createdAt: new Date(Date.now() - i * 86400000), // Different creation dates
  updatedAt: new Date(),
}));

// TOEIC Part 1 data (Photographs)
const toeicPart1s: ToeicPart1[] = [
  {
    id: 1,
    image: "/direction_part_1.png",
    audio: "/basic_listening1.mp3",
    correctAnswer: "A" as AnswerEnum,
    transcript: "The man is standing near the building.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    image: "https://example.com/toeic/part1/image2.jpg",
    audio: "https://example.com/toeic/part1/audio2.mp3",
    correctAnswer: "C" as AnswerEnum,
    transcript: "The woman is sitting at her desk.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    image: "https://example.com/toeic/part1/image2.jpg",
    audio: "https://example.com/toeic/part1/audio2.mp3",
    correctAnswer: "C" as AnswerEnum,
    transcript: "The woman is sitting at her desk.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    image: "https://example.com/toeic/part1/image2.jpg",
    audio: "https://example.com/toeic/part1/audio2.mp3",
    correctAnswer: "C" as AnswerEnum,
    transcript: "The woman is sitting at her desk.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    image: "https://example.com/toeic/part1/image2.jpg",
    audio: "https://example.com/toeic/part1/audio2.mp3",
    correctAnswer: "C" as AnswerEnum,
    transcript: "The woman is sitting at her desk.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    image: "https://example.com/toeic/part1/image2.jpg",
    audio: "https://example.com/toeic/part1/audio2.mp3",
    correctAnswer: "C" as AnswerEnum,
    transcript: "The woman is sitting at her desk.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// TOEIC Part 2 data (Question-Response)
const toeicPart2s: ToeicPart2[] = [
  {
    id: 1,
    audio: "https://example.com/toeic/part2/audio1.mp3",
    correctAnswer: "B" as AnswerEnum,
    transcript: "Where is the meeting room? - It's on the second floor.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    audio: "https://example.com/toeic/part2/audio2.mp3",
    correctAnswer: "A" as AnswerEnum,
    transcript: "When will the report be ready? - By the end of the day.",
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];



// TOEIC Part 3 data (Conversations)
const toeicPart3List: ToeicPart3_4[] = [
  {
    id: 1,
    audio: "https://example.com/toeic/part3/audio1.mp3",
    image: "",
    transcript: "Man: I'm thinking about taking a vacation next month.\nWoman: That sounds nice. Where are you planning to go?\nMan: I'm considering either Hawaii or Japan.\nWoman: Both are great choices. Have you checked the weather for that time of year?",
    questions: [1, 2, 3],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    audio: "https://example.com/toeic/part3/audio2.mp3",
    image: "",
    transcript: "Woman: Have you finished the quarterly report?\nMan: I'm still working on it. The data analysis is taking longer than I expected.\nWoman: Do you need any help?\nMan: Actually, if you could review the marketing section, that would be great.",
    questions: [4, 5, 6],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// TOEIC Part 4 data (Talks)
const toeicPart4List: ToeicPart3_4[] = [
  {
    id: 1,
    audio: "https://example.com/toeic/part4/audio1.mp3",
    image: "",
    transcript: "Attention shoppers. Our annual spring sale begins today and will continue through the weekend. You'll find discounts of up to 50% on selected items throughout the store. In addition, if you spend over $100, you'll receive a free gift at checkout. Store hours will be extended until 9 PM on Friday and Saturday. Thank you for shopping with us.",
    questions: [7, 8, 9],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    audio: "https://example.com/toeic/part4/audio2.mp3",
    image: "",
    transcript: "Good morning everyone. I'd like to remind you that the company picnic is scheduled for this Saturday at Central Park. We'll be meeting at the south entrance at 11 AM. The company will provide the main dishes, but we're asking everyone to bring a side dish or dessert to share. If you haven't signed up yet, please do so by the end of today. In case of rain, we'll reschedule for the following weekend.",
    questions: [10, 11, 12],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// TOEIC Part 6 data (Text Completion)
const toeicPart6List: ToeicPart6[] = [
  {
    id: 1,
    file: "Dear Mr. Thompson,\n\nThank you for your interest in our company. We have received your application for the position of Marketing Manager. After careful consideration of your qualifications and experience, we would like to invite you for an interview.\n\nThe interview is scheduled for next Tuesday at 2 PM at our head office. Please bring your portfolio and any additional documents that might be relevant to your application.\n\nIf you have any questions or if the suggested time is not convenient for you, please do not hesitate to contact me.\n\nWe look forward to meeting you.\n\nSincerely,\nSarah Johnson\nHR Manager",
    questions: [1,2],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    file: "MEMO\n\nTO: All Staff\nFROM: Office Management\nDATE: March 15, 2023\nSUBJECT: Office Relocation\n\nPlease be informed that our office will be relocating to a new building effective April 1, 2023. The new office is located at 123 Business Avenue, about 2 miles from our current location.\n\nDuring the weekend of March 25-26, all office equipment and furniture will be moved to the new location. Please ensure that you pack all personal items from your desk by Friday, March 24.\n\nParking will be available in the underground garage. Access cards will be distributed on March 30.\n\nIf you have any questions regarding the relocation, please contact the Office Management team.",
    questions: [17, 18, 19, 20],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// TOEIC Part 7 data (Reading Comprehension)
const toeicPart7List: ToeicPart7[] = [
  {
    id: 1,
    file: "./document.docx",
    questions: [1, 2, 3],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    file: "./document.docx",
    questions: [4, 5, 6],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];


// TOEIC Questions
const toeicQuestions: ToeicQuestion[] = [
  {
    id: 1,
    content: "What is the man planning to do?",
    explanation: "The conversation reveals the man is thinking about taking a vacation next month.",
    toeicAnswers: [
      { 
        id: 1, 
        content: "Change his job", 
        correct: false, 
        questionId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 2, 
        content: "Take a vacation", 
        correct: true, 
        questionId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 3, 
        content: "Move to a new city", 
        correct: false, 
        questionId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 4, 
        content: "Visit his family", 
        correct: false, 
        questionId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// TOEIC Answers
const toeicAnswers: ToeicAnswer[] = toeicQuestions.flatMap(q => q.toeicAnswers);



export const mockData = {
  tests,
  CompetitionTests,
  toeics,
  testParts,
  questions,
  testReadings,
  testListenings,
  testSpeakings,
  testWritings,
  // Add TOEIC-specific data
  toeicPart1s,
  toeicPart2s,
  toeicPart3List,
  toeicPart4List,
  toeicPart6List,
  toeicPart7List,
  toeicQuestions,
  toeicAnswers,
};

export { questions };
