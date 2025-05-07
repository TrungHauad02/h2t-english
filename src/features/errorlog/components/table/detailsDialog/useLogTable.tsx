import { useState } from "react";
import { ErrorLog } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function useLogTable(log: ErrorLog | null) {
  const [copied, setCopied] = useState<string>("");
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Format date function
  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Get severity information
  const getSeverityInfo = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "error":
        return {
          color: isDarkMode ? color.errorDarkMode : color.error,
          label: "Error",
          bgColor: isDarkMode ? "rgba(220, 38, 38, 0.2)" : color.red100,
        };
      case "warning":
        return {
          color: isDarkMode ? color.warningDarkMode : color.warning,
          label: "Warning",
          bgColor: isDarkMode
            ? "rgba(251, 191, 36, 0.2)"
            : "rgba(251, 191, 36, 0.2)",
        };
      case "info":
        return {
          color: isDarkMode ? color.infoDarkMode : color.info,
          label: "Info",
          bgColor: isDarkMode
            ? "rgba(37, 99, 235, 0.2)"
            : "rgba(37, 99, 235, 0.1)",
        };
      case "debug":
        return {
          color: isDarkMode ? color.teal400 : color.teal600,
          label: "Debug",
          bgColor: isDarkMode
            ? "rgba(20, 184, 166, 0.2)"
            : "rgba(20, 184, 166, 0.1)",
        };
      default:
        return {
          color: isDarkMode ? color.gray400 : color.gray600,
          label: severity || "Unknown",
          bgColor: isDarkMode ? color.gray700 : color.gray200,
        };
    }
  };

  // Handle copy error message
  const handleCopyErrorMessage = () => {
    if (log?.message) {
      navigator.clipboard.writeText(log.message);
      setCopied("errorMessage");
      setTimeout(() => setCopied(""), 2000);
    }
  };

  // Severity info based on log severity or default
  const severityInfo = log
    ? getSeverityInfo(log.severity || "unknown")
    : {
        color: isDarkMode ? color.gray400 : color.gray600,
        label: "Unknown",
        bgColor: isDarkMode ? color.gray700 : color.gray200,
      };

  return {
    copied,
    setCopied,
    formatDate,
    getSeverityInfo,
    severityInfo,
    handleCopyErrorMessage,
  };
}
