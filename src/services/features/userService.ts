import { User, UserFilter } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findAll = async (
  page: number,
  itemsPerPage: number,
  filter?: UserFilter
) => {
  try {
    let url = `/users?page=${page - 1}&size=${itemsPerPage}`;

    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }
      if (filter.name) {
        url += `&name=${encodeURIComponent(filter.name)}`;
      }
      if (filter.email) {
        url += `&email=${encodeURIComponent(filter.email)}`;
      }
      if (filter.level) {
        url += `&level=${filter.level}`;
      }
      if (filter.roleList && filter.roleList.length > 0) {
        filter.roleList.forEach((role) => {
          url += `&roleList=${role}`;
        });
      }
      if (filter.sortBy) {
        url += `&sortFields=${encodeURIComponent(filter.sortBy)}`;
      }
      if (filter.startCreatedAt) {
        url += `&startCreatedAt=${filter.startCreatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.endCreatedAt) {
        url += `&endCreatedAt=${filter.endCreatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.startUpdatedAt) {
        url += `&startUpdatedAt=${filter.startUpdatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
      if (filter.endUpdatedAt) {
        url += `&endUpdatedAt=${filter.endUpdatedAt
          .toISOString()
          .slice(0, -1)}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

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
  findAll,
  findById,
  create,
  update,
  patch,
  remove,
};
