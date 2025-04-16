import { SubmitTest, SubmitTestStats } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitTest> => {
  try {
    const response = await apiClient.get(`/submit-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitTest by id:", error);
    throw error;
  }
};

const create = async (data: SubmitTest): Promise<SubmitTest> => {
  try {
    const response = await apiClient.post("/submit-tests", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTest:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitTest): Promise<SubmitTest> => {
  try {
    const response = await apiClient.put(`/submit-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTest:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTest>): Promise<SubmitTest> => {
  try {
    const response = await apiClient.patch(`/submit-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitTest:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitTest:", error);
    throw error;
  }
};

const getTestStats = async (userId: number): Promise<SubmitTestStats> => {
  try {
    const response = await apiClient.get(`/submit-tests/stats?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving SubmitTest stats:", error);
    throw error;
  }
};

export const submitTestService = {
  findById,
  create,
  update,
  patch,
  remove,
  getTestStats,
};
