import { SeverityEnum } from "interfaces";
import { WordType } from "./LessonInterfaces";
import { TestTypeEnum } from "./TestInterfaces";
import { LevelsEnum, RolesEnum } from "./UserInterfaces";
export interface BaseFilter {
  status?: boolean | null;
  sortBy?: "createdAt" | "updatedAt" | "-createdAt" | "-updatedAt";
  startCreatedAt?: Date;
  endCreatedAt?: Date;
  startUpdatedAt?: Date;
  endUpdatedAt?: Date;
}

export interface AIResponseFilter extends BaseFilter {
  userId?: number;
}

export interface UserFilter extends BaseFilter {
  name?: string;
  email?: string;
  roleList?: RolesEnum[];
  level?: LevelsEnum;
}

export interface ErrorLogFilter extends BaseFilter {
  message?: string;
  severity?: SeverityEnum;
  errorCode?: string;
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
export interface SubmitTestFilter extends BaseFilter {
  title?: string;         
  type?: TestTypeEnum;
}

export interface SubmitToeicFilter extends BaseFilter {
  title?: string;           
}

export interface SubmitCompetitionFilter extends BaseFilter {
  title?: string;         
}

