import { SubmitTestAnswer } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-test-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitTestAnswer by id:", error);
    throw error;
  }
};

const create = async (data: SubmitTestAnswer) => {
  try {
    const response = await apiClient.post("/submit-test-answers", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTestAnswer:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitTestAnswer) => {
  try {
    const response = await apiClient.put(`/submit-test-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTestAnswer:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTestAnswer>) => {
  try {
    const response = await apiClient.patch(`/submit-test-answers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitTestAnswer:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-test-answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitTestAnswer:", error);
    throw error;
  }
};

const findBySubmitTestIdAndQuestionId = async (submitTestId: number, questionId: number) => {
  try {
    const response = await apiClient.get(`/submit-test-answers/by-submit-test/${submitTestId}/question/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching by submitTestId and questionId:", error);
    throw error;
  }
};

const findBySubmitTestIdAndQuestionIds = async (submitTestId: number, questionIds: number[]) => {
  try {
    const response = await apiClient.post(`/submit-test-answers/by-submit-test/${submitTestId}/questions`, questionIds);
    return response.data;
  } catch (error) {
    console.error("Error fetching by submitTestId and questionIds:", error);
    throw error;
  }
};

export const submitTestAnswerService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitTestIdAndQuestionId,
  findBySubmitTestIdAndQuestionIds,
};
