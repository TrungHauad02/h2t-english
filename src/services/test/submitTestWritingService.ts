import { SubmitTestWriting } from "interfaces";
import apiClient from "services/apiClient";

const findById = async (id: number)=> {
  const response = await apiClient.get(`/submit-test-writing/${id}`);
  return response.data;
};

const create = async (data: SubmitTestWriting)=> {
  const response = await apiClient.post("/submit-test-writing", data);
  return response.data;
};

const update = async (id: number, data: SubmitTestWriting) => {
  const response = await apiClient.put(`/submit-test-writing/${id}`, data);
  return response.data;
};

const patch = async (id: number, data: Partial<SubmitTestWriting>) => {
  const response = await apiClient.patch(`/submit-test-writing/${id}`, data);
  return response.data;
};

const remove = async (id: number): Promise<any> => {
  const response = await apiClient.delete(`/submit-test-writing/${id}`);
  return response.data;
};

const findBySubmitTestIdAndTestWritingId = async (submitTestId: number, testWritingId: number) => {
  const response = await apiClient.get(`/submit-test-writing/by-submit-test/${submitTestId}/testwriting/${testWritingId}`);
  return response.data;
};

const findBySubmitTestIdAndTestWritingIds = async (submitTestId: number, testWritingIds: number[]) => {
  const response = await apiClient.post(`/submit-test-writing/by-submit-test/${submitTestId}/testwritings`, testWritingIds);
  return response.data;
};

export const submitTestWritingService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitTestIdAndTestWritingId,
  findBySubmitTestIdAndTestWritingIds,
};
