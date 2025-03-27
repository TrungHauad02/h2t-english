import React from "react";
import { Box, Badge, Zoom, Fab } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ErrorPosition } from "./types";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ErrorFabProps {
  count: number;
  position: ErrorPosition;
  onClick: () => void;
  isMobile: boolean;
}

export default function ErrorFab({
  count,
  position,
  onClick,
  isMobile,
}: ErrorFabProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        position: "fixed",
        [position.vertical]: isMobile ? 16 : 24,
        [position.horizontal]: isMobile ? 16 : 24,
        zIndex: 1050,
      }}
    >
      <Zoom in={count > 0}>
        <Badge
          badgeContent={count}
          color="error"
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: isDarkMode ? colors.errorDarkMode : colors.error,
              color: colors.white,
            },
          }}
        >
          <Fab
            size={isMobile ? "medium" : "large"}
            onClick={onClick}
            sx={{
              backgroundColor: isDarkMode ? colors.gray800 : colors.white,
              color:
                count > 0
                  ? isDarkMode
                    ? colors.errorDarkMode
                    : colors.error
                  : isDarkMode
                  ? colors.gray400
                  : colors.gray600,
              "&:hover": {
                backgroundColor: isDarkMode ? colors.gray700 : colors.gray100,
              },
              boxShadow: isDarkMode
                ? `0 0 8px ${colors.errorDarkMode}40`
                : `0 2px 8px ${colors.gray400}40`,
            }}
          >
            <ErrorOutlineIcon />
          </Fab>
        </Badge>
      </Zoom>
    </Box>
  );
}
