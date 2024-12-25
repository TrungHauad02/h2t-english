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
