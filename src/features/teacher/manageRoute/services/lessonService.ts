import {
  Grammar,
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
} from "interfaces";
import apiClient from "services/apiClient";

const createTopic = async (data: Topic) => {
  try {
    const response = await apiClient.post("/topics", data);
    return response.data;
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
};

const createGrammar = async (data: Grammar) => {
  try {
    const response = await apiClient.post("/grammars", data);
    return response.data;
  } catch (error) {
    console.error("Error creating grammar:", error);
    throw error;
  }
};

const createReading = async (data: Reading) => {
  try {
    const response = await apiClient.post("/readings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating reading:", error);
    throw error;
  }
};

const createListening = async (data: Listening) => {
  try {
    const response = await apiClient.post("/listenings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating listening:", error);
    throw error;
  }
};

const createSpeaking = async (data: Speaking) => {
  try {
    const response = await apiClient.post("/speakings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating speaking:", error);
    throw error;
  }
};

const createWriting = async (data: Writing) => {
  try {
    const response = await apiClient.post("/writings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating writing:", error);
    throw error;
  }
};

export const lessonService = {
  createTopic,
  createGrammar,
  createReading,
  createListening,
  createSpeaking,
  createWriting,
};
