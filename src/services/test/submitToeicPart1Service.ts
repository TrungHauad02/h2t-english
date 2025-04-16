import { SubmitToeicPart1 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.get(`/submit-toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicPart1 by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeicPart1): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.post("/submit-toeic-part1", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeicPart1:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeicPart1): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.put(`/submit-toeic-part1/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeicPart1:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeicPart1>): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.patch(`/submit-toeic-part1/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeicPart1:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeicPart1:", error);
    throw error;
  }
};

export const submitToeicPart1Service = {
  findById,
  create,
  update,
  patch,
  remove,
};
