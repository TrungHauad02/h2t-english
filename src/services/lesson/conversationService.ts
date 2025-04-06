import { SpeakingConversation } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/speaking-conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting conversation by id:", error);
    throw error;
  }
};

const findBySpeakingId = async (speakingId: number) => {
  try {
    const response = await apiClient.get(
      `/speaking-conversations?speakingId=${speakingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting conversation by speaking id:", error);
    throw error;
  }
};

const create = async (data: SpeakingConversation) => {
  try {
    const response = await apiClient.post("/speaking-conversations", data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

const update = async (id: number, data: SpeakingConversation) => {
  try {
    const response = await apiClient.put(`/speaking-conversations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SpeakingConversation>) => {
  try {
    const response = await apiClient.patch(
      `/speaking-conversations/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/speaking-conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};

export const conversationService = {
  findById,
  findBySpeakingId,
  create,
  update,
  patch,
  remove,
};
