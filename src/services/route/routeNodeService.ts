import { RouteNode, RouteNodeEnum } from "interfaces";
import apiClient from "services/apiClient";

const create = async (data: RouteNode) => {
  try {
    const response = await apiClient.post("/routeNodes", data);
    return response.data;
  } catch (error) {
    console.error("Error creating route node:", error);
    throw error;
  }
};

const update = async (id: number, data: RouteNode) => {
  try {
    const response = await apiClient.put(`/routeNodes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating route node:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<RouteNode>) => {
  try {
    const response = await apiClient.patch(`/routeNodes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating route node:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/routeNodes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting route node:", error);
    throw error;
  }
};

const findByNodeIdAndRouteNodeType = async (
  nodeId: number,
  routeNodeType: RouteNodeEnum
) => {
  try {
    const response = await apiClient.get(
      `/routeNodes?nodeId=${nodeId}&type=${routeNodeType}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error getting route node by node id and route node type:",
      error
    );
    throw error;
  }
};

export const routeNodeService = {
  create,
  remove,
  update,
  patch,
  findByNodeIdAndRouteNodeType,
};
