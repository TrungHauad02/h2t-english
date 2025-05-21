import { Speaking } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/speakings?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting speakings:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/speakings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting speaking by id:", error);
    throw error;
  }
};

const create = async (data: Speaking) => {
  try {
    const imageResult = await fileHandlerService.handleFileUpdate({
      base64: data.image,
      path: "speaking",
      randomName: "YES",
      fileName: data.id.toString(),
    });

    const response = await apiClient.post("/speakings", {
      ...data,
      image: imageResult.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating speaking:", error);
    throw error;
  }
};

const update = async (id: number, data: Speaking) => {
  try {
    const existingData = await findById(id);
    const imageResult = await fileHandlerService.handleFileUpdate({
      base64: data.image,
      path: "speaking",
      randomName: "YES",
      fileName: data.id.toString(),
      oldFilePath: existingData.data.image,
    });

    data.image = imageResult.data;

    const response = await apiClient.put(`/speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating speaking:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<Speaking>) => {
  try {
    const existingData = await findById(id);

    if (data.image) {
      const imageResult = await fileHandlerService.handleFileUpdate({
        base64: data.image,
        path: "speaking",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.image,
      });
      data.image = imageResult.data;
    }

    const response = await apiClient.patch(`/speakings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating speaking:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/speakings/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying speaking:", error);
    throw error;
  }
};

const findByIdInHome = async (id: number) => {
  try {
    const response = await apiClient.get(`/home/speakings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting speaking by id:", error);
    throw error;
  }
};

export const speakingService = {
  findById,
  findByIdInHome,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
