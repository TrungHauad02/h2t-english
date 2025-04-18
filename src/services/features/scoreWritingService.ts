import apiClient from "services/apiClient";

const scoreWriting = async (text: string, topic: string) => {
  try {
    const response = await apiClient.post(`/score-writing`, {
      text,
      topic,
    });
    return response.data;
  } catch (error) {
    console.error("Error scoring writing:", error);
    throw error;
  }
};

export const scoreWritingService = {
  scoreWriting,
};
