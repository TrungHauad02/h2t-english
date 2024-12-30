import { Outlet } from "react-router-dom";
import AdminHeader from "./header/AdminHeader";
import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SidebarAdmin from "./header/common/SidebarAdmin";
import { useTheme, useMediaQuery } from "@mui/material";
import { drawerWidth } from "./header/common/sidebar/SidebarDrawer";

export default function AdminLayout() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
      }}
    >
      <SidebarAdmin />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminHeader />
        <Box
          sx={{
            flexGrow: 1,
            p: 0,
            mt: { xs: "48px", sm: "64px" },
            ml: isMobile ? 0 : 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
