import {
  Test,
  CompetitionTest,
  TestPart,
  TestReading,
  TestListening,
  TestSpeaking,
  TestWriting,
  Question,
  SubmitTest,
  SubmitToeic,
  SubmitCompetition,
  TestTypeEnum,
  TestPartTypeEnum,
  SubmitTestAnswer,
  SubmitTestSpeaking,
  SubmitTestWriting,
  SubmitCompetitionAnswer,
  SubmitCompetitionSpeaking,
  SubmitCompetitionWriting,
  SubmitToeicPart1,
  SubmitToeicPart2,
  AnswerEnum,
  SubmitToeicAnswer

} from "interfaces";

const test: Test[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "English Level Test",
    description: "A comprehensive English test to assess all language skills.",
    type: TestTypeEnum.MIXING,
    duration: 90,
    parts: [1, 2, 3],
    totalQuestions: 100,
    scoreLastOfTest: null,
    routeNodeId: 101,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Reading Comprehension Test",
    description:
      "Test to evaluate reading comprehension and analytical skills.",
    type: TestTypeEnum.READING,
    duration: 60,
    parts: [3],
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 102,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Listening Skills Assessment",
    description: "A test for evaluating listening comprehension and response.",
    type: TestTypeEnum.LISTENING,
    duration: 45,
    parts: [4],
    totalQuestions: 20,
    scoreLastOfTest: null,
    routeNodeId: 103,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Speaking Test",
    description: "An oral examination to assess speaking proficiency.",
    type: TestTypeEnum.SPEAKING,
    duration: 20,
    parts: [5],
    totalQuestions: 10,
    scoreLastOfTest: null,
    routeNodeId: 104,
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Writing Proficiency Test",
    description: "A writing test to evaluate writing skills in English.",
    type: TestTypeEnum.WRITING,
    duration: 60,
    parts: [6],
    totalQuestions: 1,
    scoreLastOfTest: null,
    routeNodeId: 105,
  },
];

const competitionTest: CompetitionTest[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "English Championship 2025",
    duration: 120,
    totalQuestions:50,
    startTime: new Date("2025-04-01T10:00:00"),
    endTime: new Date("2025-04-01T12:00:00"),
    parts: [1, 2, 3],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Advanced Listening Competition",
    duration: 60,
    totalQuestions:50,
    startTime: new Date("2025-04-02T14:00:00"),
    endTime: new Date("2025-04-02T15:00:00"),
    parts: [4],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Speaking Skills Contest",
    duration: 30,
    totalQuestions:50,
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
    totalQuestions:50,
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
    totalQuestions:50,
    startTime: new Date("2025-04-05T11:00:00"),
    endTime: new Date("2025-04-05T13:20:00"),
    parts: [1, 2, 3, 4, 5, 6],
  },
];

const testPart: TestPart[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TestPartTypeEnum.VOCABULARY,
    questions: [1, 2, 3, 4],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TestPartTypeEnum.GRAMMAR,
    questions: [5, 6, 7, 8],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TestPartTypeEnum.READING,
    questions: [9, 10, 11, 12],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TestPartTypeEnum.LISTENING,
    questions: [13, 14, 15],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: TestPartTypeEnum.WRITING,
    questions: [16],
  },
];

const testReading: TestReading[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "reading_test_1.pdf",
    questions: [9, 10, 11, 12],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "reading_test_2.pdf",
    questions: [9, 10, 11],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "reading_test_3.pdf",
    questions: [9, 10, 12],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "reading_test_4.pdf",
    questions: [11, 12],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "reading_test_5.pdf",
    questions: [9, 10],
  },
];

const testListening: TestListening[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: "listening_test_1.mp3",
    transcript: "This is the transcript of the listening test.",
    questions: [13, 14, 15],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: "listening_test_2.mp3",
    transcript: "Another listening test transcript.",
    questions: [13, 14],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: "listening_test_3.mp3",
    transcript: "The transcript for the third listening test.",
    questions: [14, 15],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: "listening_test_4.mp3",
    transcript: "Transcript of the fourth listening test.",
    questions: [13],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: "listening_test_5.mp3",
    transcript: "Transcript of the fifth listening test.",
    questions: [15],
  },
];

