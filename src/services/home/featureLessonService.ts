import apiClient from "services/apiClient";

const getMostViewedLessons = async () => {
  try {
    const response = await apiClient.get("/feature-lesson/most-viewed");
    return response.data;
  } catch (error) {
    console.error("Error getting most viewed lessons:", error);
    throw error;
  }
};

const getMostRecentLessons = async () => {
  try {
    const response = await apiClient.get("/feature-lesson/most-recent");
    return response.data;
  } catch (error) {
    console.error("Error getting most recent lessons:", error);
    throw error;
  }
};

export const featureLessonService = {
  getMostViewedLessons,
  getMostRecentLessons,
};
