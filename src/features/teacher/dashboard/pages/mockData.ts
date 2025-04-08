import { subDays, format } from "date-fns";

// Tạo dữ liệu hoạt động cho 30 ngày gần đây
const generateActivityData = () => {
  const activityData = [];
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    activityData.push({
      date: format(date, "dd/MM"),
      count: Math.floor(Math.random() * 8) + 1, // Từ 1-8 hoạt động mỗi ngày
    });
  }
  return activityData;
};

// Mock dữ liệu cho Dashboard
export const mockDashboardData = {
  stats: {
    totalRoutes: 24,
    totalLessons: {
      topics: 46,
      grammars: 38,
      readings: 31,
      listenings: 29,
      speakings: 22,
      writings: 25,
    },
    totalTests: 15,
    activeContent: 156,
    inactiveContent: 74,
    recentActivity: generateActivityData(),
  },
  recentContent: {
    lessons: [
      {
        id: 1,
        title: "Present Perfect Tense",
        type: "Grammar",
        createdAt: new Date("2025-04-02"),
        status: true,
        views: 234,
      },
      {
        id: 2,
        title: "Environmental Protection",
        type: "Topic",
        createdAt: new Date("2025-04-01"),
        status: false,
        views: 0,
      },
      {
        id: 3,
        title: "Science and Technology",
        type: "Reading",
        createdAt: new Date("2025-03-30"),
        status: true,
        views: 187,
      },
      {
        id: 4,
        title: "Job Interview Skills",
        type: "Speaking",
        createdAt: new Date("2025-03-29"),
        status: true,
        views: 152,
      },
      {
        id: 5,
        title: "Climate Change News",
        type: "Listening",
        createdAt: new Date("2025-03-28"),
        status: true,
        views: 146,
      },
      {
        id: 6,
        title: "Opinion Essay Techniques",
        type: "Writing",
        createdAt: new Date("2025-03-27"),
        status: true,
        views: 127,
      },
    ],
    routes: [
      {
        id: 1,
        title: "IELTS Preparation Advanced",
        nodesCount: 12,
        createdAt: new Date("2025-04-03"),
        status: true,
      },
      {
        id: 2,
        title: "Business English Fundamentals",
        nodesCount: 8,
        createdAt: new Date("2025-03-28"),
        status: true,
      },
      {
        id: 3,
        title: "English for Academic Purposes",
        nodesCount: 10,
        createdAt: new Date("2025-03-22"),
        status: false,
      },
    ],
    tests: [
      {
        id: 1,
        title: "Mid-term Grammar Assessment",
        type: "MIXING",
        createdAt: new Date("2025-04-05"),
        status: true,
      },
      {
        id: 2,
        title: "Reading Comprehension Test",
        type: "READING",
        createdAt: new Date("2025-03-31"),
        status: true,
      },
      {
        id: 3,
        title: "Listening Skills Evaluation",
        type: "LISTENING",
        createdAt: new Date("2025-03-25"),
        status: true,
      },
    ],
  },
  engagement: {
    topViewed: [
      {
        id: 1,
        title: "Present Perfect Tense",
        type: "Grammar",
        views: 234,
      },
      {
        id: 2,
        title: "Science and Technology",
        type: "Reading",
        views: 187,
      },
      {
        id: 3,
        title: "Job Interview Skills",
        type: "Speaking",
        views: 152,
      },
      {
        id: 4,
        title: "Climate Change News",
        type: "Listening",
        views: 146,
      },
    ],
    completionRates: [
      {
        id: 1,
        title: "Present Perfect Tense",
        type: "Grammar",
        completionRate: 86,
      },
      {
        id: 2,
        title: "Science and Technology",
        type: "Reading",
        completionRate: 74,
      },
      {
        id: 3,
        title: "Job Interview Skills",
        type: "Speaking",
        completionRate: 65,
      },
      {
        id: 4,
        title: "Opinion Essay Techniques",
        type: "Writing",
        completionRate: 42,
      },
    ],
    testScores: [
      {
        id: 1,
        title: "Mid-term Grammar Assessment",
        averageScore: 7.8,
        totalAttempts: 128,
      },
      {
        id: 2,
        title: "Reading Comprehension Test",
        averageScore: 6.9,
        totalAttempts: 94,
      },
      {
        id: 3,
        title: "Listening Skills Evaluation",
        averageScore: 8.2,
        totalAttempts: 86,
      },
    ],
  },
  pendingTasks: {
    pendingEvaluations: [
      {
        id: 1,
        studentName: "Nguyen Van A",
        submissionType: "Writing",
        submissionDate: new Date("2025-04-04"),
        dueDate: new Date("2025-04-07"),
      },
      {
        id: 2,
        studentName: "Tran Thi B",
        submissionType: "Speaking",
        submissionDate: new Date("2025-04-03"),
        dueDate: new Date("2025-04-06"),
      },
    ],
    draftContent: [
      {
        id: 1,
        title: "Conditional Sentences",
        type: "Grammar",
        lastEdited: new Date("2025-04-04"),
      },
      {
        id: 2,
        title: "Entertainment Industry",
        type: "Topic",
        lastEdited: new Date("2025-04-02"),
      },
      {
        id: 3,
        title: "Digital Technology",
        type: "Reading",
        lastEdited: new Date("2025-03-29"),
      },
      {
        id: 4,
        title: "Advanced English",
        type: "Route",
        lastEdited: new Date("2025-03-27"),
      },
    ],
    reminders: [
      {
        id: 1,
        title: "Complete test grading",
        dueDate: new Date("2025-04-08"),
        priority: "high",
      },
      {
        id: 2,
        title: "Update speaking materials",
        dueDate: new Date("2025-04-12"),
        priority: "medium",
      },
    ],
  },
  notifications: [
    {
      id: 1,
      type: "submission",
      title: "New writing submission",
      message:
        "Nguyen Van A submitted a writing assignment that needs evaluation.",
      date: new Date("2025-04-06T10:23:00"),
      read: false,
    },
    {
      id: 2,
      type: "question",
      title: "Question about grammar",
      message:
        "A student has a question about Present Perfect in the grammar lesson.",
      date: new Date("2025-04-05T15:47:00"),
      read: false,
    },
    {
      id: 3,
      type: "system",
      title: "Route published",
      message:
        "Your 'IELTS Preparation Advanced' route has been published successfully.",
      date: new Date("2025-04-03T09:15:00"),
      read: true,
    },
    {
      id: 4,
      type: "submission",
      title: "New speaking submission",
      message:
        "Tran Thi B submitted a speaking assignment that needs evaluation.",
      date: new Date("2025-04-03T08:30:00"),
      read: true,
    },
  ],
};
