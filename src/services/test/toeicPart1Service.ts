import { ToeicPart1 } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart1 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part1/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart1 by ids:", error);
    throw error;
  }
};

const handleFile = async (data: any, idOrTemp: string, existing?: any) => {
  const result = { ...data };

  if (data.image) {
    const imageResult = await fileHandlerService.handleFileUpdate({
      base64: data.image,
      path: "toeic/part1/image",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.image,
    });
    result.image = imageResult.data;
  }

  if (data.audio) {
    const audioResult = await fileHandlerService.handleFileUpdate({
      base64: data.audio,
      path: "toeic/part1/audio",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.audio,
    });
    result.audio = audioResult.data;
  }

  return result;
};

const create = async (data: ToeicPart1) => {
  try {
    const processedData = await handleFile(data, "part1-temp");
    const response = await apiClient.post("/toeic-part1", processedData);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart1:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart1) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.put(`/toeic-part1/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart1:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart1>) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFile(data, id.toString(), existing.data);
    const response = await apiClient.patch(`/toeic-part1/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart1:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part1/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart1:", error);
    throw error;
  }
};

export const toeicPart1Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
