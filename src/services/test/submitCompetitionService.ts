import { SubmitCompetition, SubmitCompetitionFilter } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/submit-competitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitCompetition by id:", error);
    throw error;
  }
};

const create = async (data: SubmitCompetition) => {
  try {
    const response = await apiClient.post("/submit-competitions", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitCompetition:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitCompetition) => {
  try {
    const response = await apiClient.put(`/submit-competitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitCompetition:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitCompetition>) => {
  try {
    const response = await apiClient.patch(`/submit-competitions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitCompetition:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/submit-competitions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitCompetition:", error);
    throw error;
  }
};

const getSubmitCompetitionsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: SubmitCompetitionFilter
) => {
  try {
    let url = `/submit-competitions?page=${
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
    console.error("Error fetching submit competitions for student:", error);
    throw error;
  }
};

const findByIdAndUserIdAndStatus = async (
  testId: number,
  userId: number,
  status: boolean
): Promise<{ data: SubmitCompetition }> => {
  try {
    const response = await apiClient.get(
      `/submit-competitions/by-test-and-user?testId=${testId}&userId=${userId}&status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching submit competitions for student:", error);
    throw error;
  }
};

const getLeaderBoard = async () => {
  try {
    const response = await apiClient.get(
      `/home/submit-competitions/leaderboard`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting leader board:", error);
    throw error;
  }
};
const findByTestIdAndStatus = async (
  testId: number,
  status: boolean
): Promise<{ data: SubmitCompetition[] }> => {
  try {
    const response = await apiClient.get(
      `/submit-competitions/by-test-id-and-status?testId=${testId}&status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching SubmitCompetitions by testId and status:",
      error
    );
    throw error;
  }
};

export const submitCompetitionService = {
  findById,
  create,
  update,
  patch,
  remove,
  getSubmitCompetitionsForStudent,
  findByIdAndUserIdAndStatus,
  getLeaderBoard,
  findByTestIdAndStatus,
};
