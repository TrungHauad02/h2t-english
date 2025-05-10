import { TestListening } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by id:", error);
    throw error;
  }
};

const getByIdsAndStatus = async (ids: number[], status?: Boolean) => {
  try {
    const response = await apiClient.post("/test-listenings/by-ids", ids, {
      params: status ? { status } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting TestListening by ids and status:", error);
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
    const processedData = await handleFile(data, "test-listenings-temp");
    const response = await apiClient.post("/test-listenings", processedData);
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
    const response = await apiClient.put(`/test-listenings/${id}`, processedData);
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
    const response = await apiClient.patch(`/test-listenings/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error patching TestListening:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestListening:", error);
    throw error;
  }
};
const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-listenings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying question:", error);
    throw error;
  }
};


export const testListeningService = {
  findById,
  getByIdsAndStatus,
  create,
  update,
  patch,
  remove,
  verify,
};
