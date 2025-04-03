import { Route, RouteFilter } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

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
    console.log(url);
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

    console.log(url);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};

const createRoute = async (routeData: Route) => {
  try {
    const data = {
      ...routeData,
      image: base64ToBlobUrl(routeData.image, "image/png"),
    };
    console.log(data);
    const response = await apiClient.post("/routes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error);
    throw error;
  }
};

const getRouteById = async (routeId: number) => {
  try {
    const response = await apiClient.get(`/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
};

const updateRoute = async (routeId: number, routeData: Route) => {
  try {
    routeData.image = base64ToBlobUrl(routeData.image, "image/png");
    const response = await apiClient.put(`/routes/${routeId}`, routeData);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

const patchRoute = async (routeId: number, routeData: any) => {
  try {
    if (routeData.image) {
      routeData.image = base64ToBlobUrl(routeData.image, "image/png");
    }
    const response = await apiClient.patch(`/routes/${routeId}`, routeData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    throw error;
  }
};

const deleteRoute = async (routeId: number) => {
  try {
    const response = await apiClient.delete(`/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting route:", error);
    throw error;
  }
};

export const routeService = {
  getRoutesByTeacherId,
  createRoute,
  getRouteById,
  updateRoute,
  patchRoute,
  deleteRoute,
};
