import { ToeicPart1 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart1 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part1/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart1 by ids:", error);
    throw error;
  }
};

const create = async (data: ToeicPart1) => {
  try {
    const response = await apiClient.post("/toeic-part1", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart1:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart1) => {
  try {
    const response = await apiClient.put(`/toeic-part1/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart1:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart1>) => {
  try {
    const response = await apiClient.patch(`/toeic-part1/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart1:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart1:", error);
    throw error;
  }
};

export const toeicPart1Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
