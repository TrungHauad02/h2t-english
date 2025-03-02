import { mockData } from "./mockData";

const getListRoute = () => {
  return mockData.routes;
};

const getRouteById = (id: number) => {
  return mockData.routes.find((route) => route.id === id);
};

export const routeService = { getListRoute, getRouteById };
