import React from "react";
import { Toolbar, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function SidebarHeader() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: isDarkMode ? colors.teal400 : colors.teal600,
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        H2T Admin
      </Typography>
    </Toolbar>
  );
}
