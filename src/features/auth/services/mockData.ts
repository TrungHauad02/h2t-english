import { User } from "interfaces";
import { RolesEnum, LevelsEnum } from "interfaces";

const users: User[] = [
  {
    id: "1",
    avatar: "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    email: "student@gmail.com",
    levelEnum: LevelsEnum.STUDENT,
    name: "John Doe",
    password: "English@web1",
    roleEnum: RolesEnum.STUDENT,
    status: true,
    phoneNumber: "0375245932",
    dateOfBirth: new Date("01-01-2003"),
  },
  {
    id: "2",
    avatar: "https://images.unsplash.com/photo-1700815078793-4b8c1bf57609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww%3D%3D",
    email: "teacher@gmail.com",
    levelEnum: LevelsEnum.BACHELOR,
    name: "Jane Smith",
    password: "English@web1",
    roleEnum: RolesEnum.TEACHER,
    status: true,
    phoneNumber: "0375245932",
    dateOfBirth: new Date("01-05-2003"),
  },
  {
    id: "3",
    avatar: "https://images.unsplash.com/photo-1700774443359-5a4c7cfc6a89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    email: "admin@gmail.com",
    levelEnum: LevelsEnum.PROFESSOR,
    name: "Alice Johnson",
    password: "English@web1",
    roleEnum: RolesEnum.ADMIN,
    status: true,
    phoneNumber: "0375245932",
    dateOfBirth: new Date("01-11-2003"),
  },
];

export default users;
