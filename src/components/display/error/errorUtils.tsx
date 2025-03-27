import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BugReportIcon from "@mui/icons-material/BugReport";
import { ErrorSeverity } from "./types";

/**
 * Utility functions for error handling and display
 */

/**
 * Get color based on error severity
 */
export const getSeverityColor = (severity: ErrorSeverity, isDarkMode: boolean, colors: any) => {
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

/**
 * Get icon based on error severity
 */
export const getSeverityIcon = (severity: ErrorSeverity) => {
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

/**
 * Format timestamp to localized time string
 */
export const formatTimeString = (date: Date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/**
 * Format timestamp to full localized date and time string
 */
export const formatDateTimeString = (date: Date) => {
  return new Date(date).toLocaleString();
};
