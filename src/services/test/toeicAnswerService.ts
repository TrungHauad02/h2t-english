import { ToeicAnswer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicAnswer by id:", error);
    throw error;
  }
};

const create = async (data: ToeicAnswer) => {
  try {
    const response = await apiClient.post("/toeic-answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicAnswer:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicAnswer) => {
  try {
    const response = await apiClient.put(`/toeic-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicAnswer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicAnswer>) => {
  try {
    const response = await apiClient.patch(`/toeic-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicAnswer:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicAnswer:", error);
    throw error;
  }
};

export const toeicAnswerService = {
  findById,
  create,
  update,
  patch,
  remove,
};
