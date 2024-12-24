import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Container,
  Stack,
  AppBarProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Actions, DrawerMenu, Logo, MenuItems } from "./common";

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  transition: "all 0.3s",
  backgroundColor: theme.palette.mode === "dark" ? "#03071295" : "#ffffff95",
  backdropFilter: "blur(8px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 2px 1px #ffffff10"
      : "0px 2px 1px #00000020",
}));

const MENU_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/lesson", label: "Lesson" },
  { path: "/test", label: "Test" },
];

export default function StudentHeader() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <StyledAppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      color="transparent"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction={"row"} spacing={2}>
            <Logo />
            <MenuItems items={MENU_ITEMS} />
          </Stack>
          <Actions handleDrawerToggle={handleDrawerToggle} />
        </Toolbar>
      </Container>
      <DrawerMenu
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        MENU_ITEMS={MENU_ITEMS}
      />
    </StyledAppBar>
  );
}
