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

const deleteRouteNode = async (routeNodeId: number) => {
  try {
    const response = await apiClient.delete(`/routeNodes/${routeNodeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting route node:", error);
    throw error;
  }
};

export const routeNodeService = {
  createRouteNode,
  deleteRouteNode,
};
