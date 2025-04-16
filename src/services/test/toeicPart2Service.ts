import { ToeicPart2 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part2/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart2 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part2/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart2 by ids:", error);
    throw error;
  }
};

const create = async (data: ToeicPart2) => {
  try {
    const response = await apiClient.post("/toeic-part2", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart2:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart2) => {
  try {
    const response = await apiClient.put(`/toeic-part2/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart2:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart2>) => {
  try {
    const response = await apiClient.patch(`/toeic-part2/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart2:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part2/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart2:", error);
    throw error;
  }
};

export const toeicPart2Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
