import { ToeicPart6 } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/toeic-part6/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting ToeicPart6 by id:", error);
    throw error;
  }
};


const getByIdsAndStatus = async (ids: number[], status?: Boolean) => {
  try {
    const response = await apiClient.post("/toeic-part6/by-ids", ids, {
      params: status ? { status } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting toeic-part6 by ids and status:", error);
    throw error;
  }
};
const create = async (data: ToeicPart6) => {
  try {
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.file,
      path: "toeic/part6",
      fileName: data.id?.toString() || "part6-temp",
      randomName: "YES",
    });

    const response = await apiClient.post("/toeic-part6", {
      ...data,
      file: fileResult.data,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating ToeicPart6:", error);
    throw error;
  }
};

const update = async (id: number, data: ToeicPart6) => {
  try {
    const existing = await findById(id);

    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: data.file,
      path: "toeic/part6",
      fileName: id.toString(),
      randomName: "YES",
      oldFilePath: existing.data.file,
    });

    data.file = fileResult.data;

    const response = await apiClient.put(`/toeic-part6/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating ToeicPart6:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ToeicPart6>) => {
  try {
    const existing = await findById(id);

    if (data.file) {
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "toeic/part6",
        fileName: id.toString(),
        randomName: "YES",
        oldFilePath: existing.data.file,
      });

      data.file = fileResult.data;
    }

    const response = await apiClient.patch(`/toeic-part6/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching ToeicPart6:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/toeic-part6/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ToeicPart6:", error);
    throw error;
  }
};

export const toeicPart6Service = {
  findById,
  getByIdsAndStatus,
  create,
  update,
  patch,
  remove,
};
