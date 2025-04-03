import { Writing } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/writings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting writing by id:", error);
    throw error;
  }
};

const createWriting = async (data: Writing) => {
  try {
    const response = await apiClient.post("/writings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating writing:", error);
    throw error;
  }
};

const updateWriting = async (id: number, data: Writing) => {
  try {
    const response = await apiClient.put(`/writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing:", error);
    throw error;
  }
};

const patchWriting = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing:", error);
    throw error;
  }
};

export const writingService = {
  findById,
  createWriting,
  updateWriting,
  patchWriting,
};
