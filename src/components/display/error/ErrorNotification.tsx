import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorItem } from "../../../redux/slices/errorSlice";

interface ErrorNotificationProps {
  error: ErrorItem | null;
  isOpen: boolean;
  autoHideTimeout: number;
  position: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  onClose: () => void;
}

export default function ErrorNotification({
  error,
  isOpen,
  autoHideTimeout,
  position,
  onClose,
}: ErrorNotificationProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  if (!error) return null;

  // Get color based on error severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return isDarkMode ? colors.errorDarkMode : colors.error;
      case "warning":
        return isDarkMode ? colors.warningDarkMode : colors.warning;
      case "info":
        return isDarkMode ? colors.infoDarkMode : colors.info;
      default:
        return isDarkMode ? colors.errorDarkMode : colors.error;
    }
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideTimeout > 0 ? autoHideTimeout : null}
      onClose={onClose}
      anchorOrigin={{
        vertical: position.vertical === "bottom" ? "top" : "bottom",
        horizontal: position.horizontal,
      }}
      sx={{
        mb: position.vertical === "bottom" ? 8 : 0,
        mt: position.vertical === "top" ? 8 : 0,
      }}
    >
      <Alert
        severity={error.severity}
        variant="filled"
        sx={{
          width: "100%",
          boxShadow: 3,
          backgroundColor: getSeverityColor(error.severity),
        }}
        onClose={onClose}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
}
