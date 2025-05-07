import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import {
  Person,
  Email,
  ToggleOn,
  School,
  Badge,
  CalendarToday,
} from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { LevelsEnum } from "interfaces";

interface ActiveFiltersDisplayProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  emailFilter: string;
  setEmailFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  startCreatedAt: Date | null;
  setStartCreatedAt: (value: Date | null) => void;
  endCreatedAt: Date | null;
  setEndCreatedAt: (value: Date | null) => void;
}

export default function ActiveFiltersDisplay({
  nameFilter,
  setNameFilter,
  emailFilter,
  setEmailFilter,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  levelFilter,
  setLevelFilter,
  startCreatedAt,
  setStartCreatedAt,
  endCreatedAt,
  setEndCreatedAt,
}: ActiveFiltersDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Functions to format filter display values
  const getStatusLabel = (status: string) => {
    return status === "active" ? "Active" : "Inactive";
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "all":
        return "All Teachers";
      case "teacher":
        return "Regular Teachers";
      case "teacher_advance":
        return "Advanced Teachers";
      default:
        return "";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case LevelsEnum.BACHELOR:
        return "Bachelor";
      case LevelsEnum.MASTER:
        return "Master";
      case LevelsEnum.DOCTOR:
        return "Doctor";
      case LevelsEnum.PROFESSOR:
        return "Professor";
      default:
        return "";
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };

  // Check if there are any active filters
  const hasActiveFilters =
    nameFilter ||
    emailFilter ||
    statusFilter ||
    (roleFilter && roleFilter !== "all") ||
    levelFilter ||
    startCreatedAt ||
    endCreatedAt;

  if (!hasActiveFilters) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: "1rem",
        bgcolor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.teal800 : color.teal100}`,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1.5,
          fontWeight: 600,
          color: isDarkMode ? color.teal200 : color.teal800,
        }}
      >
        Active Filters
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {nameFilter && (
          <Chip
            icon={
              <Person
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`Name: ${nameFilter}`}
            onDelete={() => setNameFilter("")}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {emailFilter && (
          <Chip
            icon={
              <Email
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`Email: ${emailFilter}`}
            onDelete={() => setEmailFilter("")}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {statusFilter && (
          <Chip
            icon={
              <ToggleOn
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`Status: ${getStatusLabel(statusFilter)}`}
            onDelete={() => setStatusFilter("")}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {roleFilter && roleFilter !== "all" && (
          <Chip
            icon={
              <Badge
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`Type: ${getRoleLabel(roleFilter)}`}
            onDelete={() => setRoleFilter("all")}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {levelFilter && (
          <Chip
            icon={
              <School
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`Level: ${getLevelLabel(levelFilter)}`}
            onDelete={() => setLevelFilter("")}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {startCreatedAt && (
          <Chip
            icon={
              <CalendarToday
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`From: ${formatDate(startCreatedAt)}`}
            onDelete={() => setStartCreatedAt(null)}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}

        {endCreatedAt && (
          <Chip
            icon={
              <CalendarToday
                sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}
              />
            }
            label={`To: ${formatDate(endCreatedAt)}`}
            onDelete={() => setEndCreatedAt(null)}
            sx={{
              bgcolor: isDarkMode ? color.teal900 : color.teal50,
              color: isDarkMode ? color.teal200 : color.teal800,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
              "& .MuiChip-deleteIcon": {
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  color: isDarkMode ? color.teal200 : color.teal700,
                },
              },
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDarkMode ? color.teal800 : color.teal100,
              },
            }}
          />
        )}
      </Box>
    </Paper>
  );
}
