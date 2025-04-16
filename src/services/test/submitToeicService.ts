import { SubmitToeic, SubmitTestStats } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.get(`/submit-toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeic by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeic): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.post("/submit-toeic", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeic:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeic): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.put(`/submit-toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeic:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeic>): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.patch(`/submit-toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeic:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeic:", error);
    throw error;
  }
};

const getTestStats = async (userId: number): Promise<SubmitTestStats> => {
  try {
    const response = await apiClient.get(`/submit-toeic/stats?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeic stats:", error);
    throw error;
  }
};

export const submitToeicService = {
  findById,
  create,
  update,
  patch,
  remove,
  getTestStats,
};
