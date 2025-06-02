import { Grid } from "@mui/material";
import { Route, RouteFilter } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useState, useEffect } from "react";
import { routeService } from "services";
import { NotFoundRoute, RouteItem } from "./list";
import { toast } from "react-toastify";
import { renderSkeletons } from "./list/Skeletons";

interface ListRouteProps {
  searchQuery?: string;
  page: number;
  itemPerPage: number;
  setTotalPages: (totalPages: number) => void;
}

export default function ListRoute({
  searchQuery = "",
  page = 10,
  itemPerPage = 8,
  setTotalPages,
}: ListRouteProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [listRoutes, setListRoutes] = useState<Route[]>([]);
  const [filter, setFilter] = useState<RouteFilter>({
    status: true,
    title: "",
    sortBy: "-createdAt",
  });

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      setLoading(true);
      const resData = await routeService.getRoutesForStudent(
        page,
        itemPerPage,
        filter
      );
      setListRoutes(resData.data.content);
      setTotalPages(resData.data.totalPages);
      setLoading(false);
      try {
      } catch (error) {
        toast.error("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, page, itemPerPage]);

  useEffect(() => {
    if (searchQuery) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        title: searchQuery,
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        title: "",
      }));
    }
  }, [searchQuery]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        renderSkeletons(isDarkMode, color)
      ) : listRoutes.length > 0 ? (
        listRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={route.id}>
            <RouteItem route={route} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <NotFoundRoute />
        </Grid>
      )}
    </Grid>
  );
}
