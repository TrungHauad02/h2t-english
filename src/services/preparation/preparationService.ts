import { Preparation } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/preparations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting preparation by id:", error);
    throw error;
  }
};

const create = async (data: Preparation) => {
  try {
    const response = await apiClient.post(`/preparations`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating preparation:", error);
    throw error;
  }
};

const update = async (id: number, data: Preparation) => {
  try {
    const response = await apiClient.put(`/preparations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating preparation:", error);
    throw error;
  }
};

const patch = async (id: number, data: any) => {
  try {
    const response = await apiClient.patch(`/preparations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating preparation:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/preparations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting preparation:", error);
    throw error;
  }
};

export const preparationService = {
  findById,
  create,
  update,
  patch,
  remove,
};
