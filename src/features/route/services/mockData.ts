import {
  LevelsEnum,
  RolesEnum,
  Route,
  RouteNode,
  RouteNodeEnum,
  StatusEnum,
  User,
} from "interfaces";

const routeNodeData: RouteNode[] = [
  {
    id: 1,
    status: true,
    serial: 1,
    routeId: 1,
    nodeId: 1,
    type: RouteNodeEnum.VOCABULARY,
    title: "Vocabulary 1",
    description: "Description of Lesson 1",
    image: "/image.jpg",
  },
  {
    id: 2,
    status: true,
    serial: 2,
    routeId: 1,
    nodeId: 2,
    type: RouteNodeEnum.GRAMMAR,
    title: "Grammar 1",
    description: "Description of Grammar 1",
    image: "/image.jpg",
  },
  {
    id: 3,
    status: true,
    serial: 3,
    routeId: 1,
    nodeId: 3,
    type: RouteNodeEnum.READING,
    title: "Reading 1",
    description: "Description of Reading 1",
    image: "/image.jpg",
  },
];

const routeData: Route[] = [
  {
    id: 1,
    status: true,
    title: "Route 1",
    image: "/image.jpg",
    description: "Description of Route 1",
    routeNodes: routeNodeData,
    ownerId: 1,
  },
  {
    id: 2,
    status: true,
    title: "Route 2",
    image: "/image.jpg",
    description: "Description of Route 2",
    routeNodes: routeNodeData,
    ownerId: 1,
  },
];
const mockTeacher: User = {
  id: "1",
  avatar: "/image.jpg",
  email: "teacher@example.com",
  levelEnum: LevelsEnum.BACHELOR,
  name: "John Doe",
  password: "",
  roleEnum: RolesEnum.TEACHER,
  status: StatusEnum.ACTIVE,
  phoneNumber: "123456789",
  dateOfBirth: new Date(),
};
export const mockData = {
  routes: routeData,
  teacher: mockTeacher,
};
