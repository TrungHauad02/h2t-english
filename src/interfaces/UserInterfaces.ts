import { StatusEnum } from "./TestInterfaces"

export const enum RolesEnum {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN"
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
    contentMotivation: string,
    email: string,
    endDate: Date,
    levelEnum: LevelsEnum,
    name: string,
    password: string,
    roleEnum: RolesEnum,
    startDate: Date,
    status: StatusEnum,
    phoneNumber: string,
    dateOfBirth: Date
}
