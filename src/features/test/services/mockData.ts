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
    Test
  } from "interfaces";
  type TestTypeEnum = "MIXING" | "LISTENING" | "READING" | "SPEAKING" | "WRITING";
  const testMixingQuestions: TestMixingQuestion[] = Array.from(
    { length: 10 },
    (_, i) => ({
      id: `mixing-question-${i + 1}`,
      content: `This is the content of mixing question ${i + 1}`,
      serial: i + 1,
      status: StatusEnum.ACTIVE,
      explanation: `Explanation for mixing question ${i + 1}`,
      testId: `mixing-${i + 1}`,
      answers: [],
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
  
  testMixingQuestions.forEach((question) => {
    question.answers = testMixingAnswers.filter(
      (answer) => answer.testQuestionMixingId === question.id
    );
  });
  
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
        answers: [],
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
  
  testReadingQuestions.forEach((question) => {
    question.answers = testReadingAnswers.filter(
      (answer) => answer.testQuestionReadingId === question.id
    );
  });
  
  testReadings.forEach((reading) => {
    reading.questions = testReadingQuestions.filter(
      (question) => question.testReadingId === reading.id
    );
  });
  
  // Danh sách Listening
  const testListenings: TestListening[] = Array.from({ length: 10 }, (_, i) => ({
    id: `listening-${i + 1}`,
    serial: i + 1,
    content: `This is the content of listening test ${i + 1}`,
    transcript: `Transcript of listening test ${i + 1}`,
    status: StatusEnum.ACTIVE,
    testId: `listening-${i + 1}`,
    questions: [],
  }));
  
  const testListeningQuestions: TestListeningQuestion[] = testListenings.flatMap(
    (listening, i) =>
      Array.from({ length: 5 }, (_, j) => ({
        id: `question-${listening.id}-${j + 1}`,
        content: `This is question ${j + 1} of listening test ${listening.serial}`,
        serial: j + 1,
        status: StatusEnum.ACTIVE,
        testListeningId: listening.id,
        answers: [],
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
  
  testListeningQuestions.forEach((question) => {
    question.answers = testListeningAnswers.filter(
      (answer) => answer.testQuestionListeningId === question.id
    );
  });
  
  testListenings.forEach((listening) => {
    listening.questions = testListeningQuestions.filter(
      (question) => question.testListeningId === listening.id
    );
  });
  
  // Danh sách Speaking
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
  
  testSpeakings.forEach((speaking) => {
    speaking.questions = testSpeakingQuestions.filter(
      (question) => question.testSpeakingId === speaking.id
    );
  });
  
  // Danh sách Writing
  const testWritings: TestWriting[] = Array.from({ length: 10 }, (_, i) => ({
    id: `writing-${i + 1}`,
    serial: i + 1,
    content: `This is the content of writing test ${i + 1}`,
    status: StatusEnum.ACTIVE,
    testId: `writing-${i + 1}`,
  }));

  const tests: Test[] = [
    // MIXING
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Mixed Skills Test ${i + 1}`,
      serial: i + 1,
      duration: 30 + i * 5,
      totalQuestions: 20 + i,
      scoreLastOfTest: 80 - i * 2,
      type: "MIXING" as TestTypeEnum,
      status: StatusEnum.ACTIVE,
      testMixingQuestions: [],
      testReadings: [],
      testListening: [],
      testSpeaking: [],
      testWriting: []
    })),
    // LISTENING
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `listening-${i + 1}`, // ID liên kết với idTest trong TestListening
      title: `Listening Practice ${i + 1}`,
      serial: i + 11,
      duration: 15 + i * 5,
      totalQuestions: 15 + i,
      scoreLastOfTest: 75 - i,
      type: "LISTENING" as TestTypeEnum,
      status: StatusEnum.ACTIVE,
      testMixingQuestions: [],
      testReadings: [],
      testListening: [],
      testSpeaking: [],
      testWriting: []
    })),
    // READING
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `reading-${i + 1}`, // ID liên kết với idTest trong TestReading
      title: `Reading Test ${i + 1}`,
      serial: i + 21,
      duration: 20 + i * 5,
      totalQuestions: 25 + i,
      scoreLastOfTest: 85 - i * 3,
      type: "READING" as TestTypeEnum, 
      status: StatusEnum.ACTIVE,
      testMixingQuestions: [],
      testReadings: [],
      testListening: [],
      testSpeaking: [],
      testWriting: []
    })),
    // SPEAKING
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `speaking-${i + 1}`, // ID liên kết với idTest trong TestSpeaking
      title: `Speaking Practice ${i + 1}`,
      serial: i + 31,
      duration: 10 + i * 5,
      totalQuestions: 10 + i,
      scoreLastOfTest: 70 - i * 2,
      type: "SPEAKING" as TestTypeEnum, 
      status: StatusEnum.ACTIVE,
      testMixingQuestions: [],
      testReadings: [],
      testListening: [],
      testSpeaking: [],
      testWriting: []
    })),
    // WRITING
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `writing-${i + 1}`, // ID liên kết với idTest trong TestWriting
      title: `Writing Test ${i + 1}`,
      serial: i + 41,
      duration: 25 + i * 5,
      totalQuestions: 30 + i,
      scoreLastOfTest: 90 - i * 4,
      type: "WRITING" as TestTypeEnum, 
      status: StatusEnum.ACTIVE,
      testMixingQuestions: [],
      testReadings: [],
      testListening: [],
      testSpeaking: [],
      testWriting: []
    })),
  ];
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
    tests,
  };
  