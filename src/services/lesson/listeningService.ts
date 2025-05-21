import { Listening } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/listenings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting listenings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting listening by id:", error);
    throw error;
  }
};

const create = async (data: Listening) => {
  try {
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "listening",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.audio,
        path: "listening",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
    ]);

    const response = await apiClient.post("/listenings", {
      ...data,
      image: fileResult[0].data,
      audio: fileResult[1].data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating listening:", error);
    throw error;
  }
};

const update = async (id: number, data: Listening) => {
  try {
    const existingData = await findById(id);
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "listening",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.image,
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.audio,
        path: "listening",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.audio,
      }),
    ]);

    data.image = fileResult[0].data;
    data.audio = fileResult[1].data;

    const response = await apiClient.put(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating listening:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Listening>) => {
  try {
    const existingData = await findById(id);

    if (data.image) {
      const imageResult = await fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "listening",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.image,
      });
      data.image = imageResult.data;
    }

    if (data.audio) {
      const audioResult = await fileHandlerService.handleFileUpdate({
        base64: data.audio,
        path: "listening",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.audio,
      });
      data.audio = audioResult.data;
    }

    const response = await apiClient.patch(`/listenings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching listening:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/listenings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying listening:", error);
    throw error;
  }
};

const findByIdInHome = async (id: number) => {
  try {
    const response = await apiClient.get(`/home/listenings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting listening by id:", error);
    throw error;
  }
};

export const listeningService = {
  findById,
  findByIdInHome,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
