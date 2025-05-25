import { Toeic } from "interfaces";
import { ToeicFilter } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Toeic by id:", error);
    throw error;
  }
};

const create = async (data: Toeic) => {
  try {
    const response = await apiClient.post("/toeic", data);
    return response.data;
  } catch (error) {
    console.error("Error creating Toeic:", error);
    throw error;
  }
};

const update = async (id: number, data: Toeic) => {
  try {
    const response = await apiClient.put(`/toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Toeic:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Toeic>) => {
  try {
    const response = await apiClient.patch(`/toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching Toeic:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Toeic:", error);
    throw error;
  }
};

// === TÁCH 2 HÀM ===

// Lấy TOEIC cho HỌC SINH (phải có userId)
const getToeicsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: ToeicFilter
) => {
  try {
    let url = `/toeic?page=${
      page - 1
    }&size=${itemsPerPage}&userId=${userId}&status=true`;

    if (filter) {
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
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
    console.error("Error fetching TOEIC for student:", error);
    throw error;
  }
};

// Lấy TOEIC cho GIÁO VIÊN (không cần userId)
const getToeicsByTeacher = async (
  page: number,
  itemsPerPage: number,
  filter?: ToeicFilter,
  ownerId?: number
) => {
  try {
    let url = `/toeic?page=${page - 1}&size=${itemsPerPage}&ownerId=${ownerId}`;

    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
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
    console.error("Error fetching TOEIC for teacher:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying toeic:", error);
    throw error;
  }
};

const getRecentToeic = async () => {
  try {
    const response = await apiClient.get(`/home/toeic/recent`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent Toeic:", error);
    throw error;
  }
};

export const toeicService = {
  findById,
  create,
  update,
  patch,
  remove,
  getToeicsForStudent,
  getToeicsByTeacher,
  getRecentToeic,
  verify,
};
