export default interface BaseEntity {
  id: number;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Lesson extends BaseEntity {
  title: string;
  image: string;
  description: string;
  views: number;
  routeNodeId: number;
}

export interface Route extends BaseEntity {
  title: string;
  image: string;
  description: string;
  routeNodes: RouteNode[];
  ownerId: number;
}

export enum RouteNodeEnum {
  VOCABULARY = "VOCABULARY",
  GRAMMAR = "GRAMMAR",
  READING = "READING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
  SPEAKING = "SPEAKING",
  MIXING_TEST = "MIXING_TEST",
  READING_TEST = "READING_TEST",
  LISTENING_TEST = "LISTENING_TEST",
  SPEAKING_TEST = "SPEAKING_TEST",
  WRITING_TEST = "WRITING_TEST",
}

export interface RouteNode extends BaseEntity {
  serial: number;
  routeId: number;
  nodeId: number;
  type: RouteNodeEnum;
  title?: string;
  description?: string;
  image?: string;
}

export interface Topic extends Lesson {
  questions: number[];
}

export interface Grammar extends Lesson {
  definition: string;
  example: string;
  file: string;
  questions: number[];
}

export interface Reading extends Lesson {
  file: string;
  questions: number[];
}

export interface Speaking extends Lesson {
  topic: string;
  duration: number;
}

export interface Listening extends Lesson {
  audio: string;
  questions: number[];
}

export interface Writing extends Lesson {
  topic: string;
  file: string;
  tips: string[];
  paragraphs: string;
  questions: number[];
}

export enum WordType {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
  ADVERB = "adverb",
}

export interface Vocabulary extends BaseEntity {
  word: string;
  image: string;
  example: string;
  phonetic: string;
  meaning: string;
  wordType: WordType;
  topicId: number;
}

export interface LessonQuestion extends BaseEntity {
  content: string;
  serial: number;
  explanation: string;
  lessonId: number;
  answers: LessonAnswer[];
}

export interface LessonAnswer extends BaseEntity {
  content: string;
  correct: boolean;
  questionId: number;
}

export interface Preparation extends BaseEntity {
  title: string;
  tip: string;
  questions: number[];
  type: "MATCH_WORD_WITH_SENTENCES" | "CLASSIFY" | "WORDS_MAKE_SENTENCES";
}

export interface PreparationClassify extends BaseEntity {
  groupName: string;
  members: string[];
}

export interface PreparationMakeSentences extends BaseEntity {
  sentences: string[];
}

export interface PreparationMatchWordSentences extends BaseEntity {
  word: string;
  sentence: string;
}

export interface SpeakingConversation extends BaseEntity {
  name: string;
  serial: number;
  content: string;
}

export interface ListenAndWriteAWord extends BaseEntity {
  audio: string;
  serial: number;
  sentence: string;
  missingIndex: number;
  correctAnswer: string;
  listeningId: number;
}

export interface WritingAnswer extends BaseEntity {
  missingIndex: number;
  correctAnswer: string;
  writingId: number;
}
