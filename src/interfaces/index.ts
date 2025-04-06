export * from "./UserInterfaces";
export * from "./LessonInterfaces";
export * from "./TestInterfaces";
export * from "./FilterInterfaces";

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
  fileData: string;
}
