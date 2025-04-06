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

export enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type QuestionSupportType =
  | "topics"
  | "grammars"
  | "listenings"
  | "readings";

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

export enum SeverityEnum{
  LOW,
  MEDIUM,
  HIGH
}

export interface ErrorLog extends BaseEntity {
  message: string;
  errorCode: string;
  severity: SeverityEnum;
}