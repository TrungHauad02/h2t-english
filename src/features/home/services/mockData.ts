import {
  CompetitionTest,
  Lesson,
  LevelsEnum,
  RolesEnum,
  Route,
  RouteNodeEnum,
  Test,
  TestTypeEnum,
  User,
} from "interfaces";

// Mock for featured lessons
export const featuredLessons: Lesson[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-05"),
    title: "Basic English Grammar: Present Simple",
    image: "/image.jpg",
    description:
      "Learn about the Present Simple tense and when to use it in English.",
    views: 1245,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-06"),
    title: "Business Vocabulary for Meetings",
    image: "/image.jpg",
    description:
      "Essential vocabulary for business meetings and professional settings.",
    views: 987,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date("2024-12-03"),
    updatedAt: new Date("2024-12-07"),
    title: "Advanced Reading: Scientific Articles",
    image: "/image.jpg",
    description:
      "Practice reading comprehension with complex scientific texts.",
    views: 756,
  },
  {
    id: 4,
    status: true,
    createdAt: new Date("2024-12-04"),
    updatedAt: new Date("2024-12-08"),
    title: "Listening Skills: Natural Conversations",
    image: "/image.jpg",
    description:
      "Improve your ability to understand natural English conversations.",
    views: 1089,
  },
];

// Mock for learning routes/paths
export const learningRoutes: Route[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-10"),
    title: "Complete Beginner to Elementary",
    image: "/image.jpg",
    description:
      "Start your English journey from zero and build a solid foundation.",
    routeNodes: [
      {
        id: 1,
        status: true,
        serial: 1,
        routeId: 1,
        nodeId: 1,
        type: RouteNodeEnum.VOCABULARY,
        title: "Basic Vocabulary",
        description: "Learn essential everyday words",
        image: "/images/nodes/basic-vocab.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 2,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 3,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 4,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 5,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 6,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
      {
        id: 2,
        status: true,
        serial: 7,
        routeId: 1,
        nodeId: 2,
        type: RouteNodeEnum.GRAMMAR,
        title: "Simple Sentences",
        description: "Create your first English sentences",
        image: "/images/nodes/simple-sentences.jpg",
      },
    ],
    ownerId: 1,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date("2024-11-05"),
    updatedAt: new Date("2024-11-15"),
    title: "Intermediate to Advanced",
    image: "/image.jpg",
    description:
      "Take your English to the next level with advanced grammar and vocabulary.",
    routeNodes: [
      {
        id: 3,
        status: true,
        serial: 1,
        routeId: 2,
        nodeId: 3,
        type: RouteNodeEnum.GRAMMAR,
        title: "Advanced Tenses",
        description: "Master complex English tenses",
        image: "/images/nodes/advanced-tenses.jpg",
      },
      {
        id: 4,
        status: true,
        serial: 2,
        routeId: 2,
        nodeId: 4,
        type: RouteNodeEnum.SPEAKING,
        title: "Fluent Conversation",
        description: "Practice speaking like a native",
        image: "/images/nodes/fluent-conversation.jpg",
      },
    ],
    ownerId: 2,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-20"),
    title: "Business English",
    image: "/image.jpg",
    description:
      "Specialized English for professional environments and career advancement.",
    routeNodes: [
      {
        id: 5,
        status: true,
        serial: 1,
        routeId: 3,
        nodeId: 5,
        type: RouteNodeEnum.VOCABULARY,
        title: "Business Terms",
        description: "Essential business vocabulary",
        image: "/images/nodes/business-terms.jpg",
      },
      {
        id: 6,
        status: true,
        serial: 2,
        routeId: 3,
        nodeId: 6,
        type: RouteNodeEnum.WRITING,
        title: "Professional Emails",
        description: "Write effective business emails",
        image: "/images/nodes/professional-emails.jpg",
      },
    ],
    ownerId: 1,
  },
];

// Mock for tests
export const featuredTests: Test[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-05"),
    title: "General English Proficiency Test",
    description: "Comprehensive test covering all aspects of English language.",
    type: TestTypeEnum.MIXING,
    duration: 90,
    parts: [1, 2, 3],
    totalQuestions: 50,
    scoreLastOfTest: null,
    routeNodeId: 7,
  },
  {
    id: 2,
    status: true,
    createdAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-06"),
    title: "Reading Comprehension Test",
    description: "Test your ability to understand and analyze English texts.",
    type: TestTypeEnum.READING,
    duration: 45,
    parts: [4, 5],
    totalQuestions: 25,
    scoreLastOfTest: null,
    routeNodeId: 8,
  },
  {
    id: 3,
    status: true,
    createdAt: new Date("2024-12-03"),
    updatedAt: new Date("2024-12-07"),
    title: "Listening Skills Assessment",
    description: "Evaluate your English listening comprehension abilities.",
    type: TestTypeEnum.LISTENING,
    duration: 30,
    parts: [6, 7],
    totalQuestions: 20,
    scoreLastOfTest: null,
    routeNodeId: 9,
  },
];

