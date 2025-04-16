import { Answer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Answer by id:", error);
    throw error;
  }
};

const create = async (data: Answer) => {
  try {
    const response = await apiClient.post("/answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Answer:", error);
    throw error;
  }
};

const update = async (id: number, data: Answer) => {
  try {
    const response = await apiClient.put(`/answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Answer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Answer>) => {
  try {
    const response = await apiClient.patch(`/answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching Answer:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Answer:", error);
    throw error;
  }
};

export const answerService = {
  findById,
  create,
  update,
  patch,
  remove,
};
