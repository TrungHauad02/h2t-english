import { TestReading } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/test-readings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting TestReading by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/test-readings/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting TestReadings by ids:", error);
    throw error;
  }
};

const handleFile = async (data: any, idOrTemp: string, existing?: any) => {
  const result = { ...data };

  if (data.file) {
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.file,
      path: "test/reading",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.file,
    });

    result.file = fileResult.data;
  }

  return result;
};

const create = async (data: TestReading) => {
  try {
    const processedData = await handleFile(data, "test-reading-temp");
    const response = await apiClient.post("/test-readings", processedData);
    return response.data;
  } catch (error) {
    console.error("Error creating TestReading:", error);
    throw error;
  }
};

const update = async (id: number, data: TestReading) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.put(`/test-readings/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error updating TestReading:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<TestReading>) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.patch(`/test-readings/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error patching TestReading:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/test-readings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting TestReading:", error);
    throw error;
  }
};

export const testReadingService = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
