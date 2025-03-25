import { RouteNode } from "interfaces";
import apiClient from "services/apiClient";

const createRouteNode = async (routeNode: RouteNode) => {
  try {
    const response = await apiClient.post("/routeNodes", routeNode);
    return response.data;
  } catch (error) {
    console.error("Error creating route node:", error);
    throw error;
  }
};

export const routeNodeService = {
  createRouteNode,
};
