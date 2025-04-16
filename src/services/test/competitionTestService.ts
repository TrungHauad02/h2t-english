import { CompetitionTest } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/competition-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting CompetitionTest by id:", error);
    throw error;
  }
};

const create = async (data: CompetitionTest) => {
  try {
    const response = await apiClient.post("/competition-tests", data);
    return response.data;
  } catch (error) {
    console.error("Error creating CompetitionTest:", error);
    throw error;
  }
};

const update = async (id: number, data: CompetitionTest) => {
  try {
    const response = await apiClient.put(`/competition-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating CompetitionTest:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<CompetitionTest>) => {
  try {
    const response = await apiClient.patch(`/competition-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching CompetitionTest:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/competition-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting CompetitionTest:", error);
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

    const response = await apiClient.get(`/competition-tests?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error searching CompetitionTests with filters:", error);
    throw error;
  }
};

export const competitionTestService = {
  findById,
  create,
  update,
  patch,
  remove,
  searchWithFilters,
};
