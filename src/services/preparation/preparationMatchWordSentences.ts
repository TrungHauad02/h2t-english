import { PreparationMatchWordSentences } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(
      `/preparation-match-word-sentences/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting preparation by id:", error);
    throw error;
  }
};

const create = async (data: PreparationMatchWordSentences) => {
  try {
    const response = await apiClient.post(
      `/preparation-match-word-sentences`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating preparation:", error);
    throw error;
  }
};

const update = async (id: number, data: PreparationMatchWordSentences) => {
  try {
    const response = await apiClient.put(
      `/preparation-match-word-sentences/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating preparation:", error);
    throw error;
  }
};

const patch = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(
      `/preparation-match-word-sentences/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating preparation:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(
      `/preparation-match-word-sentences/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting preparation:", error);
    throw error;
  }
};

export const preparationMatchWordSentencesService = {
  findById,
  create,
  update,
  patch,
  remove,
};
