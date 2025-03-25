import { Route } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

interface RouteFilter {
  status?: string;
  title?: string;
}

const getRoutesByTeacherId = async (
  teacherId: number,
  filter?: RouteFilter
) => {
  try {
    const response = await apiClient.get(`/routes?ownerId=${teacherId}`);
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
      status: routeData.status ? "ACTIVE" : "INACTIVE",
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
