export const enum TestTypeEnum {
  MIXING = "MIXING",
  READING = "READING",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  WRITING = "WRITING",
}

export const enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}
export interface Test {
  id: string;
  title: string;
  serial: number;
  duration: number;
  totalQuestions: number;
  scoreLastOfTest: number | null;
  type: TestTypeEnum;
  status: StatusEnum;
}
export interface TestMixingQuestion {
  id: string;
  content: string;
  serial: number;
  status: StatusEnum;
  explanation: string;
  testId: string;
}

export interface TestMixingAnswer {
  id: string;
  content: string;
  isCorrect: boolean;
  status: StatusEnum;
  testQuestionMixingId: string;
}
export interface TestReading {
  id: string;
  serial: number;
  content: string;
  image: string | null;
  status: StatusEnum;
  testId: string;
}

export interface TestReadingQuestion {
  id: string;
  content: string;
  serial: number;
  explanation: string;
  status: StatusEnum;
  testReadingId: string;
}

export interface TestReadingAnswer {
  id: string;
  content: string;
  isCorrect: boolean;
  status: StatusEnum;
  testQuestionReadingId: string;
}
export interface TestListening {
  id: string;
  serial: number;
  content: string;
  transcript: string ;
  status: StatusEnum;
  testId: string;
}

export interface TestListeningQuestion {
  id: string;
  content: string;
  serial: number;
  status: StatusEnum;
  testListeningId: string;
}

export interface TestListeningAnswer {
  id: string;
  content: string;
  isCorrect: boolean;
  status: StatusEnum;
  testQuestionListeningId: string;
}
export interface TestSpeaking {
  id: string;
  serial: number;
  title: string;
  status: StatusEnum;
  testId: string;
}

export interface TestSpeakingQuestion {
  id: string;
  content: string;
  serial: number;
  status: StatusEnum;
  testSpeakingId: string;
}
export interface TestWriting {
  id: string;
  serial: number;
  content: string;
  status: StatusEnum;
  testId: string;
}

