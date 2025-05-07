import React, { useEffect, useState } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useAuth from "hooks/useAuth";
import { userService } from "services";
import { User, History, LogOut } from "lucide-react";

export default function AuthMenuSection({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { isAuthenticated, userId, logout } = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Fetch user data if authenticated
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
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {isAuthenticated ? (
        // Authenticated user menu items
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 1.5,
              mb: 1,
            }}
          >
            <Avatar
              src={avatarUrl}
              alt={userName}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                bgcolor: isDarkMode ? color.emerald700 : color.emerald300,
                border: `2px solid ${
                  isDarkMode ? color.emerald500 : color.emerald400
                }`,
              }}
            >
              {userName ? userName.charAt(0).toUpperCase() : "U"}
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.white : color.gray900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {userName || "User"}
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 1,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }}
          />

          <ListItemButton
            onClick={() => handleNavigate("/profile")}
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              borderRadius: 1,
              my: 0.5,
              mx: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.emerald50,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isDarkMode ? color.emerald400 : color.emerald600,
              }}
            >
              <User size={20} />
            </ListItemIcon>
            <ListItemText primary="Information" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleNavigate("/history-test")}
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              borderRadius: 1,
              my: 0.5,
              mx: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.emerald50,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isDarkMode ? color.emerald400 : color.emerald600,
              }}
            >
              <History size={20} />
            </ListItemIcon>
            <ListItemText primary="History Test" />
          </ListItemButton>

          <Divider
            sx={{
              my: 1,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
            }}
          />

          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: isDarkMode ? color.red500 : color.red600,
              borderRadius: 1,
              my: 0.5,
              mx: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray800 : color.red100,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: isDarkMode ? color.red500 : color.red600,
              }}
            >
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </>
      ) : (
        // Non-authenticated user menu items
        <>
          <ListItemButton
            onClick={() => handleNavigate("/login")}
            sx={{
              color: isDarkMode ? color.white : color.black,
              borderRadius: 1,
              my: 0.5,
              mx: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.emerald50,
              },
            }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton
            onClick={() => handleNavigate("/register")}
            sx={{
              color: isDarkMode ? color.white : color.black,
              borderRadius: 1,
              my: 0.5,
              mx: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.gray700 : color.emerald50,
              },
            }}
          >
            <ListItemText primary="Register" />
          </ListItemButton>
        </>
      )}
    </>
  );
}
