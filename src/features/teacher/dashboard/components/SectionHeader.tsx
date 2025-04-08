import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { CalendarToday as CalendarTodayIcon } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { SectionHeaderProps } from "../types";

export default function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const renderAction = () => {
    if (!action) return null;

    if (typeof action === "string") {
      if (action.includes("ngày")) {
        return (
          <Chip
            icon={<CalendarTodayIcon fontSize="small" />}
            label={action}
            variant="outlined"
            sx={{
              borderColor: isDarkMode ? color.gray600 : color.gray300,
              color: isDarkMode ? color.gray300 : color.gray700,
            }}
          />
        );
      }
      
      return (
        <Button
          size="small"
          sx={{
            color: isDarkMode ? color.teal400 : color.teal600,
            textTransform: "none",
          }}
        >
          {action}
        </Button>
      );
    }

    return action;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 3,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              mt: 0.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box>{renderAction()}</Box>}
    </Box>
  );
}