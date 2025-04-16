import { Test } from "interfaces";
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

    const response = await apiClient.get(`/tests?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error searching tests with filters:", error);
    throw error;
  }
};

export const testService = {
  findById,
  create,
  update,
  patch,
  remove,
  searchWithFilters,
};
