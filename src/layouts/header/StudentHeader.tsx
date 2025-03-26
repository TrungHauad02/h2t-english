import { Toolbar, useScrollTrigger, Container, Stack } from "@mui/material";
import { useState } from "react";
import { Actions, DrawerMenu, Logo, MenuItems } from "./common";
import { StyledAppBar } from "./common";

const MENU_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/routes", label: "Route" },
  {
    path: "/lesson",
    label: "Lesson",
    children: [
      { path: "/topics", label: "Vocabulary" },
      { path: "/grammars", label: "Grammar" },
      { path: "/readings", label: "Reading" },
      { path: "/speakings", label: "Speaking" },
      { path: "/listenings", label: "Listening" },
      { path: "/writings", label: "Writing" },
    ],
  },
  {
    path: "/test",
    label: "Test",
    children: [
      { path: "/mixings", label: "Mixing" },
      { path: "/readings", label: "Reading" },
      { path: "/speakings", label: "Speaking" },
      { path: "/listenings", label: "Listening" },
      { path: "/writings", label: "Writing" },
    ],
  },
  {
    path: "/competition-test",
    label: "Competition",
  },
  {
    path: "/toeic",
    label: "Toeic",
  },
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
