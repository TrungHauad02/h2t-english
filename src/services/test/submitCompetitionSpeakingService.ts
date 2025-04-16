import { SubmitCompetitionSpeaking } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-competition-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitCompetitionSpeaking by id:", error);
    throw error;
  }
};

const create = async (data: SubmitCompetitionSpeaking) => {
  try {
    const response = await apiClient.post("/submit-competition-speaking", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitCompetitionSpeaking:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitCompetitionSpeaking) => {
  try {
    const response = await apiClient.put(`/submit-competition-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitCompetitionSpeaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitCompetitionSpeaking>) => {
  try {
    const response = await apiClient.patch(`/submit-competition-speaking/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitCompetitionSpeaking:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-competition-speaking/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitCompetitionSpeaking:", error);
    throw error;
  }
};

export const submitCompetitionSpeakingService = {
  findById,
  create,
  update,
  patch,
  remove,
};
