import { User } from "interfaces";

const users: User[] = [
  {
    id: "1",
    avatar: "https://images.unsplash.com/photo-1700773428278-13f13630d18d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxlc3NvbnxlbnwwfHwwfHx8MA%3D%3D",
    content_motivation: "Keep pushing forward, every step counts.",
    email: "student@gmail.com",
    end_date: new Date("2024-12-31"),
    level_enum: "Intermediate",
    name: "John Doe",
    password: "English@web1",
    role_enum: "Student",
    start_date: new Date("2023-01-01"),
    status: true,
  },
  {
    id: "2",
    avatar: "https://images.unsplash.com/photo-1700815078793-4b8c1bf57609?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww%3D%3D",
    content_motivation: "Believe in yourself and all that you are.",
    email: "teacher@gmail.com",
    end_date: new Date("2025-05-20"),
    level_enum: "Advanced",
    name: "Jane Smith",
    password: "English@web1",
    role_enum: "Teacher",
    start_date: new Date("2022-03-15"),
    status: true,
  },
  {
    id: "3",
    avatar: "https://images.unsplash.com/photo-1700774443359-5a4c7cfc6a89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    content_motivation: "Success is the sum of small efforts, repeated day in and day out.",
    email: "admin@gmail.com",
    end_date: new Date("2026-08-15"),
    level_enum: "Expert",
    name: "Alice Johnson",
    password: "English@web1",
    role_enum: "Admin",
    start_date: new Date("2020-10-01"),
    status: false,
  },
];

export default users;
