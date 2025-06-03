import {
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import {
  Sun,
  Moon,
  Menu as MenuIcon,
  User,
  History,
  LogOut,
} from "lucide-react";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { userService } from "services";
import { useEffect, useState } from "react";

interface ActionsProps {
  handleDrawerToggle: () => void;
}

export default function Actions({ handleDrawerToggle }: ActionsProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userId, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && userId) {
        try {
          const response = await userService.findById(Number(userId));
          if (response && response.data) {
            setAvatarUrl(response.data.avatar || "");
            setUserName(response.data.name || "");
          }
        } catch (error) {
          console.error("Error fetching user data in header:", error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId]);

  // Handle navigation and logout
  const handleProfileClick = () => {
    handleClose();
    navigate("/profile");
  };

  const handleHistoryTestClick = () => {
    handleClose();
    navigate("/history-test");
  };

  const handleLogoutClick = async () => {
    handleClose();
    await logout();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {isAuthenticated ? (
        // Authenticated user view with avatar
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={handleClick}
            sx={{
              p: 0,
              border: `2px solid ${
                isDarkMode ? color.emerald400 : color.emerald600
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: `0 0 8px ${color.emerald400}`,
              },
            }}
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={avatarUrl}
              alt={userName}
              sx={{
                width: 40,
                height: 40,
                bgcolor: isDarkMode ? color.emerald700 : color.emerald300,
              }}
            >
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 220,
                overflow: "visible",
                mt: 1.5,
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                boxShadow: `0 4px 20px rgba(0, 0, 0, ${
                  isDarkMode ? 0.5 : 0.15
                })`,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  my: 0.5,
                  borderRadius: 1,
                  color: isDarkMode ? color.gray200 : color.gray800,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? color.gray700
                      : color.emerald50,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: isDarkMode ? color.white : color.gray900,
                }}
              >
                {userName || "User"}
              </Typography>
            </Box>
            <Divider
              sx={{
                my: 1,
                borderColor: isDarkMode ? color.gray700 : color.gray200,
              }}
            />
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <User
                  size={18}
                  color={isDarkMode ? color.emerald400 : color.emerald600}
                />
              </ListItemIcon>
              <Typography variant="body2">Information</Typography>
            </MenuItem>
            <MenuItem onClick={handleHistoryTestClick}>
              <ListItemIcon>
                <History
                  size={18}
                  color={isDarkMode ? color.emerald400 : color.emerald600}
                />
              </ListItemIcon>
              <Typography variant="body2">History Test</Typography>
            </MenuItem>
            <Divider
              sx={{
                my: 1,
                borderColor: isDarkMode ? color.gray700 : color.gray200,
              }}
            />
            <MenuItem
              onClick={handleLogoutClick}
              sx={{ color: isDarkMode ? color.red500 : color.red600 }}
            >
              <ListItemIcon>
                <LogOut
                  size={18}
                  color={isDarkMode ? color.red500 : color.red600}
                />
              </ListItemIcon>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        // Non-authenticated user view with login/register buttons
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            sx={{
              color: isDarkMode ? color.white : color.black,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                color: color.emerald500,
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              color: isDarkMode ? color.black : color.white,
              bgcolor: color.emerald500,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: color.emerald600,
                transform: "translateY(-2px)",
                boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      )}

      {/* Mobile menu button */}
      <IconButton
        sx={{
          display: { xs: "flex", md: "none" },
          color: isDarkMode ? color.white : color.gray900,
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon size={20} />
      </IconButton>

      {/* Theme toggle button */}
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          display: { xs: "none", sm: "flex" },
          bgcolor: isDarkMode ? color.gray800 : color.gray100,
          color: isDarkMode ? color.emerald400 : color.emerald600,
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: isDarkMode ? color.gray700 : color.gray200,
            transform: "rotate(30deg)",
          },
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
    </Box>
  );
}
