import { mockData } from "./mockData";

const getListRoute = (teacherId: number) => {
  return mockData.routes.filter((route) => route.ownerId === teacherId);
};

const getRouteById = (id: number) => {
  return mockData.routes.find((route) => route.id === id);
};

export const routeService = { getListRoute, getRouteById };
