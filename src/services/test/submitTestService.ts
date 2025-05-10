import { SubmitTest,SubmitTestFilter } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.get(`/submit-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitTest by id:", error);
    throw error;
  }
};

const create = async (data: SubmitTest): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.post("/submit-tests", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTest:", error);
    throw error;
  }
};


const update = async (id: number, data: SubmitTest): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.put(`/submit-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTest:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTest>): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.patch(`/submit-tests/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitTest:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-tests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitTest:", error);
    throw error;
  }
};

const findByIdAndUserIdAndStatusFalse = async (testId: number, userId: number): Promise<{ data: SubmitTest }> => {
  try {
    const response = await apiClient.get(`/submit-tests/by-test-and-user?testId=${testId}&userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error finding SubmitTest:", error);
    throw error;
  }
};

const getSubmitTestsForStudent = async (
  page: number,
  itemsPerPage: number,
  userId: number,
  filter?: SubmitTestFilter
) => {
  try {
    let url = `/submit-tests?page=${page - 1}&size=${itemsPerPage}&userId=${userId}&status=true`;

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
    console.error("Error fetching submit tests for student:", error);
    throw error;
  }
};



export const submitTestService = {
  findById,
  create,
  update,
  patch,
  remove,
  findByIdAndUserIdAndStatusFalse,
  getSubmitTestsForStudent,
};
