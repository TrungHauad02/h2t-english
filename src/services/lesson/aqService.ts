import { LessonQuestion, QuestionSupportType } from "interfaces";
import apiClient from "services/apiClient";

const findByLessonId = async (lessonId: number, type: QuestionSupportType) => {
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

const create = async (data: LessonQuestion) => {
  try {
    const response = await apiClient.post(`/lesson-questions`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

const update = async (id: number, data: LessonQuestion) => {
  try {
    const response = await apiClient.put(`/lesson-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

const patch = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/lesson-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/lesson-questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

export const aqService = {
  findByLessonId,
  create,
  update,
  patch,
  remove,
};
