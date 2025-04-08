import { ReactNode } from "react";

export interface StatsData {
  totalRoutes: number;
  totalTopics: number;
  totalGrammars: number;
  totalReadings: number;
  totalListenings: number;
  totalSpeakings: number;
  totalWritings: number;
  totalMixingTests: number;
  totalReadingTests: number;
  totalWritingTests: number;
  totalSpeakingTests: number;
  totalListeningTests: number;
  totalViews: number;
  activeContent: number;
  inactiveContent: number;
}

export interface DashboardData {
  stats: Partial<StatsData>;
}

export interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  bgColor: string;
  changePercentage?: number;
}

export interface ContentTypeDistributionProps {
  data: Partial<StatsData> | undefined;
}

export interface ContentStatusChartProps {
  active: number;
  inactive: number;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: string | ReactNode;
}
