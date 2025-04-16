import { TestSpeaking } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestSpeaking by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/test-speaking/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting TestSpeaking by ids:", error);
    throw error;
  }
};

const create = async (data: TestSpeaking) => {
  try {
    const response = await apiClient.post("/test-speaking", data);
    return response.data;
  } catch (error) {
    console.error("Error creating TestSpeaking:", error);
    throw error;
  }
};

const update = async (id: number, data: TestSpeaking) => {
  try {
    const response = await apiClient.put(`/test-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating TestSpeaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestSpeaking>) => {
  try {
    const response = await apiClient.patch(`/test-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching TestSpeaking:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestSpeaking:", error);
    throw error;
  }
};

export const testSpeakingService = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
