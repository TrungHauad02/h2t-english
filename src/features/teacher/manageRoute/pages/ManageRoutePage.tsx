import { Search } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { WEButton, WETexField } from "components/input";
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
  const [listRoutes, setListRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const routes = routeService.getListRoute(1);
    setListRoutes(routes);
  }, []);

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
            <WEButton
              variant="contained"
              sx={{ width: "40px", height: "40px" }}
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
