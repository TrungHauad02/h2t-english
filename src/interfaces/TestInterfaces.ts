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
export enum AnswerEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
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

export interface Toeic extends BaseEntity {
  title: string;
  duration: number;
  questionsPart1: string;
  questionsPart2: string;
  questionsPart3: string;
  questionsPart4: string;
  questionsPart5: string;
  questionsPart6: string;
  questionsPart7: string;
  totalQuestions: 200;
  scoreLastOfTest: number | null ;
}

export interface ToeicPart1 extends BaseEntity {
  image: string;
  audio: string;
  correctAnswer: AnswerEnum;
}

export interface ToeicPart2 extends BaseEntity {
  audio: string;
  correctAnswer: AnswerEnum;
}

export interface ToeicPart3_4 extends BaseEntity {
  audio: string;
  image?: string;

  contentQuestion1: string;
  contentQuestion2: string;
  contentQuestion3: string;

  answer1Q1: string;
  answer2Q1: string;
  answer3Q1: string;
  answer4Q1: string;

  answer1Q2: string;
  answer2Q2: string;
  answer3Q2: string;
  answer4Q: string;

  answer1Q3: string;
  answer2Q3: string;
  answer3Q3: string;
  answer4Q3: string;

  correctAnswer1: AnswerEnum;
  correctAnswer2: AnswerEnum;
  correctAnswer3: AnswerEnum;
}

export interface ToeicPart5 extends BaseEntity {
  content: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: AnswerEnum;
}

export interface ToeicPart6 extends BaseEntity {
  file: string;

  contentQuestion1: string;
  contentQuestion2: string;
  contentQuestion3: string;
  contentQuestion4: string;

  answer1Q1: string;
  answer2Q1: string;
  answer3Q1: string;
  answer4Q1: string;

  answer1Q2: string;
  answer2Q2: string;
  answer3Q2: string;
  answer4Q2: string;

  answer1Q3: string;
  answer2Q3: string;
  answer3Q3: string;
  answer4Q3: string;

  answer1Q4: string;
  answer2Q4: string;
  answer3Q4: string;
  answer4Q4: string;

  correctAnswer1: AnswerEnum;
  correctAnswer2: AnswerEnum;
  correctAnswer3: AnswerEnum;
  correctAnswer4: AnswerEnum;
}

export interface ToeicPart7 extends BaseEntity {
  file: string;
  questions: string;
}

export interface ToeicPart7Question extends BaseEntity {
  content: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: AnswerEnum;
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
