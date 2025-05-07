import React from "react";
import { Typography, Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface UserDetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | undefined;
  color: string;
}

export default function UserDetailItem({
  icon,
  label,
  value,
  color,
}: UserDetailItemProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Typography
      sx={{
        mb: 1.5,
        display: "flex",
        alignItems: "center",
        color: color,
        padding: "8px 10px",
        borderRadius: "8px",
        backgroundColor: isDarkMode
          ? "rgba(15, 118, 110, 0.1)"
          : "rgba(20, 184, 166, 0.03)",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isDarkMode
            ? "rgba(15, 118, 110, 0.15)"
            : "rgba(20, 184, 166, 0.08)",
          transform: "translateX(4px)",
        },
      }}
    >
      <Box
        sx={{
          mr: 1.5,
          color: isDarkMode ? colors.teal300 : colors.teal600,
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box
        component="span"
        sx={{
          fontWeight: "bold",
          minWidth: "100px",
          display: "inline-block",
        }}
      >
        {label}:
      </Box>
      <Box component="span" sx={{ ml: 1 }}>
        {value}
      </Box>
    </Typography>
  );
}
