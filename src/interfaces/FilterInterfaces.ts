import { WordType } from "./LessonInterfaces";

export interface BaseFilter {
  status?: boolean | null;
  sortBy?: "createdAt" | "updatedAt" | "-createdAt" | "-updatedAt";
  startCreatedAt?: Date;
  endCreatedAt?: Date;
  startUpdatedAt?: Date;
  endUpdatedAt?: Date;
}

export interface RouteFilter extends BaseFilter {
  title?: string;
}
export interface ToeicFilter extends BaseFilter {
  title?: string;
}

export interface VocabularyFilter extends BaseFilter {
  word?: string;
  wordType?: WordType;
}
