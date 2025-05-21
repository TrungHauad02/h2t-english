import apiClient from "services/apiClient";

const getRandomQuote = async () => {
  try {
    const response = await apiClient.get("/home/quotes");
    return response.data;
  } catch (error) {
    console.error("Error getting random quote:", error);
    throw error;
  }
};

export const quoteService = {
  getRandomQuote,
};
