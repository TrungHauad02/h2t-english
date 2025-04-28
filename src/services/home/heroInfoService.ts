import apiClient from "services/apiClient";

const getHeroInfo = async () => {
  try {
    const response = await apiClient.get("/hero-info");
    return response.data;
  } catch (error) {
    console.error("Error getting hero info:", error);
    throw error;
  }
};

export const heroInfoService = {
  getHeroInfo,
};
