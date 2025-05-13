import { SubmitCompetitionAnswer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-competition-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitCompetitionAnswer by id:", error);
    throw error;
  }
};

const create = async (data: SubmitCompetitionAnswer) => {
  try {
    const response = await apiClient.post("/submit-competition-answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitCompetitionAnswer:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitCompetitionAnswer) => {
  try {
    const response = await apiClient.put(`/submit-competition-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitCompetitionAnswer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitCompetitionAnswer>) => {
  try {
    const response = await apiClient.patch(`/submit-competition-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitCompetitionAnswer:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-competition-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitCompetitionAnswer:", error);
    throw error;
  }
};
const findBySubmitCompetitionIdAndQuestionIds = async (
  submitCompetitionId: number,
  questionIds: number[]
) => {
  const response = await apiClient.post(
    `/submit-competition-answers/by-submit-competition/${submitCompetitionId}/questions`,
    questionIds
  );
  return response.data;
};
const findBySubmitCompetitionIdAndQuestionId = async (
  submitCompetitionId: number,
  questionId: number
) => {
  const response = await apiClient.get(
    `/submit-competition-answers/by-submit-competition/${submitCompetitionId}/question/${questionId}`
  );
  return response.data;
};



export const submitCompetitionAnswerService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitCompetitionIdAndQuestionId,
  findBySubmitCompetitionIdAndQuestionIds
};
