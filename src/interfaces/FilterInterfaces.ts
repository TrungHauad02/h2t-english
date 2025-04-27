import { WordType } from "./LessonInterfaces";
import { TestTypeEnum } from "./TestInterfaces"
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

export interface VocabularyFilter extends BaseFilter {
  word?: string;
  wordType?: WordType;
}
export interface ToeicFilter extends BaseFilter {
  title?: string;
}
export interface TestFilter extends BaseFilter {
  title?: string;
  type?: TestTypeEnum;
}
export interface CompetitionTestFilter extends BaseFilter {
  title?: string;
  startStartTime?: Date;
  endStartTime?: Date;
  startEndTime?: Date;
  endEndTime?: Date;
}