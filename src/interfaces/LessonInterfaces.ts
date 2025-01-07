interface Owner {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
}

export interface Grammar {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
  content: string;
  example: string;
  file: string;
}

export interface Reading {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
  file: string;
}

export interface Speaking {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
  topic: string;
  duration: number;
}

export interface Listening {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
  audioUrl: string;
}

export interface Writing {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
  owner: Owner;
  topic: string;
}

export enum WordType {
  NOUN = "noun",
  VERB = "verb",
  ADJECTIVE = "adjective",
  ADVERB = "adverb",
}

export interface Vocabulary {
  id: string;
  word: string;
  image: string;
  example: string;
  phonetic: string;
  meaning: string;
  status: boolean;
  wordType: WordType;
  topicId: string;
}

export interface Question {
  id: string;
  content: string;
  serial: number;
  explanation: string;
  status: boolean;
  lessonId: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
  correct: boolean;
  status: boolean;
  questionId: string;
}
