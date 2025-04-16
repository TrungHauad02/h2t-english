import { TestListening } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-listening/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/test-listening/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by ids:", error);
    throw error;
  }
};

const create = async (data: TestListening) => {
  try {
    const response = await apiClient.post("/test-listening", data);
    return response.data;
  } catch (error) {
    console.error("Error creating TestListening:", error);
    throw error;
  }
};

const update = async (id: number, data: TestListening) => {
  try {
    const response = await apiClient.put(`/test-listening/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating TestListening:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestListening>) => {
  try {
    const response = await apiClient.patch(`/test-listening/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching TestListening:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-listening/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestListening:", error);
    throw error;
  }
};

export const testListeningService = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
