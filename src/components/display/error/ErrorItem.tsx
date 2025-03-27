import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorItem as ErrorItemType } from "../../../redux/slices/errorSlice";

interface ErrorItemProps {
  error: ErrorItemType;
  index: number;
  isLastItem: boolean;
  onDismiss: (id: string) => void;
  onClick: (error: ErrorItemType) => void;
}

export default function ErrorItem({
  error,
  index,
  isLastItem,
  onDismiss,
  onClick,
}: ErrorItemProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

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

  // Get icon based on error severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <ErrorOutlineIcon />;
      case "warning":
        return <ReportProblemIcon />;
      case "info":
        return <BugReportIcon />;
      default:
        return <ErrorOutlineIcon />;
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <React.Fragment>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => onDismiss(error.id)}
            size="small"
            sx={{
              color: isDarkMode ? colors.gray500 : colors.gray600,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
          },
          borderLeft: `4px solid ${getSeverityColor(error.severity)}`,
        }}
        onClick={() => onClick(error)}
      >
        <ListItemText
          primary={
            <Box sx={{ display: "flex", alignItems: "center", pr: 4 }}>
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: getSeverityColor(error.severity),
                  mr: 1,
                }}
              >
                {getSeverityIcon(error.severity)}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: isDarkMode ? colors.gray200 : colors.gray800,
                  wordBreak: "break-word",
                }}
              >
                {error.message}
              </Typography>
            </Box>
          }
          secondary={
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? colors.gray500 : colors.gray600,
                display: "block",
                mt: 0.5,
              }}
            >
              {formatTime(error.timestamp)}
            </Typography>
          }
        />
      </ListItem>
      {!isLastItem && (
        <Divider
          component="li"
          sx={{
            backgroundColor: isDarkMode ? colors.gray800 : colors.gray200,
          }}
        />
      )}
    </React.Fragment>
  );
}
