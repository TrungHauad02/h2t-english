import { Reading } from "interfaces";
import apiClient from "services/apiClient";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/readings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting readings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/readings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting reading by id:", error);
    throw error;
  }
};

const create = async (data: Reading) => {
  try {
    const response = await apiClient.post("/readings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating reading:", error);
    throw error;
  }
};

const update = async (id: number, data: Reading) => {
  try {
    const response = await apiClient.put(`/readings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating reading:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Reading>) => {
  try {
    const response = await apiClient.patch(`/readings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating reading:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/readings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying reading:", error);
    throw error;
  }
};

export const readingService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
