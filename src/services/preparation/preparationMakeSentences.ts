import { PreparationMakeSentences } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/preparation-make-sentences/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting preparation by id:", error);
    throw error;
  }
};

const create = async (data: PreparationMakeSentences) => {
  try {
    const response = await apiClient.post(`/preparation-make-sentences`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating preparation:", error);
    throw error;
  }
};

const update = async (id: number, data: PreparationMakeSentences) => {
  try {
    const response = await apiClient.put(
      `/preparation-make-sentences/${id}`,
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
      `/preparation-make-sentences/${id}`,
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
      `/preparation-make-sentences/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting preparation:", error);
    throw error;
  }
};

export const preparationMakeSentencesService = {
  findById,
  create,
  update,
  patch,
  remove,
};
