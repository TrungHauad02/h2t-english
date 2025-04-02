import { LevelsEnum, RolesEnum, User } from "interfaces";

export const mockData: User[] = [
  {
    id: 1,
    avatar: "https://example.com/avatar2.jpg",
    email: "teacher1@example.com",
    levelEnum: LevelsEnum.PROFESSOR,
    name: "Teacher One",
    password: "password123",
    roleEnum: RolesEnum.TEACHER,
    phoneNumber: "987-654-3210",
    dateOfBirth: new Date("1985-08-25"),
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
