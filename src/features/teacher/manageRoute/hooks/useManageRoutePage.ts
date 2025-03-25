import { Route } from "interfaces";
import { useEffect, useState } from "react";
import { routeService } from "../services/routeService";

export default function useManageRoutePage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [listRoutes, setListRoutes] = useState<Route[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await routeService.getRoutesByTeacherId(1);
      const routeData: Route[] = responseData.data.content;
      console.log(routeData);
      setTotalPages(responseData.data.totalPages);
      setListRoutes(routeData);
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    const filter = {
      status: statusFilter,
      title: searchText,
    };

    const responseData = await routeService.getRoutesByTeacherId(1, filter);
    const routeData: Route[] = responseData.data.content;
    console.log(routeData);
    setListRoutes(responseData.data.content);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleLessonsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  return {
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
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
