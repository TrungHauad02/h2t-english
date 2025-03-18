import {
  StatusEnum,
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
} from "interfaces";

// 📌 Tạo danh sách câu hỏi (200 câu hỏi)
const questions: Question[] = Array.from({ length: 210 }, (_, i) => ({
  id: i + 1,
  content: `Question ${i + 1}`,
  answers: Array.from({ length: 4 }, (_, j) => ({
    id: i * 4 + j + 1,
    content: `Answer ${j + 1} for question ${i + 1}`,
    correct: j === 0,
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as Answer[],
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// 📌 Danh sách bài đọc (Reading)
const testReadings: TestReading[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    file: `reading_${i + 1}.pdf`,
    questions: questions.slice(i * 5, i * 5 + 5).map((q) => q.id),
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  {
    id: 11, // ✅ Thêm bài đọc mới
    file: `reading_11.pdf`,
    questions: questions.slice(200, 205).map((q) => q.id), // Lấy 5 câu cuối cùng
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12, // ✅ Thêm bài đọc mới
    file: `reading_12.pdf`,
    questions: questions.slice(205, 210).map((q) => q.id), // Lấy 5 câu cuối cùng
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 📌 Danh sách bài nghe (Listening)
const testListenings: TestListening[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  audio: `listening_${i + 1}.mp3`,
  transcript: `Transcript for listening ${i + 1}`,
  questions: questions.slice(50 + i * 5, 50 + i * 5 + 5).map((q) => q.id),
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// 📌 Danh sách bài nói (Speaking)
const testSpeakings: TestSpeaking[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  file: `speaking_${i + 1}.mp4`,
  questions: questions.slice(100 + i * 5, 100 + i * 5 + 5).map((q) => q.id),
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// 📌 Danh sách bài viết (Writing)
const testWritings: TestWriting[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  topic: `Writing Topic ${i + 1}`,
  minWords: 100,
  maxWords: 500,
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// 📌 Danh sách phần bài kiểm tra (Test Parts)
const testParts: TestPart[] = [
  {
    id: 1,
    type: TestPartTypeEnum.VOCABULARY,
    questions: questions.slice(150, 155).map((q) => q.id),
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    type: TestPartTypeEnum.GRAMMAR,
    questions: questions.slice(155, 160).map((q) => q.id),
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    type: TestPartTypeEnum.READING,
    questions: [testReadings[0].id],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    type: TestPartTypeEnum.LISTENING,
    questions: [testListenings[0].id],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    type: TestPartTypeEnum.SPEAKING,
    questions: [testSpeakings[0].id],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    type: TestPartTypeEnum.WRITING,
    questions: [testWritings[0].id],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11, // ✅ Thêm phần Reading mới
    type: TestPartTypeEnum.READING,
    questions: testReadings.find((r) => r.id === 11)?.questions || [],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12, // ✅ Thêm phần Reading mới
    type: TestPartTypeEnum.READING,
    questions: testReadings.find((r) => r.id === 12)?.questions || [],
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 📌 Danh sách bài kiểm tra (Tests)
const tests: Test[] = [
  {
    id: 1,
    title: `Mixing Test 1`,
    description: `Mixing test including vocabulary, grammar, reading, listening, speaking, and writing.`,
    duration: 90,
    type: TestTypeEnum.MIXING,
    parts: testParts.map((p) => p.id),
    totalQuestions: 30,
    scoreLastOfTest: null,
    routeNodeId: 101,
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11, // ✅ Thêm bài kiểm tra Reading mới
    title: `Reading Test 11`,
    description: `A dedicated reading test with multiple questions.`,
    duration: 60, // 60 phút
    type: TestTypeEnum.READING, // Định dạng bài kiểm tra Reading
    parts: [11,12], // Chỉ bao gồm phần Reading mới tạo
    totalQuestions: testParts.find((p) => p.id === 11)?.questions.length || 0,
    scoreLastOfTest: null,
    routeNodeId: 102,
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 📌 Xuất dữ liệu
export const mockData = {
  tests,
  testParts,
  questions,
  testReadings,
  testListenings,
  testSpeakings,
  testWritings,
};

export { questions };
