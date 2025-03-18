export interface HistoryRecord {
  id: number;
  type: "test" | "toeic" | "competition";
  title: string;
  score: number | null;
  maxScore: number;
  date: Date;
  comment?: string;
  testType?: string;
  duration?: number;
}
