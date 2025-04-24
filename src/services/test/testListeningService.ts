import { TestListening } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-listening/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/test-listening/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by ids:", error);
    throw error;
  }
};

const handleFile = async (data: any, idOrTemp: string, existing?: any) => {
  const result = { ...data };

  if (data.audio) {
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.audio,
      path: "test/listening/audio",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.audio,
    });

    result.audio = fileResult.data;
  }

  return result;
};

const create = async (data: TestListening) => {
  try {
    const processedData = await handleFile(data, "test-listening-temp");
    const response = await apiClient.post("/test-listening", processedData);
    return response.data;
  } catch (error) {
    console.error("Error creating TestListening:", error);
    throw error;
  }
};

const update = async (id: number, data: TestListening) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.put(`/test-listening/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error updating TestListening:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestListening>) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.patch(`/test-listening/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error patching TestListening:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-listening/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestListening:", error);
    throw error;
  }
};

export const testListeningService = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
