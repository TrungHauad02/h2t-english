import { TestSpeaking } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-speakings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestSpeaking by id:", error);
    throw error;
  }
};

const getByIdsAndStatus = async (ids: number[], status?: Boolean) => {
  try {
    const response = await apiClient.post("/test-speakings/by-ids", ids, {
      params: status ? { status } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting TestSpeaking by ids and status:", error);
    throw error;
  }
};


const create = async (data: TestSpeaking) => {
  try {
    const response = await apiClient.post("/test-speakings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating TestSpeaking:", error);
    throw error;
  }
};

const update = async (id: number, data: TestSpeaking) => {
  try {
    const response = await apiClient.put(`/test-speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating TestSpeaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestSpeaking>) => {
  try {
    const response = await apiClient.patch(`/test-speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching TestSpeaking:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-speakings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestSpeaking:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-speakings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying question:", error);
    throw error;
  }
};


export const testSpeakingService = {
  findById,
  getByIdsAndStatus,
  create,
  update,
  patch,
  remove,
  verify,
};
