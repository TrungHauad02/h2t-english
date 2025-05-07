import React from "react";
import {
  Box,
  Paper,
  Typography,
  Skeleton,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  alpha,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { RolesEnum, User } from "interfaces";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface RecentUsersProps {
  users: User[];
  isLoading: boolean;
}

export default function RecentUsers({ users, isLoading }: RecentUsersProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const getRoleConfig = (role: RolesEnum) => {
    switch (role) {
      case RolesEnum.ADMIN:
        return {
          color: isDarkMode ? color.red300 : color.red700,
          bg: isDarkMode ? alpha(color.red500, 0.2) : color.red100,
        };
      case RolesEnum.TEACHER:
        return {
          color: isDarkMode ? color.teal300 : color.teal700,
          bg: isDarkMode ? alpha(color.teal500, 0.2) : color.teal100,
        };
      case RolesEnum.TEACHER_ADVANCE:
        return {
          color: isDarkMode ? color.emerald300 : color.emerald700,
          bg: isDarkMode ? alpha(color.emerald500, 0.2) : color.emerald100,
        };
      case RolesEnum.STUDENT:
        return {
          color: isDarkMode ? color.gray300 : color.gray700,
          bg: isDarkMode ? alpha(color.gray500, 0.2) : color.gray200,
        };
      default:
        return {
          color: isDarkMode ? color.gray300 : color.gray700,
          bg: isDarkMode ? color.gray700 : color.gray200,
        };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          borderBottom: `2px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon
            sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Recent Users
          </Typography>
        </Box>
        <Tooltip title="View All Students">
          <IconButton
            size="small"
            onClick={() => navigate("/admin/manage-student")}
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {isLoading ? (
        <Box sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Box
              key={item}
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{
                  mr: 2,
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  width="60%"
                  sx={{
                    bgcolor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  sx={{
                    bgcolor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      ) : users.length === 0 ? (
        <Box
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            No recent users found
          </Typography>
        </Box>
      ) : (
        users.map((user, index) => {
          const roleConfig = getRoleConfig(user.role);

          return (
            <React.Fragment key={user.id}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "0.75rem",
                  backgroundColor: isDarkMode
                    ? alpha(color.gray700, 0.5)
                    : alpha(color.gray100, 0.5),
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                    backgroundColor: isDarkMode
                      ? alpha(color.gray700, 0.8)
                      : alpha(color.gray100, 0.8),
                  },
                }}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 50,
                    height: 50,
                    mr: 2,
                    bgcolor: isDarkMode ? color.teal700 : color.teal300,
                    color: isDarkMode ? color.white : color.teal900,
                    fontWeight: "bold",
                  }}
                >
                  {!user.avatar && getInitials(user.name)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: isDarkMode ? color.gray300 : color.gray700,
                          fontWeight: "medium",
                        }}
                      >
                        {user.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray500 : color.gray600,
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={user.role.replace("_", " ")}
                        size="small"
                        sx={{
                          backgroundColor: roleConfig.bg,
                          color: roleConfig.color,
                          fontWeight: "bold",
                          mr: 1,
                        }}
                      />
                    </Box>
                  </Box>
                  {user.createdAt && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode ? color.gray500 : color.gray500,
                        }}
                      >
                        Joined{" "}
                        {formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              {index < users.length - 1 && (
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                    my: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })
      )}
    </Paper>
  );
}
