import React from "react";
import {
  Collapse,
  Paper,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ErrorItem as ErrorItemType, ErrorPosition } from "./types";
import ErrorItem from "./ErrorItem";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ErrorListProps {
  isOpen: boolean;
  errors: ErrorItemType[];
  position: ErrorPosition;
  isMobile: boolean;
  onClose: () => void;
  onClearAll: () => void;
  onDismissError: (id: string) => void;
  onShowDetails: (error: ErrorItemType) => void;
}

export default function ErrorList({
  isOpen,
  errors,
  position,
  isMobile,
  onClose,
  onClearAll,
  onDismissError,
  onShowDetails,
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
        <ErrorListHeader
          errorsCount={errors.length}
          isDarkMode={isDarkMode}
          colors={colors}
          onClose={onClose}
          onClearAll={onClearAll}
        />

        <Divider
          sx={{
            backgroundColor: isDarkMode ? colors.gray700 : colors.gray300,
          }}
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
                totalErrors={errors.length}
                onDismiss={onDismissError}
                onShowDetails={onShowDetails}
                isDarkMode={isDarkMode}
                colors={colors}
              />
            ))
          )}
        </List>
      </Paper>
    </Collapse>
  );
}

interface ErrorListHeaderProps {
  errorsCount: number;
  isDarkMode: boolean;
  colors: any;
  onClose: () => void;
  onClearAll: () => void;
}

function ErrorListHeader({
  errorsCount,
  isDarkMode,
  colors,
  onClose,
  onClearAll,
}: ErrorListHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: isDarkMode ? colors.gray200 : colors.gray800 }}
      >
        {errorsCount === 0 ? "No Errors" : `Errors (${errorsCount})`}
      </Typography>
      <Box>
        {errorsCount > 0 && (
          <IconButton
            size="small"
            onClick={onClearAll}
            sx={{
              mr: 1,
              color: isDarkMode ? colors.gray400 : colors.gray600,
            }}
          >
            <DeleteSweepIcon />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
