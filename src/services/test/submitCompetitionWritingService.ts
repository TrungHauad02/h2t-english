import { SubmitCompetitionWriting } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-competition-writing/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitCompetitionWriting by id:", error);
    throw error;
  }
};

const create = async (data: SubmitCompetitionWriting) => {
  try {
    const response = await apiClient.post("/submit-competition-writing", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitCompetitionWriting:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitCompetitionWriting) => {
  try {
    const response = await apiClient.put(`/submit-competition-writing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitCompetitionWriting:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitCompetitionWriting>) => {
  try {
    const response = await apiClient.patch(`/submit-competition-writing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitCompetitionWriting:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-competition-writing/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitCompetitionWriting:", error);
    throw error;
  }
};
const findBySubmitCompetitionIdAndTestWritingIds = async (
  submitCompetitionId: number,
  testWritingIds: number[]
) => {
  const response = await apiClient.post(
    `/submit-competition-writing/by-submit-competition/${submitCompetitionId}/testwritings`,
    testWritingIds
  );
  return response.data;
};
const findBySubmitCompetitionIdAndTestWritingId = async (
  submitCompetitionId: number,
  testWritingId: number
) => {
  const response = await apiClient.get(
    `/submit-competition-writing/by-submit-competition/${submitCompetitionId}/testwriting/${testWritingId}`
  );
  return response.data;
};


export const submitCompetitionWritingService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitCompetitionIdAndTestWritingId,
  findBySubmitCompetitionIdAndTestWritingIds
};
