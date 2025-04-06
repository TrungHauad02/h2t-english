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
  STUDENT = "STUDENT",
}

export interface User extends BaseEntity {
  avatar: string;
  email: string;
  levelEnum: LevelsEnum;
  name: string;
  password: string;
  roleEnum: RolesEnum;
  phoneNumber: string;
  dateOfBirth: Date;
}
