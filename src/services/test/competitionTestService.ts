import { CompetitionTest } from "interfaces";
import { CompetitionTestFilter } from "interfaces";
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


const getCompetitionTestsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: CompetitionTestFilter
) => {
  try {
    let url = `/competition-tests?page=${page - 1}&size=${itemsPerPage}&userId=${userId}&status=true`;

    if (filter) {
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
      }
      if (filter.sortBy) {
        url += `&sortFields=${encodeURIComponent(filter.sortBy)}`;
      }
      if (filter.startCreatedAt) {
        url += `&startCreatedAt=${filter.startCreatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.endCreatedAt) {
        url += `&endCreatedAt=${filter.endCreatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.startUpdatedAt) {
        url += `&startUpdatedAt=${filter.startUpdatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.endUpdatedAt) {
        url += `&endUpdatedAt=${filter.endUpdatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.startStartTime) {
        url += `&startStartTime=${filter.startStartTime.toISOString().slice(0, -1)}`;
      }
      if (filter.endStartTime) {
        url += `&endStartTime=${filter.endStartTime.toISOString().slice(0, -1)}`;
      }
      if (filter.startEndTime) {
        url += `&startEndTime=${filter.startEndTime.toISOString().slice(0, -1)}`;
      }
      if (filter.endEndTime) {
        url += `&endEndTime=${filter.endEndTime.toISOString().slice(0, -1)}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching CompetitionTests for student:", error);
    throw error;
  }
};

const getCompetitionTestsByTeacher = async (
  page: number,
  itemsPerPage: number,
  filter?: CompetitionTestFilter
) => {
  try {
    let url = `/competition-tests?page=${page - 1}&size=${itemsPerPage}`;

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
        url += `&startCreatedAt=${filter.startCreatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.endCreatedAt) {
        url += `&endCreatedAt=${filter.endCreatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.startUpdatedAt) {
        url += `&startUpdatedAt=${filter.startUpdatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.endUpdatedAt) {
        url += `&endUpdatedAt=${filter.endUpdatedAt.toISOString().slice(0, -1)}`;
      }
      if (filter.startStartTime) {
        url += `&startStartTime=${filter.startStartTime.toISOString().slice(0, -1)}`;
      }
      if (filter.endStartTime) {
        url += `&endStartTime=${filter.endStartTime.toISOString().slice(0, -1)}`;
      }
      if (filter.startEndTime) {
        url += `&startEndTime=${filter.startEndTime.toISOString().slice(0, -1)}`;
      }
      if (filter.endEndTime) {
        url += `&endEndTime=${filter.endEndTime.toISOString().slice(0, -1)}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching CompetitionTests for teacher:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/competition-tests/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying competition:", error);
    throw error;
  }
};

export const competitionTestService = {
  findById,
  create,
  update,
  patch,
  remove,
  getCompetitionTestsForStudent,
  getCompetitionTestsByTeacher,
  verify,
};
