import apiClient from "services/apiClient";
// src/interfaces/competitionStats.ts

export interface QuestionStatsDTO {
  id: number;
  content: string;
  partType: string;
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  correctRate: number;
  correctAnswer: string;
  mostChosenWrongAnswer: string;
  answerDistribution: Record<number, number>; // answerId -> count
}

export interface PartStatsDTO {
  type: string;
  totalQuestions: number;
  averageScore: number;
  averageAccuracy: number;
  accuracyDistribution: Record<string, number>;
  hardestQuestion: QuestionStatsDTO;
  easiestQuestion: QuestionStatsDTO;
}


export interface ScoreSummaryDTO {
  averageScore: number;
  medianScore: number;
  highestScore: number;
  lowestScore: number;
  passCount: number;
  failCount: number;
  passRate: number;
}

export interface ParticipantStatsDTO {
  userId: number;
  username: string;
  submitCompetitionId: number;
  totalScore: number;
  submissionDate: string;
  partScores: Record<string, number>;
  partAccuracies: Record<string, number>;
  bestPart: string;
  worstPart: string;
}

export interface CompetitionStatsDTO {
  competitionId: number;
  title: string;
  totalQuestions: number;
  totalSubmissions: number;
  completedSubmissions: number;
  scoreSummary: ScoreSummaryDTO;
  scoreDistribution: Record<string, number>;
  partStats: PartStatsDTO[];

}

const getCompetitionStats = async (competitionId: number) => {
    try {
      const url = `/competition-stats?competitionId=${competitionId}`;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching competition stats:", error);
      throw error;
    }
  };
  
  export const competitionStatsService = {
    getCompetitionStats,
  };