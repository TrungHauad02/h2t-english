import { TestPart } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-parts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestPart by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/test-parts/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting TestPart by ids:", error);
    throw error;
  }
};

const create = async (data: TestPart) => {
  try {
    const response = await apiClient.post("/test-parts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating TestPart:", error);
    throw error;
  }
};

const update = async (id: number, data: TestPart) => {
  try {
    const response = await apiClient.put(`/test-parts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating TestPart:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestPart>) => {
  try {
    const response = await apiClient.patch(`/test-parts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching TestPart:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-parts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestPart:", error);
    throw error;
  }
};

export const testPartService = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
