import { Listening } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting listening by id:", error);
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

const updateListening = async (id: number, data: Listening) => {
  try {
    const response = await apiClient.put(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating listening:", error);
    throw error;
  }
};

const patchListening = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating listening:", error);
    throw error;
  }
};

export const listeningService = {
  findById,
  createListening,
  updateListening,
  patchListening,
};
