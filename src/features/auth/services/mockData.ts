import { User } from "interfaces";
import { RolesEnum } from "interfaces";

const users: User[] = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    email: "student@gmail.com",
    name: "John Doe",
    password: "English@web1",
    role: RolesEnum.STUDENT,
    status: true,
    phoneNumber: "0375245932",
    dateOfBirth: new Date("01-01-2003"),
  },
];

export default users;
