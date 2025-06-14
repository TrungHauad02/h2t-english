import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Moon, Sun, Info, LogOut } from "lucide-react";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { userService } from "services";
import { toast } from "react-toastify";
import { RolesEnum, User } from "interfaces";

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
  const theme = useTheme();
  const navigate = useNavigate();
  const { userId, logout, hasRole } = useAuth();
  const [teacher, setTeacher] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const resData = await userService.findById(parseInt(userId));
          if (resData.data) {
            setTeacher(resData.data);
          }
        }
      } catch (error) {
        toast.error("Error fetching user data!");
      }
    };
    fetchData();
  }, [userId]);

  // Profile menu states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    logout();
    navigate("/");
  };

  const handleInfoClick = () => {
    handleClose();
    if (hasRole([RolesEnum.TEACHER])) navigate("/teacher/information");
    else navigate("/teacher-advance/information");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
        bgcolor: isDarkMode ? color.gray800 : color.white,
        color: isDarkMode ? color.white : color.gray900,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Toolbar
        sx={{
          height: 64,
          padding: theme.spacing(0, 2),
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal200 : color.teal700,
                display: "flex",
                alignItems: "center",
              }}
            >
              Manage Resources
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            {/* Theme Toggle */}
            <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
              <IconButton
                onClick={() => dispatch(toggleTheme())}
                sx={{
                  bgcolor: isDarkMode ? color.gray700 : color.gray100,
                  color: isDarkMode ? color.emerald300 : color.emerald600,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray600 : color.gray200,
                  },
                }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </Tooltip>

            {/* Profile with information */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{
                  ml: 1,
                  padding: 0.5,
                  border: `2px solid ${
                    isDarkMode ? color.teal700 : color.teal300
                  }`,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    border: `2px solid ${
                      isDarkMode ? color.teal500 : color.teal500
                    }`,
                  },
                }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={teacher?.avatar}
                  alt={teacher?.name}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: isDarkMode ? color.teal700 : color.teal500,
                    color: color.white,
                  }}
                >
                  {teacher?.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Profile Menu with Information */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                  mt: 1.5,
                  bgcolor: isDarkMode ? color.gray800 : color.white,
                  color: isDarkMode ? color.white : color.gray900,
                  border: `1px solid ${
                    isDarkMode ? color.gray700 : color.gray200
                  }`,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: isDarkMode ? color.gray800 : color.white,
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderTop: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                    borderLeft: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Teacher Account
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                  {teacher?.email}
                </Typography>
              </Box>

              <Divider
                sx={{
                  my: 1,
                  borderColor: isDarkMode ? color.gray700 : color.gray200,
                }}
              />

              <MenuItem
                sx={{
                  color: isDarkMode ? color.teal200 : color.teal700,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray700 : color.gray100,
                  },
                }}
                onClick={handleInfoClick}
              >
                <Info size={18} style={{ marginRight: 8 }} />
                Information
              </MenuItem>

              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: isDarkMode ? color.red400 : color.red600,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray700 : color.gray100,
                  },
                }}
              >
                <LogOut size={18} style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
