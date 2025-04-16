import { SubmitToeicAnswer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeicAnswer> => {
  try {
    const response = await apiClient.get(`/submit-toeic-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicAnswer by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeicAnswer): Promise<SubmitToeicAnswer> => {
  try {
    const response = await apiClient.post("/submit-toeic-answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeicAnswer:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeicAnswer): Promise<SubmitToeicAnswer> => {
  try {
    const response = await apiClient.put(`/submit-toeic-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeicAnswer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeicAnswer>): Promise<SubmitToeicAnswer> => {
  try {
    const response = await apiClient.patch(`/submit-toeic-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeicAnswer:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeicAnswer:", error);
    throw error;
  }
};

export const submitToeicAnswerService = {
  findById,
  create,
  update,
  patch,
  remove,
};
