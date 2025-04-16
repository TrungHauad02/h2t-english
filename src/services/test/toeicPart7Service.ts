import { ToeicPart7 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part7/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart7 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part7/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart7 by ids:", error);
    throw error;
  }
};

const create = async (data: ToeicPart7) => {
  try {
    const response = await apiClient.post("/toeic-part7", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart7:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart7) => {
  try {
    const response = await apiClient.put(`/toeic-part7/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart7:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart7>) => {
  try {
    const response = await apiClient.patch(`/toeic-part7/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart7:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part7/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart7:", error);
    throw error;
  }
};

export const toeicPart7Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
