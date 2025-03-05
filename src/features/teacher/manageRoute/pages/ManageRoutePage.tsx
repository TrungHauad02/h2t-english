import { Search } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { WEButton, WESelect, WETexField } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import { useEffect, useState } from "react";
import useColor from "theme/useColor";
import { routeService } from "../services/listRouteService";
import ListRoutes from "../components/ListRoutes";

export default function ManageRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [listRoutes, setListRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const routes = routeService.getListRoute(1);
    setListRoutes(routes);
  }, []);

  const handleSearch = () => {
    const filter = {
      status: statusFilter,
      title: searchText,
    };

    const filteredRoutes = routeService.getListRoute(1, filter);
    setListRoutes(filteredRoutes);
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction={"column"}>
        {/* Header */}
        <Stack direction={"row"} justifyContent={"space-between"}>
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
        <ListRoutes list={listRoutes} />
      </Stack>
    </Box>
  );
}
