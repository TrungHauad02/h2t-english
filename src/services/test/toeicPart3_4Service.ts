import { ToeicPart3_4 } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part3-4/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart3_4 by id:", error);
    throw error;
  }
};

const getByIds = async (ids: number[]) => {
  try {
    const response = await apiClient.post("/toeic-part3-4/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart3_4 by ids:", error);
    throw error;
  }
};

const handleFileFields = async (
  data: any,
  idOrTemp: string,
  existing?: any
) => {
  const result = { ...data };

  if (data.image) {
    const imageResult = await fileHandlerService.handleFileUpdate({
      base64: data.image,
      path: "toeic/part3_4/image",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.image,
    });
    result.image = imageResult.data;
  }

  if (data.audio) {
    const audioResult = await fileHandlerService.handleFileUpdate({
      base64: data.audio,
      path: "toeic/part3_4/audio",
      fileName: idOrTemp,
      randomName: "YES",
      oldFilePath: existing?.audio,
    });
    result.audio = audioResult.data;
  }

  return result;
};

const create = async (data: ToeicPart3_4) => {
  try {
    const processedData = await handleFileFields(data, "part3_4-temp");
    const response = await apiClient.post("/toeic-part3-4", processedData);
    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart3_4:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart3_4) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFileFields(data, id.toString(), existing.data);
    const response = await apiClient.put(`/toeic-part3-4/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart3_4:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart3_4>) => {
  try {
    const existing = await findById(id);
    const processedData = await handleFileFields(data, id.toString(), existing.data);
    const response = await apiClient.patch(`/toeic-part3-4/${id}`, processedData);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart3_4:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part3-4/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart3_4:", error);
    throw error;
  }
};

export const toeicPart3_4Service = {
  findById,
  getByIds,
  create,
  update,
  patch,
  remove,
};
