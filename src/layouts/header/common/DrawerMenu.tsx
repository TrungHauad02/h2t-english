import {
  Typography,
  Box,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  Stack,
} from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function DrawerMenu({
  drawerOpen,
  handleDrawerToggle,
  MENU_ITEMS,
}: any) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: isDarkMode ? color.gray950 : color.gray50,
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {MENU_ITEMS.map((item: any) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: isDarkMode ? color.white : color.black,
                "&:hover": {
                  bgcolor: isDarkMode ? color.gray700 : color.gray200,
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <Divider />
          <ListItemButton
            onClick={() => navigate("/login")}
            sx={{
              color: isDarkMode ? color.white : color.black,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
              },
            }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/register")}
            sx={{
              color: isDarkMode ? color.white : color.black,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
              },
            }}
          >
            <ListItemText primary="Register" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: isDarkMode ? color.emerald400 : color.emerald600,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
              },
            }}
          >
            <ListItemText
              primary={
                isDarkMode ? (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ color: color.white }}>
                      Light mode{" "}
                    </Typography>
                    <Sun size={20} />
                  </Stack>
                ) : (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ color: color.black }}>
                      Dark mode{" "}
                    </Typography>
                    <Moon size={20} />
                  </Stack>
                )
              }
            />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
