import { ReactNode } from "react";

export interface TeacherDashboardData {
  totalRoutes: number;
  totalLessons: number;
  totalTests: number;
  totalViews: number;
  activeContent: number;
  inactiveContent: number;
  lessonData: LessonData;
  testData: TestData;
}

export interface LessonData {
  totalTopics: number;
  totalGrammars: number;
  totalReadings: number;
  totalListenings: number;
  totalSpeakings: number;
  totalWritings: number;
}

export interface TestData {
  totalMixingTests: number;
  totalReadingTests: number;
  totalWritingTests: number;
  totalSpeakingTests: number;
  totalListeningTests: number;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: string | ReactNode;
}