const testSpeaking: TestSpeaking[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "speaking_test_1.mp4",
    questions: [16],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "speaking_test_2.mp4",
    questions: [16],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "speaking_test_3.mp4",
    questions: [16],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "speaking_test_4.mp4",
    questions: [16],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "speaking_test_5.mp4",
    questions: [16],
  },
];

const testWriting: TestWriting[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: "Describe your favorite holiday.",
    minWords: 150,
    maxWords: 250,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: "Discuss the advantages of online learning.",
    minWords: 200,
    maxWords: 300,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: "Write about a memorable event in your life.",
    minWords: 100,
    maxWords: 200,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: "Describe the benefits of regular exercise.",
    minWords: 180,
    maxWords: 250,
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: "Write an essay on the importance of teamwork.",
    minWords: 200,
    maxWords: 300,
  },
];

const question: Question[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "What is the capital of France?",
    explanation:"1",
    answers: [
      { id: 1, questionId:1,status: true, content: "Paris", correct: true },
      { id: 2, questionId:1,status: true, content: "London", correct: false },
      { id: 3,questionId:1, status: true, content: "Berlin", correct: false },
    ],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "Which language is spoken in Brazil?",
    explanation:"1",
    answers: [
      { id: 1,questionId:2, status: true, content: "Portuguese", correct: true },
      { id: 2,questionId:2, status: true, content: "Spanish", correct: false },
      { id: 3,questionId:2, status: true, content: "French", correct: false },
    ],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "What is 5 + 5?",
    explanation:"1",
    answers: [
      { id: 1, questionId:3, status: true, content: "10", correct: true },
      { id: 2,  questionId:3, status: true, content: "12", correct: false },
      { id: 3,  questionId:3,status: true, content: "8", correct: false },
    ],
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "Who wrote 'Romeo and Juliet'?",
    explanation:"1",
    answers: [
      { id: 1, status: true,questionId:4, content: "William Shakespeare", correct: true },
      { id: 2, status: true,questionId:4, content: "Charles Dickens", correct: false },
      { id: 3, status: true,questionId:4, content: "Mark Twain", correct: false },
    ],
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: "What is the largest planet in our solar system?",
    explanation:"1",
    answers: [
      { id: 1,questionId:5, status: true, content: "Jupiter", correct: true },
      { id: 2,questionId:5, status: true, content: "Earth", correct: false },
      { id: 3,questionId:5, status: true, content: "Saturn", correct: false },
    ],
  },
];

const submitTest: SubmitTest[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 101,
    test_id: 1,
    score: 85,
    comment: "Good performance overall.",
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 102,
    test_id: 2,
    score: 70,
    comment: "Needs improvement in reading skills.",
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 103,
    test_id: 3,
    score: 90,
    comment: "Excellent listening skills!",
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 104,
    test_id: 4,
    score: 80,
    comment: "Good speaking test performance.",
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 105,
    test_id: 5,
    score: 75,
    comment: "Writing was below expectations.",
  },
];

const submitToeic: SubmitToeic[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 101,
    toeic_id: 1,
    score: 800,
    comment: "Well done!",
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 102,
    toeic_id: 2,
    score: 750,
    comment: "Can improve on listening.",
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 103,
    toeic_id: 3,
    score: 850,
    comment: "Great score!",
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 104,
    toeic_id: 4,
    score: 790,
    comment: "Good score, needs improvement in reading.",
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 105,
    toeic_id: 5,
    score: 720,
    comment: "Needs more practice.",
  },
];

const submitCompetition: SubmitCompetition[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 101,
    competition_id: 1,
    score: 90,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 102,
    competition_id: 2,
    score: 80,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 103,
    competition_id: 3,
    score: 95,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 104,
    competition_id: 4,
    score: 85,
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 105,
    competition_id: 5,
    score: 78,
  },
];
const submitTestAnswer: SubmitTestAnswer[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitTest_id: 1,
    question_id: 1,
    answer_id: 1,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitTest_id: 1,
    question_id: 2,
    answer_id: 1,
  },
];

