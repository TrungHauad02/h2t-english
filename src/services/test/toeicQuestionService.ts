import { ToeicQuestion } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicQuestion by id:", error);
    throw error;
  }
};

const getByIdsAndStatus = async (ids: number[], status?: Boolean) => {
  try {
    const response = await apiClient.post("/toeic-questions/by-ids", ids, {
      params: status ? { status } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting toeic-questions by ids and status:", error);
    throw error;
  }
};

const create = async (data: ToeicQuestion) => {
  try {
    const response = await apiClient.post("/toeic-questions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicQuestion:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicQuestion) => {
  try {
    const response = await apiClient.put(`/toeic-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicQuestion:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicQuestion>) => {
  try {
    const response = await apiClient.patch(`/toeic-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicQuestion:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicQuestion:", error);
    throw error;
  }
};

export const toeicQuestionService = {
  findById,
  create,
  getByIdsAndStatus,
  update,
  patch,
  remove,
};
