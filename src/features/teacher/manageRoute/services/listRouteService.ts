import { mockData } from "./mockData";

interface RouteFilter {
  status?: string;
  title?: string;
}

const getListRoute = (teacherId: number, filter?: RouteFilter) => {
  let filteredRoutes = mockData.routes.filter(
    (route) => route.ownerId === teacherId
  );

  if (filter?.status && filter.status !== "all") {
    const isPublished = filter.status === "published";
    filteredRoutes = filteredRoutes.filter(
      (route) => route.status === isPublished
    );
  }

  if (filter?.title) {
    filteredRoutes = filteredRoutes.filter((route) =>
      route.title.toLowerCase().includes(filter.title?.toLowerCase() || "")
    );
  }

  return filteredRoutes;
};

const getRouteById = (id: number) => {
  return mockData.routes.find((route) => route.id === id);
};

export const routeService = { getListRoute, getRouteById };
