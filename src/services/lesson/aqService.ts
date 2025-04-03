import { LessonQuestion, QuestionSupportType } from "interfaces";
import apiClient from "services/apiClient";

const getQuestionByLessonId = async (
  lessonId: number,
  type: QuestionSupportType
) => {
  try {
    const response = await apiClient.get(
      `/${type}/questions?lessonId=${lessonId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting question by lesson id:", error);
    throw error;
  }
};

const getQuestionByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.get(`/lesson-questions`);
    return response.data;
  } catch (error) {
    console.error("Error getting question by lesson id:", error);
    throw error;
  }
};

const createQuestion = async (data: LessonQuestion) => {
  try {
    const response = await apiClient.post(`/lesson-questions`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

const updateQuestion = async (id: number, data: LessonQuestion) => {
  try {
    const response = await apiClient.put(`/lesson-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

const patchQuestion = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/lesson-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

const deleteQuestion = async (id: number) => {
  try {
    const response = await apiClient.delete(`/lesson-questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const aqService = {
  getQuestionByLessonId,
  getQuestionByIds,
  createQuestion,
  updateQuestion,
  patchQuestion,
  deleteQuestion,
};
