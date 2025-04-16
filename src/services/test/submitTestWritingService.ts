import { SubmitTestWriting } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number): Promise<SubmitTestWriting> => {
  try {
    const response = await apiClient.get(`/submit-test-writing/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting SubmitTestWriting by id:", error);
    throw error;
  }
};

const create = async (data: SubmitTestWriting): Promise<SubmitTestWriting> => {
  try {
    const response = await apiClient.post("/submit-test-writing", data);
    return response.data;
  } catch (error) {
    console.error("Error creating SubmitTestWriting:", error);
    throw error;
  }
};

const update = async (id: number, data: SubmitTestWriting): Promise<SubmitTestWriting> => {
  try {
    const response = await apiClient.put(`/submit-test-writing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating SubmitTestWriting:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<SubmitTestWriting>): Promise<SubmitTestWriting> => {
  try {
    const response = await apiClient.patch(`/submit-test-writing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching SubmitTestWriting:", error);
    throw error;
  }
};

const remove = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/submit-test-writing/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubmitTestWriting:", error);
    throw error;
  }
};

export const submitTestWritingService = {
  findById,
  create,
  update,
  patch,
  remove,
};
