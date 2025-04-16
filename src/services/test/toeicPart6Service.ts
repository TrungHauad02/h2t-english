import { ToeicPart6 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part6/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart6 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part6/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart6 by ids:", error);
    throw error;
  }
};

const create = async (data: ToeicPart6) => {
  try {
    const response = await apiClient.post("/toeic-part6", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart6:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart6) => {
  try {
    const response = await apiClient.put(`/toeic-part6/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart6:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart6>) => {
  try {
    const response = await apiClient.patch(`/toeic-part6/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart6:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part6/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart6:", error);
    throw error;
  }
};

export const toeicPart6Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
