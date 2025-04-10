import { Listening } from "interfaces";
import apiClient from "services/apiClient";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/listenings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting listenings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting listening by id:", error);
    throw error;
  }
};

const create = async (data: Listening) => {
  try {
    const response = await apiClient.post("/listenings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating listening:", error);
    throw error;
  }
};

const update = async (id: number, data: Listening) => {
  try {
    const response = await apiClient.put(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating listening:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Listening>) => {
  try {
    const response = await apiClient.patch(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching listening:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/listenings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying listening:", error);
    throw error;
  }
};

export const listeningService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
