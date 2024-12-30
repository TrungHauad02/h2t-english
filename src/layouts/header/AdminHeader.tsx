import {
  Toolbar,
  useScrollTrigger,
  Box,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { StyledAppBar } from "./common";
import { drawerWidth } from "./common/SidebarAdmin";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useTheme, useMediaQuery } from "@mui/material";

export default function AdminHeader() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const dispatch = useDispatch();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledAppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      color="transparent"
      sx={{
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: "48px", sm: "64px" },
          px: { xs: 1, sm: 2 },
          ml: isMobile ? 7 : 0,
        }}
      >
        <Stack direction={"row"}>
          <Box></Box>
          <Box></Box>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" sx={{ bgcolor: color.teal500 }}>
            Logout
          </Button>
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              bgcolor: isDarkMode ? color.gray800 : color.gray100,
              color: isDarkMode ? color.emerald400 : color.emerald600,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
              },
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
}
