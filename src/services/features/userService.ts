import { User } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;
  }
};

const create = async (data: User) => {
  try {
    if (data.avatar) {
      const avatarResult = await fileHandlerService.handleFileUpdate({
        base64: data.avatar,
        path: "user",
        randomName: "YES",
        fileName: data.id.toString(),
      });
      data.avatar = avatarResult.data;
    }

    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const update = async (id: number, data: User) => {
  try {
    const existingData = await findById(id);

    if (data.avatar) {
      const avatarResult = await fileHandlerService.handleFileUpdate({
        base64: data.avatar,
        path: "user",
        randomName: "YES",
        fileName: data.id.toString(),
        oldFilePath: existingData.data.avatar,
      });
      data.avatar = avatarResult.data;
    }

    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<User>) => {
  try {
    if (data.avatar) {
      const existingData = await findById(id);

      const avatarResult = await fileHandlerService.handleFileUpdate({
        base64: data.avatar,
        path: "user",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.avatar,
      });
      data.avatar = avatarResult.data;
    }

    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const userService = {
  findById,
  create,
  update,
  patch,
  remove,
};
