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
      console.log("🔍 Filter object:", filter);
      
      // Status - Chỉ thêm khi không undefined
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
        console.log("✅ Added status to URL:", filter.status);
      } else {
        console.log("❌ Status is undefined/null, not adding to URL");
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

    console.log("🌐 Final API URL:", url);
    const response = await apiClient.get(url);
    console.log("📊 Response data length:", response.data.data?.content?.length || 0);

    return response.data.data;
  } catch (error) {
    console.error("❌ Error fetching AIResponse:", error);
    throw error;
  }
};

// Teacher view method - đã sửa để khớp với BE endpoint
const getTeacherViewResponses = async (
  page: number,
  itemsPerPage: number,
  filter?: AIResponseFilter,
  teacherId?: number // Thêm teacherId parameter
) => {
  try {
    // Sửa URL để khớp với BE endpoint
    let url = `/ai-response/teacher-view?page=${page - 1}&size=${itemsPerPage}`;

    // Thêm teacherId vào URL (required param ở BE)
    if (teacherId) {
      url += `&teacherId=${teacherId}`;
    } else {
      throw new Error("Teacher ID is required for teacher view");
    }

    if (filter) {
      console.log("🎓 Teacher view filter:", filter);
      
      // THÊM STATUS FILTER CHO TEACHER VIEW
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
        console.log("✅ Teacher view - Added status to URL:", filter.status);
      } else {
        console.log("❌ Teacher view - Status is undefined/null, not adding to URL");
      }

      // SortFields thay vì sortBy
      if (filter.sortBy) {
        url += `&sortFields=${encodeURIComponent(filter.sortBy)}`;
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

    console.log("🎓 Teacher view - Final API URL:", url);
    const response = await apiClient.get(url);
    console.log("🎓 Teacher view - Response data length:", response.data.data?.content?.length || 0);

    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error fetching teacher view AIResponse:", error);
    console.error("❌ Error response:", error.response);
    throw error;
  }
};

const patch = async (id: number, data: Partial<AIResponse>) => {
  try {
    const response = await apiClient.patch(`/ai-response/${id}`, data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error updating ai-response:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/ai-response/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error getting ai-response by id:", error);
    throw error;
  }
};

const update = async (id: number, data: AIResponse) => {
  try {
    const response = await apiClient.put(`/ai-response/${id}`, data);
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
  getTeacherViewResponses,
  findById,
  update,
  patch,
  remove,
};