import {
  Box,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";

export default function TeacherSidebar({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const sidebarItems = [
    { label: "Manage Routes", path: "/teacher/routes" },
    { label: "Information", path: "/teacher/information" },
    { label: "Logout", path: "/logout" },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        height: "100vh",
      }}
      aria-label="sidebar"
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: isDarkMode ? color.gray900 : color.gray100,
            color: isDarkMode ? color.white : color.black,
            borderRight: isDarkMode
              ? `1px solid ${color.gray800}`
              : `1px solid ${color.gray200}`,
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: isDarkMode
              ? `1px solid ${color.gray800}`
              : `1px solid ${color.gray200}`,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            H2T English
          </Typography>
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: isDarkMode ? color.white : color.black }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Sidebar Content */}
        <Box sx={{ overflow: "auto", p: 2 }}>
          <Stack direction="column" spacing={1}>
            {sidebarItems.map((item, index) => (
              <Box key={index}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isDarkMode ? color.white : color.black,
                    backgroundColor: isActive
                      ? isDarkMode
                        ? color.teal800
                        : color.teal400
                      : "transparent",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    display: "block",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.teal700
                        : color.teal100,
                    },
                  })}
                >
                  <Typography variant="body2" noWrap component="div">
                    {item.label}
                  </Typography>
                </NavLink>
                {index < sidebarItems.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: isDarkMode ? color.gray800 : color.gray200,
                      my: 1,
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