// Mock for competitions
export const competitions: CompetitionTest[] = [
  {
    id: 1,
    status: true,
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-15"),
    title: "Winter English Challenge 2024",
    duration: 120,
    totalQuestions: 75,
    startTime: new Date("2024-12-20T09:00:00"),
    endTime: new Date("2024-12-20T11:00:00"),
    parts: [1, 2, 3, 4],
  },
  {
    id: 2,
    status: true,
    createdAt: new Date("2024-12-12"),
    updatedAt: new Date("2024-12-17"),
    title: "Business English Competition",
    duration: 90,
    totalQuestions: 50,
    startTime: new Date("2024-12-25T14:00:00"),
    endTime: new Date("2024-12-25T15:30:00"),
    parts: [5, 6, 7],
  },
  {
    id: 3,
    status: true,
    createdAt: new Date("2024-12-14"),
    updatedAt: new Date("2024-12-19"),
    title: "Academic Writing Contest",
    duration: 60,
    totalQuestions: 2,
    startTime: new Date("2024-12-30T10:00:00"),
    endTime: new Date("2024-12-30T11:00:00"),
    parts: [8, 9],
  },
];

// Mock for recently completed competition
export const recentCompetition: CompetitionTest = {
  id: 4,
  status: true,
  createdAt: new Date("2024-11-20"),
  updatedAt: new Date("2024-11-25"),
  title: "Autumn English Challenge 2024",
  duration: 120,
  totalQuestions: 80,
  startTime: new Date("2024-12-01T09:00:00"),
  endTime: new Date("2024-12-01T11:00:00"),
  parts: [10, 11, 12, 13],
};

// Mock for top 5 students in recent competition
export const topStudents: (User & { score: number })[] = [
  {
    id: 1,
    status: true,
    avatar: "/images/users/user1.jpg",
    email: "emma.wilson@example.com",
    name: "Emma Wilson",
    password: "********",
    role: RolesEnum.STUDENT,
    phoneNumber: "+1234567890",
    dateOfBirth: new Date("1998-05-15"),
    score: 95,
  },
];

// Mock data for TOEIC related content
export const toeicCourses = [
  {
    id: 1,
    title: "TOEIC Listening & Reading Course",
    image: "/images/toeic/listening-reading.jpg",
    description: "Complete preparation for the TOEIC Listening & Reading Test.",
    duration: "8 weeks",
    level: "Intermediate to Advanced",
  },
  {
    id: 2,
    title: "TOEIC Speaking & Writing Course",
    image: "/images/toeic/speaking-writing.jpg",
    description:
      "Comprehensive preparation for the TOEIC Speaking & Writing Test.",
    duration: "6 weeks",
    level: "Intermediate to Advanced",
  },
  {
    id: 3,
    title: "TOEIC Intensive Weekend Workshop",
    image: "/images/toeic/workshop.jpg",
    description:
      "Intensive weekend workshop focusing on test-taking strategies.",
    duration: "2 days",
    level: "All levels",
  },
];

// Mock testimonials from users
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Professional",
    avatar: "/images/testimonials/sarah.jpg",
    comment:
      "This platform has transformed my English speaking abilities. The structured lessons and practice tests helped me gain confidence in business meetings.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Kim",
    role: "University Student",
    avatar: "/images/testimonials/david.jpg",
    comment:
      "I improved my TOEIC score by 200 points after completing the courses here. The practice tests were especially helpful.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "English Teacher",
    avatar: "/images/testimonials/maria.jpg",
    comment:
      "As an English teacher, I recommend this platform to all my students. The content is comprehensive and engaging.",
    rating: 4,
  },
];

export const mockTeacher: User = {
  id: 1,
  status: true,
  avatar: "/image.jpg",
  email: "emma.wilson@example.com",
  level: LevelsEnum.PROFESSOR,
  name: "Emma Wilson",
  password: "********",
  role: RolesEnum.TEACHER,
  phoneNumber: "+1234567890",
  dateOfBirth: new Date("1998-05-15"),
};

export const competitionResults = [
  { id: 1, user_id: 1, competition_id: 1, score: 92, status: true },
  { id: 2, user_id: 3, competition_id: 1, score: 88, status: true },
  { id: 3, user_id: 2, competition_id: 1, score: 85, status: true },
  { id: 4, user_id: 1, competition_id: 1, score: 82, status: true },
  { id: 5, user_id: 3, competition_id: 1, score: 79, status: true },
  { id: 6, user_id: 2, competition_id: 3, score: 95, status: true },
  { id: 7, user_id: 2, competition_id: 3, score: 90, status: true },
  { id: 8, user_id: 1, competition_id: 3, score: 87, status: true },
  { id: 9, user_id: 1, competition_id: 1, score: 92, status: true },
  { id: 10, user_id: 3, competition_id: 1, score: 88, status: true },
  { id: 11, user_id: 2, competition_id: 1, score: 85, status: true },
  { id: 12, user_id: 1, competition_id: 1, score: 82, status: true },
  { id: 13, user_id: 1, competition_id: 1, score: 79, status: true },
  { id: 14, user_id: 2, competition_id: 3, score: 95, status: true },
  { id: 15, user_id: 3, competition_id: 3, score: 90, status: true },
  { id: 16, user_id: 1, competition_id: 3, score: 99, status: true },
];

// Mock statistics about the platform
export const platformStats = {
  totalStudents: 50000,
  totalLessons: 1200,
  totalCompletions: 750000,
  averageImprovement: "35%",
  countries: 75,
};