const submitTestSpeaking: SubmitTestSpeaking[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    file: "1",
    submitTest_id: 1,
    question_id: 16,
    transcript: "I like to travel to the mountains during holidays.",
    score: 4,
    comment: "Clear and fluent response."
  },
];

const submitTestWriting: SubmitTestWriting[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitTest_id: 1,
    testWriting_id: 1,
    content: "My favorite holiday is Lunar New Year because...",
    score: 7,
    comment: "Good structure and ideas. Some grammar mistakes."
  },
];
const submitCompetitionAnswer: SubmitCompetitionAnswer[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitCompetition_id: 1,
    question_id: 601,
    answer_id: 701,
  },
];

const submitCompetitionSpeaking: SubmitCompetitionSpeaking[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitCompetition_id: 1,
    question_id: 801,
    transcript: "Competition speaking transcript",
    score: 9,
  },
];

const submitCompetitionWriting: SubmitCompetitionWriting[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitCompetition_id: 1,
    CompetitionWriting_id: 901,
    content: "Competition writing content",
    score: 8,
  },
];


export const submitToeicPart1: SubmitToeicPart1[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 1,
    answer: AnswerEnum.A,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 2,
    answer: AnswerEnum.A,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 3,
    answer: AnswerEnum.A,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 4,
    answer: AnswerEnum.A,
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 5,
    answer: AnswerEnum.C,
  },
  {
    id: 6,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart1Id: 6,
    answer: AnswerEnum.B,
  },
];

export const submitToeicPart2: SubmitToeicPart2[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart2Id: 1,
    answer: AnswerEnum.B,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicPart2Id: 2,
    answer: AnswerEnum.B,
  },
];

export const submitToeicAnswers: SubmitToeicAnswer[] = [
  // Part 3_4
  {
    id: 1,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 101,
    toeicAnswerId: 1001,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 102,
    toeicAnswerId: 1003,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 103,
    toeicAnswerId: 1004,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 104,
    toeicAnswerId: 1001,
  },
  {
    id: 5,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 105,
    toeicAnswerId: 1003,
  },
  {
    id: 6,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 106,
    toeicAnswerId: 1004,
  },

  // Part 5
  {
    id: 7,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 201,
    toeicAnswerId: 2003,
  },
  {
    id: 8,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 202,
    toeicAnswerId: 2003,
  },
  {
    id: 9,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 203,
    toeicAnswerId: 2003,
  },
  {
    id: 10,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 204,
    toeicAnswerId: 2003,
  },

  // Part 6 (4 câu / đoạn)
  {
    id: 11,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 301,
    toeicAnswerId: 3001,
  },
  {
    id: 12,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 302,
    toeicAnswerId: 3002,
  },
  {
    id: 13,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 303,
    toeicAnswerId: 3003,
  },
  {
    id: 14,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 304,
    toeicAnswerId: 3004,
  },
  {
    id: 15,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 305,
    toeicAnswerId: 3001,
  },
  {
    id: 16,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 306,
    toeicAnswerId: 3002,
  },
  {
    id: 17,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 307,
    toeicAnswerId: 3003,
  },
  {
    id: 18,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 308,
    toeicAnswerId: 3004,
  },

  // Part 7
  {
    id: 19,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 401,
    toeicAnswerId: 4002,
  },
  {
    id: 20,
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    submitToeicId: 1,
    toeicQuestionId: 402,
    toeicAnswerId: 4002,
  },
];



export const mockData = {
  test,
  competitionTest,
  testPart,
  testReading,
  testListening,
  testSpeaking,
  testWriting,
  question,
  submitTest,
  submitToeic,
  submitCompetition,
  submitTestAnswer,
  submitTestSpeaking,
  submitTestWriting,
  submitCompetitionAnswer,
  submitCompetitionSpeaking,
  submitCompetitionWriting,
  submitToeicPart1,
  submitToeicPart2,
  submitToeicAnswers

};
