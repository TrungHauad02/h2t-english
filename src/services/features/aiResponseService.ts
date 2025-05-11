import { AIResponse } from "interfaces";
import { AIResponseFilter } from "interfaces";
import apiClient from "services/apiClient";
import { formatLocalDateForFilter } from "utils/format";

const getAIResponses = async (
  page: number,
  itemsPerPage: number,
  filter?: AIResponseFilter
) => {
  try {
    let url = `/ai-response?page=${page - 1}&size=${itemsPerPage}`;

    if (filter) {
      // Status
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }

      // User_id 
      if (filter.userId) {
        url += `&userId=${encodeURIComponent(filter.userId)}`;
      }

      // SortBy
      if (filter.sortBy) {
        url += `&sort=${encodeURIComponent(filter.sortBy)}`;
      }

      // Xử lý ngày tháng với múi giờ địa phương
      if (filter.startCreatedAt) {
        const formattedStartDate = formatLocalDateForFilter(
          filter.startCreatedAt,
          false
        );
        url += `&startCreatedAt=${formattedStartDate}`;
      }

      if (filter.endCreatedAt) {
        const formattedEndDate = formatLocalDateForFilter(
          filter.endCreatedAt,
          true
        );
        url += `&endCreatedAt=${formattedEndDate}`;
      }

      // UpdatedAt fields
      if (filter.startUpdatedAt) {
        const formattedStartUpdateDate = formatLocalDateForFilter(
          filter.startUpdatedAt,
          false
        );
        url += `&startUpdatedAt=${formattedStartUpdateDate}`;
      }

      if (filter.endUpdatedAt) {
        const formattedEndUpdateDate = formatLocalDateForFilter(
          filter.endUpdatedAt,
          true
        );
        url += `&endUpdatedAt=${formattedEndUpdateDate}`;
      }
    }

    console.log("API Request URL:", url);
    
    const response = await apiClient.get(url);
    
    // Truy cập đúng vào dữ liệu trong response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching AIResponse:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<AIResponse>) => {
  try {
    const response = await apiClient.patch(`/ai-response/${id}`, data);
    // Truy cập đúng dữ liệu trong response
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error updating ai-response:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/ai-response/${id}`);
    // Truy cập đúng dữ liệu trong response
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error getting ai-response by id:", error);
    throw error;
  }
};

const update = async (id: number, data: AIResponse) => {
  try {
    const response = await apiClient.put(`/ai-response/${id}`, data);
    // Truy cập đúng dữ liệu trong response
    return response.data.data || response.data;
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
  getAIResponses,
  findById,
  update,
  patch,
  remove,
};