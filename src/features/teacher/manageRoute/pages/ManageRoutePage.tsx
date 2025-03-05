import { Search } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { WEButton, WESelect, WETexField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import { useEffect, useState } from "react";
import useColor from "theme/useColor";
import { routeService } from "../services/listRouteService";
import ListRoutes from "../components/ListRoutes";
import { WEPaginationSelect } from "components/pagination";

export default function ManageRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

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

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction={"column"} sx={{ minHeight: "88vh" }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent={"space-between"}
          spacing={2}
        >
          {/* Search bar */}
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <WETexField
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: { xs: "0.75rem", sm: "1rem" },
                  width: "100%",
                  paddingLeft: "0.2rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${color.gray400}`,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `2px solid ${
                      isDarkMode ? color.emerald400 : color.emerald500
                    }`,
                  },
                  fontSize: "1rem",
                  margin: 0,
                },
              }}
            />
            <WESelect
              label="Filter"
              onChange={(value) => setStatusFilter(value as string)}
              options={[
                { label: "All", value: "all" },
                { label: "Published", value: "published" },
                { label: "Unpublished", value: "unpublished" },
              ]}
              value={statusFilter}
            />
            <WEButton
              variant="contained"
              sx={{ width: "40px", height: "40px" }}
              onClick={handleSearch}
            >
              <Search />
            </WEButton>
          </Stack>
          {/* Actions */}
          <Stack direction={"row"} alignItems={"center"}>
            <WEButton variant="contained">Create Route</WEButton>
          </Stack>
        </Stack>
        {/* List Routes */}
        <ListRoutes list={displayedRoutes} />
        {/* Pagination */}
        <Box sx={{ mt: "auto" }}>
          <WEPaginationSelect
            page={page}
            totalPage={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handleChangePage}
            onItemsPerPageChange={handleLessonsPerPageChange}
          />
        </Box>
      </Stack>
    </Box>
  );
}
