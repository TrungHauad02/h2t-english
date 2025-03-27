import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { ErrorItem, ErrorPosition } from "./types";
import { getSeverityColor } from "./errorUtils";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ErrorSnackbarProps {
  error: ErrorItem | null;
  isOpen: boolean;
  onClose: () => void;
  position: ErrorPosition;
  autoHideTimeout: number;
}

export default function ErrorSnackbar({
  error,
  isOpen,
  onClose,
  position,
  autoHideTimeout,
}: ErrorSnackbarProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  if (!error) return null;

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
          backgroundColor: getSeverityColor(error.severity, isDarkMode, colors),
        }}
        onClose={onClose}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
}
