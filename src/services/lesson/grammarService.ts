import { Grammar } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/grammars?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting grammars:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/grammars/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting grammar by id:", error);
    throw error;
  }
};

const create = async (data: Grammar) => {
  try {
    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "grammar",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "grammar",
        randomName: "YES",
        fileName: data.id.toString(),
      }),
    ]);

    const response = await apiClient.post("/grammars", {
      ...data,
      image: fileResult[0].data,
      file: fileResult[1].data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating grammar:", error);
    throw error;
  }
};

const update = async (id: number, data: Grammar) => {
  try {
    const existingData = await findById(id);

    const fileResult = await Promise.all([
      fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "grammar",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.file,
      }),
      fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "grammar",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.file,
      }),
    ]);
    data.image = fileResult[0].data;
    data.file = fileResult[1].data;

    const response = await apiClient.put(`/grammars/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating grammar:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Grammar>) => {
  try {
    const existingData = await findById(id);

    if (data.image) {
      const imageResult = await fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "grammar",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.image,
      });
      data.image = imageResult.data;
    }

    if (data.file) {
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: data.file,
        path: "grammar",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.file,
      });
      data.file = fileResult.data;
    }

    const response = await apiClient.patch(`/grammars/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating grammar:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/grammars/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying grammar:", error);
    throw error;
  }
};

export const grammarService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
