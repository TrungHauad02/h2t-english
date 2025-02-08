import { StatusEnum } from "./TestInterfaces"

export const enum RolesEnum {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN",
    TEACHER_ADMIN = "TEACHER_ADMIN"
}
export const enum LevelsEnum {
    BACHELOR = "BACHELOR",
    MASTER = "MASTER",
    DOCTOR = "DOCTOR",
    PROFESSOR = "PROFESSOR",
    STUDENT = "STUDENT",
}

export interface User {
    id: string,
    avatar: string,
    email: string,
    levelEnum: LevelsEnum,
    name: string,
    password: string,
    roleEnum: RolesEnum,
    status: StatusEnum,
    phoneNumber: string,
    dateOfBirth: Date
}
