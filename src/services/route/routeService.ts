import { Route, RouteFilter } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features/fileHandlerService";

const getRoutesForStudent = async (
  page: number,
  itemsPerPage: number,
  filter?: RouteFilter
) => {
  try {
    let url = `/routes?page=${page - 1}&size=${itemsPerPage}&status=true`;
    if (filter) {
      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
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
    console.error("Error fetching routes:", error);
    throw error;
  }
};

const getRoutesByTeacherId = async (
  page: number,
  itemsPerPage: number,
  teacherId: number,
  filter?: RouteFilter
) => {
  try {
    let url = `/routes?page=${
      page - 1
    }&size=${itemsPerPage}&ownerId=${teacherId}`;
    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${filter.status}`;
      }

      if (filter.title) {
        url += `&title=${encodeURIComponent(filter.title)}`;
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
    console.error("Error fetching routes:", error);
    throw error;
  }
};

const create = async (routeData: Route) => {
  try {
    // Use fileHandlerService to upload image
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: routeData.image,
      path: "route",
      randomName: "YES",
      fileName: routeData.id.toString(),
    });

    const response = await apiClient.post("/routes", {
      ...routeData,
      image: fileResult.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error);
    throw error;
  }
};

const findById = async (routeId: number) => {
  try {
    const response = await apiClient.get(`/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
};

const update = async (routeId: number, routeData: Route) => {
  try {
    // Get existing route to retrieve old image path
    const existingRoute = await findById(routeId);

    // Use fileHandlerService to handle image update (upload new and delete old)
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: routeData.image,
      path: "route",
      randomName: "YES",
      fileName: routeData.id.toString(),
      oldFilePath: existingRoute.data.image,
    });

    routeData.image = fileResult.data;
    const response = await apiClient.put(`/routes/${routeId}`, routeData);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

const patch = async (routeId: number, routeData: any) => {
  try {
    if (routeData.image) {
      const existingRoute = await findById(routeId);

      // Handle file update
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: routeData.image,
        path: "route",
        randomName: "YES",
        fileName: routeId.toString(),
        oldFilePath: existingRoute.data.image,
      });

      routeData.image = fileResult.data;
    }

    const response = await apiClient.patch(`/routes/${routeId}`, routeData);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

const remove = async (routeId: number) => {
  try {
    // Get existing route to retrieve image path
    const existingRoute = await findById(routeId);

    // Delete the associated image file first
    if (existingRoute.data.image) {
      await fileHandlerService.deleteFile(existingRoute.data.image);
    }

    // Then delete the route
    const response = await apiClient.delete(`/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/routes/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verify route:", error);
    throw error;
  }
};

export const routeService = {
  getRoutesByTeacherId,
  getRoutesForStudent,
  create,
  findById,
  update,
  patch,
  remove,
  verify,
};
