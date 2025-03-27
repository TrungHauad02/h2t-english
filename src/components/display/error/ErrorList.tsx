import React from "react";
import { List, ListItem, ListItemText, Paper, Collapse } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorItem as ErrorItemType } from "../../../redux/slices/errorSlice";
import ErrorPanelHeader from "./ErrorPanelHeader";
import ErrorItem from "./ErrorItem";

interface ErrorListProps {
  errors: ErrorItemType[];
  isOpen: boolean;
  position: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  isMobile: boolean;
  onClearAll: () => void;
  onClose: () => void;
  onDismissError: (id: string) => void;
  onSelectError: (error: ErrorItemType) => void;
}

export default function ErrorList({
  errors,
  isOpen,
  position,
  isMobile,
  onClearAll,
  onClose,
  onDismissError,
  onSelectError,
}: ErrorListProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Collapse
      in={isOpen}
      timeout="auto"
      sx={{
        position: "fixed",
        [position.vertical]: isMobile ? 80 : 100,
        [position.horizontal]: isMobile ? 16 : 24,
        zIndex: 1049,
        maxWidth: isMobile ? "calc(100% - 32px)" : 400,
        maxHeight: "60vh",
        width: isMobile ? "calc(100% - 32px)" : 400,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundColor: isDarkMode ? colors.gray900 : colors.white,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray300}`,
          maxHeight: "inherit",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ErrorPanelHeader
          errorCount={errors.length}
          onClearAll={onClearAll}
          onClose={onClose}
        />

        <List
          sx={{
            overflow: "auto",
            maxHeight: "calc(60vh - 56px)",
            backgroundColor: isDarkMode ? colors.gray900 : colors.white,
            p: 0,
          }}
        >
          {errors.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No errors to display"
                sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
              />
            </ListItem>
          ) : (
            errors.map((error, index) => (
              <ErrorItem
                key={error.id}
                error={error}
                index={index}
                isLastItem={index === errors.length - 1}
                onDismiss={onDismissError}
                onClick={onSelectError}
              />
            ))
          )}
        </List>
      </Paper>
    </Collapse>
  );
}
