import apiClient from "services/apiClient";
export interface HistoryStats {
    averageScore: number;      
    totalTestsTaken: number;   
    highestScore: number;      
  }
  
const getTestHistoryStats = async (
  userId: number,
  status?: boolean
) => {
  try {
    let url = `/test-history-stats?userId=${userId}`;
    if (status !== undefined) {
      url += `&status=${status}`;
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching test history stats:", error);
    throw error;
  }
};

export const testHistoryStatsService = {
    getTestHistoryStats
  };
  

