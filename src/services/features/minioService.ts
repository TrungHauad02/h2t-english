import { RandomName } from "interfaces";
import apiClient from "services/apiClient";

const uploadFile = async (
  base64: string,
  path: string,
  randomName: RandomName = "NO",
  fileName: string
) => {
  try {
    const response = await apiClient.post("/minio", {
      base64,
      path,
      randomName,
      fileName,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const deleteFile = async (objectName: string) => {
  try {
    const response = await apiClient.delete(`/minio?objectName=${objectName}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const minioService = {
  uploadFile,
  deleteFile,
};
