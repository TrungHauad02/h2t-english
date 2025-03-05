import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Outlet } from "react-router-dom";
import useColor from "theme/useColor";
import TeacherHeader from "./header/TeacherHeader";
import TeacherSidebar from "./header/common/teacherSidebar/TeacherSidebar";
import { useState } from "react";

const drawerWidth = 200;

export default function TeacherLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TeacherHeader
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <TeacherSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          bgcolor: isDarkMode ? color.gray900 : color.gray100,
          color: isDarkMode ? color.white : color.black,
          p: 3,
          marginLeft: 0,
          width: isMobile ? `100%` : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
