import { AIResponse, AIResponseFilter } from "interfaces";
import apiClient from "services/apiClient";

const findAll = async (
  page: number,
  itemsPerPage: number,
  filter?: AIResponseFilter
) => {
  try {
    let url = `/ai-response?page=${page - 1}&size=${itemsPerPage}`;

    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }
      if (filter.userId) {
        url += `&userId=${encodeURIComponent(filter.userId)}`;
      }
      if (filter.sortBy) {
        url += `&sortFields=${encodeURIComponent(filter.sortBy)}`;
      }
      if (filter.startCreatedAt) {
        url += `&startCreatedAt=${filter.startCreatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.endCreatedAt) {
        url += `&endCreatedAt=${filter.endCreatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.startUpdatedAt) {
        url += `&startUpdatedAt=${filter.startUpdatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.endUpdatedAt) {
        url += `&endUpdatedAt=${filter.endUpdatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching AIResponse:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/ai-response/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ai-response by id:", error);
    throw error;
  }
};

const update = async (id: number, data: AIResponse) => {
  try {
    const response = await apiClient.put(`/ai-response/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ai-response:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<AIResponse>) => {
  try {
    const response = await apiClient.patch(`/ai-response/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ai-response:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/ai-response/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ai-response:", error);
    throw error;
  }
};

export const aiResponseService = {
  findAll,
  findById,
  update,
  patch,
  remove,
};
