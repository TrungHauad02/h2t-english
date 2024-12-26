export interface Topic {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
}

export interface Grammar {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
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
  file: string;
}

export interface Speaking {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
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
  audioUrl: string;
}

export interface Writing {
  id: string;
  title: string;
  serial: number;
  image: string;
  description: string;
  status: boolean;
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
