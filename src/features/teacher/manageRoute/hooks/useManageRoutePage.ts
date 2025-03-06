import { Route } from "interfaces";
import { useEffect, useState } from "react";
import { routeService } from "../services/listRouteService";

export default function useManageRoutePage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [listRoutes, setListRoutes] = useState<Route[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const filteredRoutes = routeService.getListRoute(1);
    setListRoutes(filteredRoutes);
  }, []);

  const handleSearch = () => {
    const filter = {
      status: statusFilter,
      title: searchText,
    };

    const filteredRoutes = routeService.getListRoute(1, filter);
    setListRoutes(filteredRoutes);
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleLessonsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const totalPages = Math.ceil(listRoutes.length / itemsPerPage);

  const displayedRoutes = listRoutes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
    displayedRoutes,
  };
}
