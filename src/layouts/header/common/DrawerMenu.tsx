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
import { useState } from "react";
import { ListItemWithToggle } from "components/list";

interface DrawerMenuProps {
  drawerOpen: boolean;
  handleDrawerToggle: () => void;
  MENU_ITEMS: {
    path: string;
    label: string;
    children?: {
      path: string;
      label: string;
    }[];
  }[];
}

export default function DrawerMenu({
  drawerOpen,
  handleDrawerToggle,
  MENU_ITEMS,
}: DrawerMenuProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (label: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleDrawerToggle();
  };

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
          {MENU_ITEMS.map((item) => (
            <ListItemWithToggle
              key={item.path}
              path={item.path}
              label={item.label}
              children={item.children}
              open={openItems[item.label] || false}
              onToggle={() => handleToggle(item.label)}
              onNavigate={handleNavigate}
              isDarkMode={isDarkMode}
              color={color}
            />
          ))}
          <Divider />
          <ListItemButton
            onClick={() => handleNavigate("/login")}
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
            onClick={() => handleNavigate("/register")}
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
