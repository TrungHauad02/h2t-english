import { ServiceResponse } from "interfaces";
import apiClient from "services/apiClient";

interface SpeakingScoreDTO {
  score: string;
  strengths: string[];
  areas_to_improve: string[];
  transcript: string;
  feedback: string;
}

/**
 * Service for evaluating speaking skills through API calls
 */
const evaluateSpeaking = async (
  audioFile: File,
  topic: string
): Promise<ServiceResponse<SpeakingScoreDTO>> => {
  try {
    // Create FormData object to send multipart/form-data
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("topic", topic);

    // Make the API request
    const response = await apiClient.post("/score-speaking", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in evaluateSpeaking:", error);
    throw error;
  }
};

export const scoreSpeakingService = {
  evaluateSpeaking,
};
