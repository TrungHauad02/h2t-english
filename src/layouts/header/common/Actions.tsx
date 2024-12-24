import { IconButton, Box, Button } from "@mui/material";
import { Sun, Moon, Menu } from "lucide-react";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface ActionsProps {
  handleDrawerToggle: () => void;
}

export default function Actions({ handleDrawerToggle }: ActionsProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
        <Button
          color="inherit"
          onClick={() => navigate("/login")}
          sx={{ color: isDarkMode ? color.white : color.black }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            color: isDarkMode ? color.black : color.white,
            bgcolor: color.emerald500,
            "&:hover": { bgcolor: color.emerald600 },
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>

      <IconButton
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={handleDrawerToggle}
      >
        <Menu size={20} />
      </IconButton>

      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          display: { xs: "none", sm: "flex" },
          bgcolor: isDarkMode ? color.gray800 : color.gray100,
          color: isDarkMode ? color.emerald400 : color.emerald600,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray700 : color.gray200,
          },
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
    </Box>
  );
}
