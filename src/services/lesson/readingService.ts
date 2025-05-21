import { Reading } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/readings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting readings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/readings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting reading by id:", error);
    throw error;
  }
};

const create = async (data: Reading) => {
  try {
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "reading",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "reading",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
    ]);

    const response = await apiClient.post("/readings", {
      ...data,
      image: fileResult[0].data,
      file: fileResult[1].data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating reading:", error);
    throw error;
  }
};

const update = async (id: number, data: Reading) => {
  try {
    const existingData = await findById(id);
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "reading",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.image,
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "reading",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.file,
      }),
    ]);

    data.image = fileResult[0].data;
    data.file = fileResult[1].data;

    const response = await apiClient.put(`/readings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating reading:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Reading>) => {
  try {
    const existingData = await findById(id);

    if (data.image) {
      const imageResult = await fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "reading",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.image,
      });
      data.image = imageResult.data;
    }

    if (data.file) {
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "reading",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.file,
      });
      data.file = fileResult.data;
    }

    const response = await apiClient.patch(`/readings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating reading:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/readings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying reading:", error);
    throw error;
  }
};

const findByIdInHome = async (id: number) => {
  try {
    const response = await apiClient.get(`/home/readings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting reading by id:", error);
    throw error;
  }
};

export const readingService = {
  findById,
  findByIdInHome,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
