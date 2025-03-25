import { Route, RouteFilter } from "interfaces";
import { useEffect, useState } from "react";
import { routeService } from "../services/routeService";

export default function useManageRoutePage() {
  const [filter, setFilter] = useState<RouteFilter>({
    status: null,
    title: "",
    sortBy: "-createdAt",
  });

  const [listRoutes, setListRoutes] = useState<Route[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await routeService.getRoutesByTeacherId(1, filter);
        const routeData: Route[] = responseData.data.content;
        setTotalPages(responseData.data.totalPages);
        setListRoutes(routeData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const responseData = await routeService.getRoutesByTeacherId(1, filter);
      const routeData: Route[] = responseData.data.content;
      console.log(routeData);
      setListRoutes(responseData.data.content);
    } catch (error) {
      console.error("Error searching routes:", error);
    }
  };

  const updateFilter = (updates: Partial<RouteFilter>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...updates,
    }));
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleLessonsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  return {
    filter,
    updateFilter,
    listRoutes,
    setListRoutes,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    handleSearch,
    handleChangePage,
    handleLessonsPerPageChange,
    totalPages,
  };
}
