import React from "react";
import { Box, Paper, Typography, Skeleton } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { RolesEnum } from "interfaces";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface UserRoleDistributionProps {
  data: Record<RolesEnum, number>;
  isLoading: boolean;
}

export default function UserRoleDistribution({
  data,
  isLoading,
}: UserRoleDistributionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const roleConfig = {
    [RolesEnum.ADMIN]: {
      color: isDarkMode ? color.red400 : color.red600,
      bgColor: isDarkMode ? color.red900 : color.red100,
    },
    [RolesEnum.TEACHER]: {
      color: isDarkMode ? color.teal400 : color.teal600,
      bgColor: isDarkMode ? color.teal900 : color.teal100,
    },
    [RolesEnum.TEACHER_ADVANCE]: {
      color: isDarkMode ? color.emerald400 : color.emerald600,
      bgColor: isDarkMode ? color.emerald900 : color.emerald100,
    },
    [RolesEnum.STUDENT]: {
      color: isDarkMode ? color.gray400 : color.gray600,
      bgColor: isDarkMode ? color.gray900 : color.gray100,
    },
  };

  const totalUsers = Object.values(data).reduce((acc, val) => acc + val, 0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          borderBottom: `2px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pb: 1,
        }}
      >
        <PeopleAltIcon
          sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
        >
          User Role Distribution
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Box sx={{ mb: 2 }} key={item}>
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{
                  borderRadius: 1,
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {Object.entries(data).map(([role, count]) => {
            const roleEnum = role as RolesEnum;
            const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0;

            return (
              <Box
                key={role}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: "0.5rem",
                  backgroundColor: roleConfig[roleEnum].bgColor,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  sx={{ color: roleConfig[roleEnum].color }}
                >
                  {role.replace("_", " ")}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ color: roleConfig[roleEnum].color, mr: 1 }}
                  >
                    {count.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      alignSelf: "flex-end",
                    }}
                  >
                    ({percentage.toFixed(1)}%)
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {!isLoading && (
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px dashed ${
              isDarkMode ? color.gray700 : color.gray300
            }`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            Total Users:
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
          >
            {totalUsers.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
