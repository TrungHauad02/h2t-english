import React from "react";
import { Box, Badge, Zoom, Fab } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ErrorButtonProps {
  count: number;
  position: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  isMobile: boolean;
  onClick: () => void;
}

export default function ErrorButton({
  count,
  position,
  isMobile,
  onClick,
}: ErrorButtonProps) {
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
