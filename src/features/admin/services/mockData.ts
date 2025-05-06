import { User } from "interfaces";
import { RolesEnum, LevelsEnum } from "interfaces";

const students: User[] = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    email: "student1@gmail.com",
    name: "John Doe",
    password: "English@web1",
    role: RolesEnum.STUDENT,
    status: true,
    phoneNumber: "0375245932",
    dateOfBirth: new Date("2003-01-01"),
  },
];

const teachers: User[] = [
  {
    id: 5,
    avatar:
      "https://images.unsplash.com/photo-1700815078793-4b8c1bf57609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww%3D%3D",
    email: "teacher1@gmail.com",
    level: LevelsEnum.PROFESSOR,
    name: "Sophia Williams",
    password: "English@web1",
    role: RolesEnum.TEACHER,
    status: true,
    phoneNumber: "0375245936",
    dateOfBirth: new Date("1980-05-01"),
  },
];

// Copy đoạn này cho tất cả giáo viên còn lại
for (let i = 8; i <= 16; i++) {
  teachers.push({
    id: i,
    avatar:
      i % 2 === 0
        ? "https://images.unsplash.com/photo-1700815078793-4b8c1bf57609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww%3D%3D"
        : "https://images.unsplash.com/photo-1700774443359-5a4c7cfc6a89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    email: `teacher${i}@gmail.com`,
    level:
      i % 3 === 0
        ? LevelsEnum.MASTER
        : i % 3 === 1
        ? LevelsEnum.PROFESSOR
        : LevelsEnum.BACHELOR,
    name:
      i % 3 === 0
        ? "Olivia Brown"
        : i % 3 === 1
        ? "Sophia Williams"
        : "Liam Johnson",
    password: "English@web1",
    role: i >= 11 ? RolesEnum.TEACHER_ADVANCE : RolesEnum.TEACHER,
    status: true,
    phoneNumber: `03752459${30 + i}`,
    dateOfBirth: new Date(
      i % 3 === 0 ? "1985-02-01" : i % 3 === 1 ? "1980-05-01" : "1978-11-01"
    ),
  });
}

export { students, teachers };
