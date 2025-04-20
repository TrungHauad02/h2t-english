import { SpeakingConversation } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

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
    // Xử lý audioUrl bằng fileHandlerService
    if (data.audioUrl) {
      const audioResult = await fileHandlerService.handleFileUpdate({
        base64: data.audioUrl,
        path: "speaking-conversation",
        randomName: "YES",
        fileName: data.id.toString(),
      });
      data.audioUrl = audioResult.data;
    }

    const response = await apiClient.post("/speaking-conversations", data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

const update = async (id: number, data: SpeakingConversation) => {
  try {
    // Lấy dữ liệu hiện tại để có oldFilePath
    const existingData = await findById(id);

    // Xử lý audioUrl bằng fileHandlerService
    if (data.audioUrl) {
      const audioResult = await fileHandlerService.handleFileUpdate({
        base64: data.audioUrl,
        path: "speaking-conversation",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.audioUrl,
      });
      data.audioUrl = audioResult.data;
    }

    const response = await apiClient.put(`/speaking-conversations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating conversation:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SpeakingConversation>) => {
  try {
    // Lấy dữ liệu hiện tại để có oldFilePath
    const existingData = await findById(id);

    // Xử lý audioUrl bằng fileHandlerService
    if (data.audioUrl) {
      const audioResult = await fileHandlerService.handleFileUpdate({
        base64: data.audioUrl,
        path: "speaking-conversation",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.audioUrl,
      });
      data.audioUrl = audioResult.data;
    }

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
