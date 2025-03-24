import BaseEntity from "./LessonInterfaces";

export enum TestTypeEnum {
  MIXING = "MIXING",
  READING = "READING",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  WRITING = "WRITING",
}
export enum TestPartTypeEnum {
  VOCABULARY = "VOCABULARY",
  GRAMMAR = "GRAMMAR",
  READING = "READING",
  LISTENING = "LISTENING",
  SPEAKING = "SPEAKING",
  WRITING = "WRITING",
}

export interface Test extends BaseEntity {
  title: string;
  description: string;
  type: TestTypeEnum;
  duration: number;
  parts: number[];
  totalQuestions: number;
  scoreLastOfTest: number | null;
  routeNodeId: number;
}
export interface CompetitionTest extends BaseEntity {
  title: string;
  duration: number;
  totalQuestions: number | null;
  startTime: Date;
  endTime: Date;
  parts: number[];
}
export interface TestPart extends BaseEntity {
  type: TestPartTypeEnum;
  questions: number[];
}
export interface TestReading extends BaseEntity {
  file: string;
  questions: number[];
}
export interface TestListening extends BaseEntity {
  audio: string;
  transcript: string;
  questions: number[];
}
export interface TestSpeaking extends BaseEntity {
  file: string;
  questions: number[];
}
export interface TestWriting extends BaseEntity {
  topic: string;
  minWords: number;
  maxWords: number;
}

export interface Question extends BaseEntity {
  content: string;
  explanation: string;
  answers: Answer[];
}

export interface Answer extends BaseEntity {
  content: string;
  correct: boolean;
}

export interface SubmitTest extends BaseEntity {
  user_id: number;
  test_id: number;
  score: number | null;
  comment: string;
}

export interface SubmitToeic extends BaseEntity {
  user_id: number;
  toeic_id: number;
  score: number | null;
  comment: string;
}

export interface SubmitCompetition extends BaseEntity {
  user_id: number;
  competition_id: number;
  score: number | null;
}

export interface SubmitCompetitionAnswer extends BaseEntity {
  submitCompetition_id: number;
  question_id: number;
  answer_id: number;
}

export interface SubmitCompetitionSpeaking extends BaseEntity {
  submitCompetition_id: number;
  question_id: number;
  transcript: string;
  score: number;
}

export interface SubmitCompetitionWriting extends BaseEntity {
  submitCompetition_id: number;
  CompetitionWriting_id: number;
  content: string;
  score: number;
}

export interface SubmitTestAnswer extends BaseEntity {
  submitTest_id: number;
  question_id: number;
  answer_id: number;
}

export interface SubmitTestSpeaking extends BaseEntity {
  submitTest_id: number;
  question_id: number;
  file: string;
  transcript: string;
  score: number;
  comment: string;
}

export interface SubmitTestWriting extends BaseEntity {
  submitTest_id: number;
  testWriting_id: number;
  content: string;
  score: number;
  comment: string;
}
