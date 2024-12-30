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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export const drawerWidth = 170;

export default function SidebarAdmin() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const menuItems = [
    {
      text: "Manage User",
      icon: <DashboardIcon fontSize="small" />,
      children: [
        { text: "Student", path: "/admin/manage-student" },
        { text: "Teacher", path: "/admin/manage-teacher" },
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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#121212" : "#ffffff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#ffffff" : "#121212",
          fontSize: "0.875rem",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" fontSize="1rem">
          Admin Panel
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem
                component={item.path ? Link : "div"}
                to={item.path || ""}
                onClick={() => item.children && handleExpand(item.text)}
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                  },
                  py: 0.5,
                  px: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "#ffffff" : "#121212",
                    minWidth: "32px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                  }}
                />
                {item.children &&
                  (expanded === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.children && (
                <Collapse
                  in={expanded === item.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.text}
                        component={Link}
                        to={child.path}
                        sx={{
                          pl: 4,
                          py: 0.5,
                          "&:hover": {
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        <ListItemText
                          primary={child.text}
                          primaryTypographyProps={{
                            fontSize: "0.8rem",
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
    </Drawer>
  );
}
