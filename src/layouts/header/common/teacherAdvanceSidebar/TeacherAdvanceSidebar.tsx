import {
  Box,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  Tooltip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, useLocation } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function TeacherAdvanceSidebar({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  const sidebarItems = [
    {
      label: "Dashboard",
      path: "/teacher-advance/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      label: "Manage Competitions",
      path: "/teacher-advance/competitions",
      icon: <EmojiEventsIcon fontSize="small" />,
    },
    {
      label: "Manage Toeic Tests",
      path: "/teacher-advance/toeics",
      icon: <AssignmentIcon fontSize="small" />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        height: "100vh",
      }}
      aria-label="sidebar"
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: isDarkMode ? color.gray900 : color.white,
            color: isDarkMode ? color.white : color.black,
            borderRight: isDarkMode
              ? `1px solid ${color.gray800}`
              : `1px solid ${color.gray200}`,
            boxShadow: isDarkMode ? "none" : "4px 0 10px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: isDarkMode
              ? `1px solid ${color.gray800}`
              : `1px solid ${color.gray200}`,
            height: 64,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                background: isDarkMode
                  ? `linear-gradient(135deg, ${color.teal300}, ${color.emerald400})`
                  : `linear-gradient(135deg, ${color.teal600}, ${color.emerald600})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px",
              }}
            >
              H2T English
            </Typography>
          </Stack>
          {isMobile && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  bgcolor: isDarkMode
                    ? alpha(color.teal600, 0.1)
                    : alpha(color.teal200, 0.4),
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Sidebar Content */}
        <Box
          sx={{
            overflow: "auto",
            p: 2,
            height: "calc(100% - 64px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray500,
              fontWeight: 600,
              letterSpacing: "1px",
              px: 1,
              mb: 1,
            }}
          >
            MENU
          </Typography>

          <List sx={{ px: 0 }}>
            {sidebarItems.map((item, index) => (
              <Box key={index}>
                {
                  // Regular item
                  <NavLink to={item.path} style={{ textDecoration: "none" }}>
                    <Tooltip
                      title={item.label}
                      placement="right"
                      enterDelay={500}
                    >
                      <ListItem
                        component="div"
                        sx={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          mb: 0.5,
                          bgcolor: isActive(item.path)
                            ? isDarkMode
                              ? alpha(color.teal700, 0.3)
                              : alpha(color.teal200, 0.4)
                            : "transparent",
                          color: isActive(item.path)
                            ? isDarkMode
                              ? color.teal200
                              : color.teal700
                            : isDarkMode
                            ? color.gray300
                            : color.gray700,
                          "&:hover": {
                            bgcolor: isDarkMode
                              ? alpha(color.teal700, 0.2)
                              : alpha(color.teal100, 0.5),
                          },
                          transition: "all 0.2s ease",
                          py: 1,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            color: isActive(item.path)
                              ? isDarkMode
                                ? color.teal200
                                : color.teal700
                              : isDarkMode
                              ? color.gray400
                              : color.gray600,
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: isActive(item.path) ? 600 : 500,
                          }}
                        />
                      </ListItem>
                    </Tooltip>
                  </NavLink>
                }

                {index < sidebarItems.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: isDarkMode ? color.gray800 : color.gray200,
                      my: 1.5,
                    }}
                  />
                )}
              </Box>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          {/* Version info at bottom */}
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              mt: "auto",
              borderTop: isDarkMode
                ? `1px solid ${color.gray800}`
                : `1px solid ${color.gray200}`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? color.gray500 : color.gray600,
                fontSize: "0.7rem",
              }}
            >
              H2T English Portal v1.2.0
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
