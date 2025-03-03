import { AppBar, Toolbar, Typography, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../../redux/slices/themeSlice";

export default function TeacherHeader({
  drawerWidth,
  handleDrawerToggle,
  isMobile,
}: {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
        bgcolor: isDarkMode ? color.gray800 : color.gray200,
        color: isDarkMode ? color.white : color.black,
      }}
    >
      <Toolbar>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Stack direction={"row"}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Manage resources
            </Typography>
          </Stack>
          <Stack>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
