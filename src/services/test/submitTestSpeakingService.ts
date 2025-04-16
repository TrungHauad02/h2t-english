import { SubmitTestSpeaking } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitTestSpeaking> => {
  try {
    const response = await apiClient.get(`/submit-test-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitTestSpeaking by id:", error);
    throw error;
  }
};

const create = async (data: SubmitTestSpeaking): Promise<SubmitTestSpeaking> => {
  try {
    const response = await apiClient.post("/submit-test-speaking", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTestSpeaking:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitTestSpeaking): Promise<SubmitTestSpeaking> => {
  try {
    const response = await apiClient.put(`/submit-test-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTestSpeaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTestSpeaking>): Promise<SubmitTestSpeaking> => {
  try {
    const response = await apiClient.patch(`/submit-test-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitTestSpeaking:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-test-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitTestSpeaking:", error);
    throw error;
  }
};

export const submitTestSpeakingService = {
  findById,
  create,
  update,
  patch,
  remove,
};
