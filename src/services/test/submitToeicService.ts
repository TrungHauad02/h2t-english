import { SubmitToeic, SubmitToeicFilter } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.get(`/submit-toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitToeic by id:", error);
    throw error;
  }
};

const create = async (data: SubmitToeic): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.post("/submit-toeic", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitToeic:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitToeic): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.put(`/submit-toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitToeic:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitToeic>): Promise<SubmitToeic> => {
  try {
    const response = await apiClient.patch(`/submit-toeic/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitToeic:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-toeic/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitToeic:", error);
    throw error;
  }
};

const getSubmitToeicsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: SubmitToeicFilter
) => {
  try {
    let url = `/submit-toeic?page=${page - 1}&size=${itemsPerPage}&userId=${userId}&status=true`;

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
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching submit toeics for student:", error);
    throw error;
  }
};

export const submitToeicService = {
  findById,
  create,
  update,
  patch,
  remove,
  getSubmitToeicsForStudent,
};
