import { SubmitToeicPart2 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeicPart2> => {
  try {
    const response = await apiClient.get(`/submit-toeic-part2/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicPart2 by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeicPart2): Promise<SubmitToeicPart2> => {
  try {
    const response = await apiClient.post("/submit-toeic-part2", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeicPart2:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeicPart2): Promise<SubmitToeicPart2> => {
  try {
    const response = await apiClient.put(`/submit-toeic-part2/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeicPart2:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeicPart2>): Promise<SubmitToeicPart2> => {
  try {
    const response = await apiClient.patch(`/submit-toeic-part2/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeicPart2:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic-part2/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeicPart2:", error);
    throw error;
  }
};

export const submitToeicPart2Service = {
  findById,
  create,
  update,
  patch,
  remove,
};
