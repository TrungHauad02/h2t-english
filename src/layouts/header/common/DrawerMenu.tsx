import { Box, Drawer, List, Divider } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ListItemWithToggle } from "components/list";
import AuthMenuSection from "./drawer/AuthMenuSection";
import ThemeMenuSection from "./drawer/ThemeMenuSection";

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
            />
          ))}
          <Divider />
          <AuthMenuSection handleNavigate={handleNavigate} />
          <Divider />
          <ThemeMenuSection />
        </List>
      </Box>
    </Drawer>
  );
}
