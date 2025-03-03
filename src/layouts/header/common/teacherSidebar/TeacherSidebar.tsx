import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

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

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
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
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
            Sidebar
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
}
