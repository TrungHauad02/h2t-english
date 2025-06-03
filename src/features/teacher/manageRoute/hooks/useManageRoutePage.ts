import useAuth from "hooks/useAuth";
import { Route, RouteFilter } from "interfaces";
import { useEffect, useState } from "react";
import { routeService } from "services";

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
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const responseData = await routeService.getRoutesByTeacherId(
        page,
        itemsPerPage,
        parseInt(userId ?? ""),
        filter
      );
      const routeData: Route[] = responseData.data.content;
      setTotalPages(responseData.data.totalPages);
      setListRoutes(routeData);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemsPerPage, page]);

  const handleSearch = async () => {
    try {
      const responseData = await routeService.getRoutesByTeacherId(
        page,
        itemsPerPage,
        parseInt(userId ?? ""),
        filter
      );
      const routeData: Route[] = responseData.data.content;
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
    isLoading,
    filter,
    listRoutes,
    itemsPerPage,
    totalPages,
    page,
    setPage,
    setItemsPerPage,
    handleSearch,
    handleChangePage,
    handleLessonsPerPageChange,
    fetchData,
    updateFilter,
    setListRoutes,
  };
}
