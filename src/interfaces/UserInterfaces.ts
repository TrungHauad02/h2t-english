import BaseEntity from "./";

export const enum RolesEnum {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  TEACHER_ADVANCE = "TEACHER_ADVANCE",
}
export enum LevelsEnum {
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  DOCTOR = "DOCTOR",
  PROFESSOR = "PROFESSOR",
}

export interface User extends BaseEntity {
  avatar: string;
  email: string;
  name: string;
  role: RolesEnum;
  password?: string;
  level?: LevelsEnum;
  phoneNumber?: string;
  dateOfBirth?: Date;
}
