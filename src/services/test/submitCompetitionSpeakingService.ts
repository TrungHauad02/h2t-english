import { SubmitCompetitionSpeaking } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  const response = await apiClient.get(`/submit-competition-speaking/${id}`);
  return response.data;
};

const findBySubmitCompetitionIdAndQuestionId = async (submitCompetitionId: number, questionId: number) => {
  const response = await apiClient.get(
    `/submit-competition-speaking/by-submit-competition/${submitCompetitionId}/question/${questionId}`
  );
  return response.data;
};

const findBySubmitCompetitionIdAndQuestionIds = async (submitCompetitionId: number, questionIds: number[]) => {
  const response = await apiClient.post(
    `/submit-competition-speaking/by-submit-competition/${submitCompetitionId}/questions`,
    questionIds
  );
  return response.data;
};

const handleFile = async (data: any, idOrTemp: string, existing?: any) => {
  const result = { ...data };

  if (data.file) {
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.file,
      path: "submit/competition/speaking/file",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.file,
    });

    result.file = fileResult.data;
  }

  return result;
};

const create = async (data: SubmitCompetitionSpeaking) => {
  const processedData = await handleFile(data, "submit-competition-speaking-temp");
  const response = await apiClient.post("/submit-competition-speaking", processedData);
  return response.data;
};

const update = async (id: number, data: SubmitCompetitionSpeaking) => {
  const existing = await findById(id);
  const processedData = await handleFile(data, id.toString(), existing.data);
  const response = await apiClient.put(`/submit-competition-speaking/${id}`, processedData);
  return response.data;
};

const patch = async (id: number, data: Partial<SubmitCompetitionSpeaking>) => {
  const existing = await findById(id);
  const processedData = await handleFile(data, id.toString(), existing.data);
  const response = await apiClient.patch(`/submit-competition-speaking/${id}`, processedData);
  return response.data;
};

const remove = async (id: number) => {
  const response = await apiClient.delete(`/submit-competition-speaking/${id}`);
  return response.data;
};

export const submitCompetitionSpeakingService = {
  findById,
  create,
  update,
  patch,
  remove,
  findBySubmitCompetitionIdAndQuestionId,
  findBySubmitCompetitionIdAndQuestionIds,
};
