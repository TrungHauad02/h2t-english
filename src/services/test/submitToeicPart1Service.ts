import { SubmitToeicPart1 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.get(`/submit-toeic-part1s/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicPart1 by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeicPart1): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.post("/submit-toeic-part1s", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeicPart1:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeicPart1): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.put(`/submit-toeic-part1s/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeicPart1:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeicPart1>): Promise<SubmitToeicPart1> => {
  try {
    const response = await apiClient.patch(`/submit-toeic-part1s/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeicPart1:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic-part1s/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeicPart1:", error);
    throw error;
  }
};

const findBySubmitToeicIdAndToeicPart1Id = async (
  submitToeicId: number, 
  toeicPart1Id: number
): Promise<any> => {
  try {
    const response = await apiClient.get(
      `/submit-toeic-part1s/by-submit-toeic/${submitToeicId}/toeicPart1Id/${toeicPart1Id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicPart1 by submitToeicId and toeicPart1Id:", error);
    throw error;
  }
};

const findBySubmitToeicIdAndToeicPart1Ids = async (
  submitToeicId: number, 
  toeicPart1Ids: number[]
): Promise<any> => {
  try {
    const response = await apiClient.post(
      `/submit-toeic-part1s/by-submit-toeic/${submitToeicId}/toeicPart1s`,
      toeicPart1Ids
    );
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeicPart1 by submitToeicId and toeicPart1Ids:", error);
    throw error;
  }
};

export const submitToeicPart1Service = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitToeicIdAndToeicPart1Id,
  findBySubmitToeicIdAndToeicPart1Ids,
};