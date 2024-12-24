import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function AuthMenuSection({
  handleNavigate,
}: {
  handleNavigate: (path: string) => void;
}) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <>
      <ListItemButton
        onClick={() => handleNavigate("/login")}
        sx={{
          color: isDarkMode ? color.white : color.black,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray700 : color.gray200,
          },
        }}
      >
        <ListItemText primary="Login" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleNavigate("/register")}
        sx={{
          color: isDarkMode ? color.white : color.black,
          "&:hover": {
            bgcolor: isDarkMode ? color.gray700 : color.gray200,
          },
        }}
      >
        <ListItemText primary="Register" />
      </ListItemButton>
    </>
  );
}
