import apiClient from "services/apiClient";

const getAvailableVoices = async () => {
  try {
    const response = await apiClient.get("/text-to-speech/voices");
    return response.data;
  } catch (error) {
    console.error("Error getting available voices:", error);
    throw error;
  }
};

const textToSpeech = async (text: string, voice: string) => {
  try {
    const response = await apiClient.post(
      "/text-to-speech",
      {
        text,
        voice,
      },
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error converting text to speech:", error);
    throw error;
  }
};

export const ttsService = {
  getAvailableVoices,
  textToSpeech,
};
