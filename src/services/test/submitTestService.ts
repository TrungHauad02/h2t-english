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

const create = async (data: SubmitTest): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.post("/submit-tests", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTest:", error);
    throw error;
  }
};


const update = async (id: number, data: SubmitTest): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.put(`/submit-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTest:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTest>): Promise<{ data: SubmitTest }> => {
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

const getTestStats = async (userId: number): Promise<{ data: SubmitTestStats }> => {
  try {
    const response = await apiClient.get(`/submit-tests/stats?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving SubmitTest stats:", error);
    throw error;
  }
};
const findByIdAndUserIdAndStatusFalse = async (testId: number, userId: number): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.get(`/submit-tests/by-test-and-user?testId=${testId}&userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error finding SubmitTest:", error);
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
  findByIdAndUserIdAndStatusFalse,
};
