import { SubmitCompetition, SubmitTestStats } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-competitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitCompetition by id:", error);
    throw error;
  }
};

const create = async (data: SubmitCompetition) => {
  try {
    const response = await apiClient.post("/submit-competitions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitCompetition:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitCompetition) => {
  try {
    const response = await apiClient.put(`/submit-competitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitCompetition:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitCompetition>) => {
  try {
    const response = await apiClient.patch(`/submit-competitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitCompetition:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-competitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitCompetition:", error);
    throw error;
  }
};

const getTestStats = async (userId: number): Promise<SubmitTestStats> => {
  try {
    const response = await apiClient.get(`/submit-competitions/stats?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving submit test stats:", error);
    throw error;
  }
};

export const submitCompetitionService = {
  findById,
  create,
  update,
  patch,
  remove,
  getTestStats,
};
