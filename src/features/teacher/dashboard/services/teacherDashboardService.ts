import apiClient from "services/apiClient";

const getTeacherDashboard = async (teacherId: number) => {
  try {
    const response = await apiClient.get(
      `/teacher-dashboard?teacherId=${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting teacher dashboard:", error);
    throw error;
  }
};

export const teacherDashboardService = { getTeacherDashboard };
