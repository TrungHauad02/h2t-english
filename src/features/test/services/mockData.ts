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
const questions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  content: `Question ${i + 1}`,
  answers: Array.from({ length: 4 }, (_, j) => ({
    id: i * 10 + j + 1,
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
const testReadings: TestReading[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  file: `reading_${i + 1}.pdf`,
  questions: [], 
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const testListenings: TestListening[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  audio: `listening_${i + 1}.mp3`,
  transcript: `Transcript for listening ${i + 1}`,
  questions: [], 
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const testSpeakings: TestSpeaking[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  file: `speaking_${i + 1}.mp4`,
  questions: [],
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const testWritings: TestWriting[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  topic: `Writing Topic ${i + 1}`,
  minWords: 100,
  maxWords: 500,
  status: StatusEnum.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const testParts: TestPart[] = Array.from({ length: 50 }, (_, i) => {
  const type: TestPartTypeEnum =
    i % 6 === 0
      ? TestPartTypeEnum.VOCABULARY
      : i % 5 === 0
      ? TestPartTypeEnum.GRAMMAR
      : i % 4 === 0
      ? TestPartTypeEnum.READING
      : i % 3 === 0
      ? TestPartTypeEnum.LISTENING
      : i % 2 === 0
      ? TestPartTypeEnum.SPEAKING
      : TestPartTypeEnum.WRITING;

  let linkedQuestions: number[] = [];

  if (type === TestPartTypeEnum.VOCABULARY || type === TestPartTypeEnum.GRAMMAR) {
    linkedQuestions = questions.slice(i * 5, i * 5 + 5).map((q) => q.id);
  } else if (type === TestPartTypeEnum.READING) {
    linkedQuestions = testReadings.slice(i % 10, (i % 10) + 1).map((t) => t.id);
  } else if (type === TestPartTypeEnum.LISTENING) {
    linkedQuestions = testListenings.slice(i % 10, (i % 10) + 1).map((t) => t.id);
  } else if (type === TestPartTypeEnum.SPEAKING) {
    linkedQuestions = testSpeakings.slice(i % 10, (i % 10) + 1).map((t) => t.id);
  } else if (type === TestPartTypeEnum.WRITING) {
    linkedQuestions = testWritings.slice(i % 10, (i % 10) + 1).map((t) => t.id);
  }

  return {
    id: i + 1,
    type,
    questions: linkedQuestions, 
    status: StatusEnum.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
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

testReadings.forEach((reading) => {
  reading.questions = testParts
    .filter((part) => part.type === TestPartTypeEnum.READING && part.questions.includes(reading.id))
    .flatMap((part) => part.questions);
});

testListenings.forEach((listening) => {
  listening.questions = testParts
    .filter((part) => part.type === TestPartTypeEnum.LISTENING && part.questions.includes(listening.id))
    .flatMap((part) => part.questions);
});

testSpeakings.forEach((speaking) => {
  speaking.questions = testParts
    .filter((part) => part.type === TestPartTypeEnum.SPEAKING && part.questions.includes(speaking.id))
    .flatMap((part) => part.questions);
});
export const mockData = {
  tests,
  testParts,
  questions,
  testReadings,
  testListenings,
  testSpeakings,
  testWritings,
};
