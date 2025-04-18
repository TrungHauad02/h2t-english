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
  expectedText: string
): Promise<ServiceResponse<SpeakingScoreDTO>> => {
  try {
    // Create FormData object to send multipart/form-data
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("expectedText", expectedText);

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

/**
 * Service for evaluating speech in a given topic (without exact text comparison)
 */
const evaluateSpeechInTopic = async (
  audioFile: File,
  topic: string
): Promise<ServiceResponse<SpeakingScoreDTO>> => {
  try {
    // Create FormData object to send multipart/form-data
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("topic", topic);

    // Make the API request
    const response = await apiClient.post(
      "/score-speaking/speech-in-topic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in evaluateSpeechInTopic:", error);
    throw error;
  }
};

/**
 * Service for evaluating multiple audio files with their corresponding expected texts
 */
const evaluateMultipleFiles = async (
  audioFiles: File[],
  expectedTexts: string[]
): Promise<ServiceResponse<SpeakingScoreDTO>> => {
  try {
    // Create FormData object to send multipart/form-data
    const formData = new FormData();

    // Append each file with the same field name
    audioFiles.forEach((file) => {
      formData.append("files", file);
    });

    // Append each expected text with the same field name
    expectedTexts.forEach((text) => {
      formData.append("expectedTexts", text);
    });

    // Make the API request
    const response = await apiClient.post(
      "/score-speaking/multiple",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in evaluateMultipleFiles:", error);
    throw error;
  }
};

export const scoreSpeakingService = {
  evaluateSpeaking,
  evaluateSpeechInTopic,
  evaluateMultipleFiles,
};
