import { Toeic } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Toeic by id:", error);

  }
};

const create = async (data: Toeic) => {
  try {
    const response = await apiClient.post("/toeic", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Toeic:", error);
 
  }
};

const update = async (id: number, data: Toeic) => {
  try {
    const response = await apiClient.put(`/toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Toeic:", error);

  }
};

const patch = async (id: number, data: Partial<Toeic>) => {
  try {
    const response = await apiClient.patch(`/toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching Toeic:", error);

  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Toeic:", error);

  }
};

const searchWithFilters = async (
  page = 0,
  size = 10,
  sortFields = "",
  userId = "",
  filter: Record<string, any> = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortFields,
      userId,
      ...filter,
    });

    const response = await apiClient.get(`/toeic?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error searching Toeic with filters:", error);

  }
};

export const toeicService = {
  findById,
  create,
  update,
  patch,
  remove,
  searchWithFilters,
};
