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
  questionsPart1: number[];
  questionsPart2: number[];
  questionsPart3: number[];
  questionsPart4: number[];
  questionsPart5: number[];
  questionsPart6: number[];
  questionsPart7: number[];  
  totalQuestions: 200;
  scoreLastOfTest: number | null ;
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
  image?: string;

  transcript: string;

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
  explanation: string;
}

export interface ToeicPart6 extends BaseEntity {
  file: string;

  contentQuestion1: string;
  contentQuestion2: string;
  contentQuestion3: string;
  contentQuestion4: string;

  explanationQuestion1: string;
  explanationQuestion2: string;
  explanationQuestion3: string;
  explanationQuestion4: string;

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
  questions: number[];
}

export interface ToeicPart7Question extends BaseEntity {
  content: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  explanation: string;
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

export interface SubmitToeicPart3_4 extends BaseEntity {
  submitToeicId: number;
  toeicPart3_4Id: number;
  answerQ1: AnswerEnum;
  answerQ2: AnswerEnum;
  answerQ3: AnswerEnum;
}

export interface SubmitToeicPart5 extends BaseEntity {
  submitToeicId: number;
  toeicPart5Id: number;
  answer: AnswerEnum;
}

export interface SubmitToeicPart6 extends BaseEntity {
  submitToeicId: number;
  toeicPart6Id: number;
  answerQ1: AnswerEnum;
  answerQ2: AnswerEnum;
  answerQ3: AnswerEnum;
  answerQ4: AnswerEnum;
}

export interface SubmitToeicPart7 extends BaseEntity {
  submitToeicId: number;
  toeicPart7QuestionId: number;
  answer: AnswerEnum;
}
