import { WritingAnswer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/writing-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting writing answer by id:", error);
    throw error;
  }
};

const findByWritingId = async (writingId: number) => {
  try {
    const response = await apiClient.get(
      `/writing-answers?writingId=${writingId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting writing answer by writing id:", error);
    throw error;
  }
};

const create = async (data: WritingAnswer) => {
  try {
    const response = await apiClient.post("/writing-answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating writing answer:", error);
    throw error;
  }
};

const update = async (id: number, data: WritingAnswer) => {
  try {
    const response = await apiClient.put(`/writing-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing answer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<WritingAnswer>) => {
  try {
    const response = await apiClient.patch(`/writing-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing answer:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/writing-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting writing answer:", error);
    throw error;
  }
};

export const writingAnswerService = {
  findById,
  findByWritingId,
  create,
  update,
  patch,
  remove,
};
