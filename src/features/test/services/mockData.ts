import {
    StatusEnum,
    TestMixingQuestion,
    TestMixingAnswer,
    TestListening,
    TestListeningQuestion,
    TestListeningAnswer,
    TestSpeaking,
    TestSpeakingQuestion,
    TestWriting,
    TestReading,
    TestReadingQuestion,
    TestReadingAnswer,    
  } from "interfaces";
  const testMixingQuestions: TestMixingQuestion[] = Array.from(
    { length: 10 },
    (_, i) => ({
      id: `mixing-question-${i + 1}`,
      content: `This is the content of mixing question ${i + 1}`,
      serial: i + 1,
      status: StatusEnum.ACTIVE,
      explanation: `Explanation for mixing question ${i + 1}`,
      testId: `mixing-${i + 1}`
    })
  );
  
  const testMixingAnswers: TestMixingAnswer[] = testMixingQuestions.flatMap(
    (question) =>
      Array.from({ length: 4 }, (_, k) => ({
        id: `answer-${question.id}-${k + 1}`,
        content: `Answer ${k + 1} for ${question.content}`,
        isCorrect: k === 0,
        status: StatusEnum.ACTIVE,
        testQuestionMixingId: question.id,
      }))
  );
  
  // Danh sách Reading
  const testReadings: TestReading[] = Array.from({ length: 10 }, (_, i) => ({
    id: `reading-${i + 1}`,
    serial: i + 1,
    content: `This is the content of reading test ${i + 1}`,
    image: null,
    status: StatusEnum.ACTIVE,
    testId: `reading-${i + 1}`,
    questions: [],
  }));
  
  const testReadingQuestions: TestReadingQuestion[] = testReadings.flatMap(
    (reading, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        id: `question-${reading.id}-${j + 1}`,
        content: `This is question ${j + 1} of reading test ${reading.serial}`,
        serial: j + 1,
        explanation: `Explanation for question ${j + 1} of reading test ${reading.serial}`,
        status: StatusEnum.ACTIVE,
        testReadingId: reading.id,
      }))
  );
  
  const testReadingAnswers: TestReadingAnswer[] = testReadingQuestions.flatMap(
    (question) =>
      Array.from({ length: 4 }, (_, k) => ({
        id: `answer-${question.id}-${k + 1}`,
        content: `Answer ${k + 1} for ${question.content}`,
        isCorrect: k === 0,
        status: StatusEnum.ACTIVE,
        testQuestionReadingId: question.id,
      }))
  );
  
  const testListenings: TestListening[] = Array.from({ length: 10 }, (_, i) => ({
    id: `listening-${i + 1}`,
    serial: i + 1,
    content: `This is the content of listening test ${i + 1}`,
    transcript: `Transcript of listening test ${i + 1}`,
    status: StatusEnum.ACTIVE,
    testId: `listening-${i + 1}`,
  }));
  
  const testListeningQuestions: TestListeningQuestion[] = testListenings.flatMap(
    (listening, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        id: `question-${listening.id}-${j + 1}`,
        content: `This is question ${j + 1} of listening test ${listening.serial}`,
        serial: j + 1,
        status: StatusEnum.ACTIVE,
        testListeningId: listening.id,
      }))
  );
  
  const testListeningAnswers: TestListeningAnswer[] = testListeningQuestions.flatMap(
    (question) =>
      Array.from({ length: 4 }, (_, k) => ({
        id: `answer-${question.id}-${k + 1}`,
        content: `Answer ${k + 1} for ${question.content}`,
        isCorrect: k === 0,
        status: StatusEnum.ACTIVE,
        testQuestionListeningId: question.id,
      }))
  );
  const testSpeakings: TestSpeaking[] = Array.from({ length: 10 }, (_, i) => ({
    id: `speaking-${i + 1}`,
    serial: i + 1,
    title: `Speaking Test ${i + 1}`,
    status: StatusEnum.ACTIVE,
    testId: `speaking-${i + 1}`,
    questions: [],
  }));
  
  const testSpeakingQuestions: TestSpeakingQuestion[] = testSpeakings.flatMap(
    (speaking, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        id: `question-${speaking.id}-${j + 1}`,
        content: `This is question ${j + 1} of speaking test ${speaking.serial}`,
        serial: j + 1,
        status: StatusEnum.ACTIVE,
        testSpeakingId: speaking.id,
      }))
  );
  
  const testWritings: TestWriting[] = Array.from({ length: 10 }, (_, i) => ({
    id: `writing-${i + 1}`,
    serial: i + 1,
    content: `This is the content of writing test ${i + 1}`,
    status: StatusEnum.ACTIVE,
    testId: `writing-${i + 1}`,
  }));

  
  export const mockData = {
    testMixingQuestions,
    testMixingAnswers,
    testReadings,
    testReadingQuestions,
    testReadingAnswers,
    testListenings,
    testListeningQuestions,
    testListeningAnswers,
    testSpeakings,
    testSpeakingQuestions,
    testWritings,
  };
  