import { Topic } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/topics?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting topics:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/topics/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting topic by id:", error);
    throw error;
  }
};

const create = async (data: Topic) => {
  try {
    const response = await apiClient.post("/topics", data);
    return response.data;
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
};

const update = async (id: number, data: Topic) => {
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

const patch = async (id: number, data: Partial<Topic>) => {
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

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/topics/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying topic:", error);
    throw error;
  }
};

export const topicService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
