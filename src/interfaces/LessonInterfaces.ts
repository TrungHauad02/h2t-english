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

enum RouteNodeEnum {
  VOCABULARY = "VOCABULARY",
  GRAMMAR = "GRAMMAR",
  READING = "READING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
  SPEAKING = "SPEAKING",
  TEST = "TEST",
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
}

export interface Writing extends Lesson {
  topic: string;
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

export interface Question extends BaseEntity {
  content: string;
  serial: number;
  explanation: string;
  lessonId: number;
  answers: Answer[];
}

export interface Answer extends BaseEntity {
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
