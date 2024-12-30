import React from "react";
import { Drawer, Divider, Box, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const drawerWidth = 220;

export default function SidebarDrawer({
  mobileOpen,
  handleDrawerToggle,
  menuItems,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  menuItems: any[];
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SidebarHeader />
        <Divider />
        <Box sx={{ overflow: "auto", px: 2, py: 2 }}>
          <SidebarList items={menuItems} onClose={handleDrawerToggle} />
        </Box>
      </Drawer>
    </>
  );
}
