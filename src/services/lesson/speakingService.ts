import { Speaking } from "interfaces";
import apiClient from "services/apiClient";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/speakings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting speakings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/speakings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting speaking by id:", error);
    throw error;
  }
};

const create = async (data: Speaking) => {
  try {
    const response = await apiClient.post("/speakings", data);
    return response.data;
  } catch (error) {
    console.error("Error creating speaking:", error);
    throw error;
  }
};

const update = async (id: number, data: Speaking) => {
  try {
    const response = await apiClient.put(`/speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating speaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Speaking>) => {
  try {
    const response = await apiClient.patch(`/speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating speaking:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/speakings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying speaking:", error);
    throw error;
  }
};

export const speakingService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
