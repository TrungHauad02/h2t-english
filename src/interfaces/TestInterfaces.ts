import BaseEntity from "./";

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
export enum AnswerEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}


export interface SubmitTestStats extends BaseEntity {
  count: number;
  score: number;
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
  title: string;
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
  questionId: number;
  content: string;
  correct: boolean;
}

export interface Toeic extends BaseEntity {
  title: string;
  duration: number;
  questionsPart1?: number[];
  questionsPart2?: number[];
  questionsPart3?: number[];
  questionsPart4?: number[];
  questionsPart5?: number[];
  questionsPart6?: number[];
  questionsPart7?: number[];  
  totalQuestions?: 200;
  scoreLastOfTest?: number | null ;
}

export interface ToeicPart1 extends BaseEntity {
  image: string;
  audio: string;
  correctAnswer: AnswerEnum;
  transcript: string;
}

export interface ToeicPart2 extends BaseEntity {
  audio: string;
  correctAnswer: AnswerEnum;
  transcript: string;
}
export interface ToeicPart3_4 extends BaseEntity {
  audio: string;
  image: string;
  transcript: string;
  questions?: number[];
}
export interface ToeicPart6 extends BaseEntity {
  file: string;
  questions?: number[];
}

export interface ToeicPart7 extends BaseEntity {
  file: string;
  questions?: number[];
}
export interface ToeicQuestion extends BaseEntity {
  content: string;
  explanation: string;
  answers: ToeicAnswer[];
}

export interface ToeicAnswer extends BaseEntity {
  content: string;
  correct: boolean;
  questionId: number;
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
  file: string;
  transcript: string;
  score: number;
}

export interface SubmitCompetitionWriting extends BaseEntity {
  submitCompetition_id: number;
  competitionWriting_id: number;
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

export interface SubmitToeicPart1 extends BaseEntity {
  submitToeicId: number;
  toeicPart1Id: number;
  answer: AnswerEnum;
}

export interface SubmitToeicPart2 extends BaseEntity {
  submitToeicId: number;
  toeicPart2Id: number;
  answer: AnswerEnum;
}
export interface SubmitToeicAnswer extends BaseEntity {
  submitToeicId: number;
  toeicQuestionId: number;
  toeicAnswerId: number;
}
