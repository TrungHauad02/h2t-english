type TestTypeEnum = "MIXING" | "LISTENING" | "READING"| "SPEAKING"| "WRITING";
export interface Test {
  id: string;
  title: string;
  serial: number;
  duration: number;
  totalQuestions: number;
  scoreLastOfTest: number | null;
  type: TestTypeEnum;
  status: boolean;
}
