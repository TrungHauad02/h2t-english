import { SubmitTestSpeaking } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  const response = await apiClient.get(`/submit-test-speaking/${id}`);
  return response.data;
};

const findBySubmitTestIdAndQuestionId = async (submitTestId: number, questionId: number) => {
  const response = await apiClient.get(`/submit-test-speaking/by-submit-test/${submitTestId}/question/${questionId}`);
  return response.data;
};

const findBySubmitTestIdAndQuestionIds = async (submitTestId: number, questionIds: number[]) => {
  const response = await apiClient.post(`/submit-test-speaking/by-submit-test/${submitTestId}/questions`, questionIds);
  return response.data;
};

const handleFile = async (data: any, idOrTemp: string, existing?: any) => {
  const result = { ...data };

  if (data.file) {
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.file,
      path: "submit/test/speaking/file",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.file,
    });

    result.file = fileResult.data;
  }

  return result;
};

const create = async (data: SubmitTestSpeaking) => {
  const processedData = await handleFile(data, "submit-test-speaking-temp");
  const response = await apiClient.post("/submit-test-speaking", processedData);
  return response.data;
};

const update = async (id: number, data: SubmitTestSpeaking) => {
  const existing = await findById(id);
  const processedData = await handleFile(data, id.toString(), existing.data);
  const response = await apiClient.put(`/submit-test-speaking/${id}`, processedData);
  return response.data;
};

const patch = async (id: number, data: Partial<SubmitTestSpeaking>) => {
  const existing = await findById(id);
  const processedData = await handleFile(data, id.toString(), existing.data);
  const response = await apiClient.patch(`/submit-test-speaking/${id}`, processedData);
  return response.data;
};

const remove = async (id: number): Promise<any> => {
  const response = await apiClient.delete(`/submit-test-speaking/${id}`);
  return response.data;
};

export const submitTestSpeakingService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitTestIdAndQuestionId,
  findBySubmitTestIdAndQuestionIds,
};
