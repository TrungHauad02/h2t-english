import { Topic } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

const getTopicById = async (id: number) => {
  try {
    const response = await apiClient.get(`/topics/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting topic by id:", error);
    throw error;
  }
};

const updateTopic = async (id: number, data: Topic) => {
  try {
    // TODO: Luu image vao firebase
    data.image = base64ToBlobUrl(data.image, "image/png");
    const response = await apiClient.put(`/topics/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
};

const patchTopic = async (id: number, data: any) => {
  try {
    // TODO: Luu image vao firebase
    if (data.image) data.image = base64ToBlobUrl(data.image, "image/png");
    const response = await apiClient.patch(`/topics/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
};

const deleteTopic = async (id: number) => {
  try {
    const response = await apiClient.delete(`/topics/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting topic:", error);
    throw error;
  }
};

export const topicService = {
  getTopicById,
  updateTopic,
  patchTopic,
  deleteTopic,
};
