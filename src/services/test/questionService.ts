import { Question } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Question by id:", error);
    throw error;
  }
};

const create = async (data: Question) => {
  try {
    const response = await apiClient.post("/questions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Question:", error);
    throw error;
  }
};

const update = async (id: number, data: Question) => {
  try {
    const response = await apiClient.put(`/questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Question:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Question>) => {
  try {
    const response = await apiClient.patch(`/questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching Question:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Question:", error);
    throw error;
  }
};

export const questionService = {
  findById,
  create,
  update,
  patch,
  remove,
};
