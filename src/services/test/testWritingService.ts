import { TestWriting } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-writings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestWriting by id:", error);
    throw error;
  }
};

const getByIdsAndStatus = async (ids: number[], status?: Boolean) => {
  try {
    const response = await apiClient.post("/test-writings/by-ids", ids, {
      params: status ? { status } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting TestWriting by ids and status:", error);
    throw error;
  }
};


const create = async (data: TestWriting) => {
  try {
    const response = await apiClient.post("/test-writings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating TestWriting:", error);
    throw error;
  }
};

const update = async (id: number, data: TestWriting) => {
  try {
    const response = await apiClient.put(`/test-writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating TestWriting:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestWriting>) => {
  try {
    const response = await apiClient.patch(`/test-writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching TestWriting:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-writings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestWriting:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-writings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying test writing:", error);
    throw error;
  }
};

export const testWritingService = {
  findById,
  getByIdsAndStatus,
  create,
  update,
  patch,
  remove,
  verify
};
