import apiClient from "services/apiClient";

const getDashboardData = async (teacherId: number) => {
  try {
    const response = await apiClient.get(`/teacher-advance/dashboard?teacherId=${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher advance dashboard data:", error);
    throw error;
  }
};

export const teacherAdvanceDashboardService = {
  getDashboardData,
};