export * from "./UserInterfaces";
export * from "./LessonInterfaces";
export * from "./TestInterfaces";
export * from "./FilterInterfaces";

export default interface BaseEntity {
  id: number;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AIResponse extends BaseEntity {
  request: string;
  response: string;
  evaluate: string;
  userId: number; 
}

export type QuestionSupportType =
  | "topics"
  | "grammars"
  | "listenings"
  | "readings";
export type QuestionSupportTestType =
  | "test-listenings"
  | "test-readings"
  | "test-speakings"
  | "test-parts";

export interface ServiceResponse<T> {
  status: string;
  data: T;
  message: string;
}

export interface Voice {
  voice: string;
  name: string;
  fileData: string;
}

export enum SeverityEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface ErrorLog extends BaseEntity {
  message: string;
  errorCode: string;
  severity: SeverityEnum;
}

export type RandomName = "YES" | "NO";

export interface Quote {
  quote: string;
  author: string;
  category: string;
}
