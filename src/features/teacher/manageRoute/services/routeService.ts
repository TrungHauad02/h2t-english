import { Route, RouteFilter } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

const getRoutesByTeacherId = async (
  teacherId: number,
  filter?: RouteFilter
) => {
  try {
    let url = `/routes?ownerId=${teacherId}`;
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
      image: base64ToBlobUrl(routeData.image),
    };
    console.log(data);
    const response = await apiClient.post("/routes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error);
    throw error;
  }
};

export const routeService = { getRoutesByTeacherId, createRoute };
