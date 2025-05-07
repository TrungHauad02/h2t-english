import apiClient from "services/apiClient";

const getDashboardData = async () => {
  try {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const adminDashboardService = {
  getDashboardData,
};
