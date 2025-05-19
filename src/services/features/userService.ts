import { User, UserFilter } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";
import { formatLocalDateForFilter } from "utils/format";

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
        const formattedStartDate = formatLocalDateForFilter(
          filter.startCreatedAt,
          false
        );
        url += `&startCreatedAt=${formattedStartDate}`;
      }

      if (filter.endCreatedAt) {
        const formattedEndDate = formatLocalDateForFilter(
          filter.endCreatedAt,
          true
        );
        url += `&endCreatedAt=${formattedEndDate}`;
      }

      if (filter.startUpdatedAt) {
        const formattedStartUpdateDate = formatLocalDateForFilter(
          filter.startUpdatedAt,
          false
        );
        url += `&startUpdatedAt=${formattedStartUpdateDate}`;
      }

      if (filter.endUpdatedAt) {
        const formattedEndUpdateDate = formatLocalDateForFilter(
          filter.endUpdatedAt,
          true
        );
        url += `&endUpdatedAt=${formattedEndUpdateDate}`;
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
const findByIdsAndStatus = async (ids: number[], status: boolean) => {
  try {
    const params = new URLSearchParams();
    ids.forEach((id) => params.append("ids", id.toString()));
    params.append("status", status.toString());

    const response = await apiClient.post(
      `/users/by-ids-and-status?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching users by ids and status:", error);
    throw error;
  }
};

const completeRouteNode = async (userId: number, routeNodeId: number) => {
  try {
    const response = await apiClient.get(
      `/users/${userId}/complete-route-node/${routeNodeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error completing route node:", error);
    throw error;
  }
};

const getProcessByRouteId = async (userId: number, routeId: number) => {
  try {
    const response = await apiClient.get(
      `/users/${userId}/process-by-route-id/${routeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting process by route id:", error);
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
  findByIdsAndStatus,
  completeRouteNode,
  getProcessByRouteId,
};
