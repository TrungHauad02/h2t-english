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

export enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export default interface BaseEntity {
  id: number;
  status: StatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Test extends BaseEntity {
  title: string;
  description: string;
  type: TestTypeEnum;
  duration: number;
  parts:  number[];
  totalQuestions: number;
  scoreLastOfTest: number | null;
  routeNodeId: number;
}
export interface CompetitionTest extends BaseEntity {
  title: string;
  duration: number;
  startTime: Date;
  endTime: Date;
  parts:  number[];
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
  answers: Answer[];
}

export interface Answer extends BaseEntity {
  content: string;
  correct: boolean;
}
