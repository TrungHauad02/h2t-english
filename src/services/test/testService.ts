import { Test } from "interfaces";
import { TestFilter } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting test by id:", error);
    throw error;
  }
};

const create = async (testData: Test) => {
  try {
    const response = await apiClient.post("/tests", testData);
    return response.data;
  } catch (error) {
    console.error("Error creating test:", error);
    throw error;
  }
};

const update = async (id: number, testData: Test) => {
  try {
    const response = await apiClient.put(`/tests/${id}`, testData);
    return response.data;
  } catch (error) {
    console.error("Error updating test:", error);
    throw error;
  }
};

const patch = async (id: number, testData: Partial<Test>) => {
  try {
    const response = await apiClient.patch(`/tests/${id}`, testData);
    return response.data;
  } catch (error) {
    console.error("Error patching test:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting test:", error);
    throw error;
  }
};

// === TÁCH RA 2 HÀM ===

// Lấy tests cho HỌC SINH (phải có userId)
const getTestsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: TestFilter
) => {
  try {
    let url = `/tests?page=${
      page - 1
    }&size=${itemsPerPage}&userId=${userId}&status=true`;

    if (filter) {
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
      }
      if (filter.type) {
        url += `&type=${encodeURIComponent(filter.type)}`;
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
    console.error("Error fetching tests for student:", error);
    throw error;
  }
};

// Lấy tests cho GIÁO VIÊN (không cần userId)
const getTestsByTeacher = async (
  page: number,
  itemsPerPage: number,
  filter?: TestFilter
) => {
  try {
    let url = `/tests?page=${page - 1}&size=${itemsPerPage}`;

    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
      }
      if (filter.type) {
        url += `&type=${encodeURIComponent(filter.type)}`;
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
    console.error("Error fetching tests for teacher:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/tests/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying test:", error);
    throw error;
  }
};

const getRecentTest = async () => {
  try {
    const response = await apiClient.get("/home/tests/recent");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent tests:", error);
    throw error;
  }
};

export const testService = {
  findById,
  create,
  update,
  patch,
  remove,
  getTestsForStudent,
  getTestsByTeacher,
  verify,
  getRecentTest,
};
