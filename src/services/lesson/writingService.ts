import { Writing } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/writings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting writings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/writings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting writing by id:", error);
    throw error;
  }
};

const create = async (data: Writing) => {
  try {
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "writing",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "writing",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
    ]);

    const response = await apiClient.post("/writings", {
      ...data,
      image: fileResult[0].data,
      file: fileResult[1].data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating writing:", error);
    throw error;
  }
};

const update = async (id: number, data: Writing) => {
  try {
    const existingData = await findById(id);
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "writing",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.image,
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "writing",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.file,
      }),
    ]);

    data.image = fileResult[0].data;
    data.file = fileResult[1].data;

    const response = await apiClient.put(`/writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Writing>) => {
  try {
    const existingData = await findById(id);

    if (data.image) {
      const imageResult = await fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "writing",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.image,
      });
      data.image = imageResult.data;
    }

    if (data.file) {
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "writing",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.file,
      });
      data.file = fileResult.data;
    }

    const response = await apiClient.patch(`/writings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating writing:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/writings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying writing:", error);
    throw error;
  }
};

export const writingService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
