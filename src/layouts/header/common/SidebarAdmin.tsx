import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export const drawerWidth = 220;

export default function SidebarAdmin() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      path: "/admin/dashboard",
    },
    {
      text: "User Management",
      icon: <PeopleIcon fontSize="small" />,
      children: [
        {
          text: "Students",
          path: "/admin/manage-student",
          icon: <SchoolIcon fontSize="small" />,
        },
        {
          text: "Teachers",
          path: "/admin/manage-teacher",
          icon: <PeopleIcon fontSize="small" />,
        },
      ],
    },
    {
      text: "Settings",
      icon: <SettingsIcon fontSize="small" />,
      path: "/admin/settings",
    },
    {
      text: "Logout",
      icon: <LogoutIcon fontSize="small" />,
      path: "/logout",
    },
  ];

  const handleExpand = (item: string) => {
    setExpanded(expanded === item ? null : item);
  };

  const isActive = (path: string) => location.pathname === path;

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: isDarkMode ? colors.teal400 : colors.teal600,
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: isMobile ? "right" : "left",
            width: "100%",
          }}
        >
          H2T Admin
        </Typography>
      </Toolbar>
      <Divider
        sx={{ borderColor: isDarkMode ? colors.gray700 : colors.gray200 }}
      />
      <Box sx={{ overflow: "auto", px: 0, py: 2 }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem
                component={item.path ? Link : "div"}
                to={item.path || ""}
                onClick={() => {
                  item.children && handleExpand(item.text);
                  isMobile && item.path && handleDrawerToggle();
                }}
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  backgroundColor: isActive(item.path || "")
                    ? isDarkMode
                      ? colors.teal900
                      : colors.teal50
                    : "transparent",
                  color: isActive(item.path || "")
                    ? isDarkMode
                      ? colors.teal300
                      : colors.teal700
                    : "inherit",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? colors.teal900
                      : colors.teal50,
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path || "")
                      ? isDarkMode
                        ? colors.teal300
                        : colors.teal700
                      : isDarkMode
                      ? colors.gray400
                      : colors.gray600,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: isActive(item.path || "") ? 600 : 400,
                  }}
                />
                {item.children && (
                  <Box
                    sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
                  >
                    {expanded === item.text ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                )}
              </ListItem>
              {item.children && (
                <Collapse
                  in={expanded === item.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List
                    component="div"
                    sx={{
                      pl: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    {item.children.map((child) => (
                      <ListItem
                        key={child.text}
                        component={Link}
                        to={child.path}
                        onClick={isMobile ? handleDrawerToggle : undefined}
                        sx={{
                          borderRadius: "8px",
                          py: 0.75,
                          backgroundColor: isActive(child.path)
                            ? isDarkMode
                              ? colors.teal900
                              : colors.teal50
                            : "transparent",
                          color: isActive(child.path)
                            ? isDarkMode
                              ? colors.teal300
                              : colors.teal700
                            : "inherit",
                          "&:hover": {
                            backgroundColor: isDarkMode
                              ? colors.teal900
                              : colors.teal50,
                            color: isDarkMode ? colors.teal300 : colors.teal700,
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 35,
                            color: isActive(child.path)
                              ? isDarkMode
                                ? colors.teal300
                                : colors.teal700
                              : isDarkMode
                              ? colors.gray400
                              : colors.gray600,
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.text}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                            fontWeight: isActive(child.path) ? 600 : 400,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            left: 16,
            top: 6,
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: isDarkMode ? colors.gray800 : colors.white,
            color: isDarkMode ? colors.white : colors.gray800,
            borderRight: `1px solid ${
              isDarkMode ? colors.gray700 : colors.gray200
            }`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
