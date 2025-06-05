import { ServiceResponse } from "interfaces";
import apiClient from "services/apiClient";

interface SpeakingScoreDTO {
  score: string;
  strengths: string[];
  areas_to_improve: string[];
  transcript: string;
  feedback: string;
}

interface ConversationScoreDTO {
  score: string;
  strengths: string[];
  areas_to_improve: string[];
  transcripts: string[];
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
 * Optimized for large audio files with compression support
 */
const evaluateSpeechInTopic = async (
  audioFile: File,
  topic: string
): Promise<ServiceResponse<SpeakingScoreDTO>> => {
  try {
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
    if (audioFile.size > maxSizeInBytes) {
      return {
        status: "FAIL",
        message: `File size exceeds maximum allowed size of 50MB. Current size: ${(
          audioFile.size /
          (1024 * 1024)
        ).toFixed(2)}MB`,
      } as ServiceResponse<SpeakingScoreDTO>;
    }

    // Create FormData object to send multipart/form-data
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("topic", topic);

    // Add metadata about compression if filename indicates compression
    if (audioFile.name.includes("compressed")) {
      formData.append("isCompressed", "true");
    }

    const startTime = Date.now();
    const response = await apiClient.post(
      "/score-speaking/speech-in-topic",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            const elapsedTime = (Date.now() - startTime) / 1000;
            const uploadSpeed =
              progressEvent.loaded / 1024 / 1024 / elapsedTime; // MB/s

            console.log(
              `Upload progress: ${percentCompleted}% (${uploadSpeed.toFixed(
                2
              )} MB/s)`
            );
          }
        },
      }
    );

    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`Upload completed in ${totalTime.toFixed(2)} seconds`);

    return response.data;
  } catch (error: any) {
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
): Promise<ServiceResponse<ConversationScoreDTO>> => {
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
