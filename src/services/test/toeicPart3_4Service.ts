import { ToeicPart3_4 } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part3-4/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart3_4 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part3-4/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart3_4 by ids:", error);
    throw error;
  }
};

const create = async (data: ToeicPart3_4) => {
  try {
    const response = await apiClient.post("/toeic-part3-4", data);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart3_4:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart3_4) => {
  try {
    const response = await apiClient.put(`/toeic-part3-4/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart3_4:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart3_4>) => {
  try {
    const response = await apiClient.patch(`/toeic-part3-4/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart3_4:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part3-4/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart3_4:", error);
    throw error;
  }
};

export const toeicPart3_4Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
