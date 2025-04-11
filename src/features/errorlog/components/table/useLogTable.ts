import { useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSeverityInfo } from "./SeverityInfo";
import { ErrorLog, SeverityEnum } from "interfaces";

export default function useLogTable(log: ErrorLog | null) {
  const [copied, setCopied] = useState(false);

  const severityInfo = useSeverityInfo(log?.severity ?? SeverityEnum.LOW);

  const formatDate = useCallback((date?: Date | string) => {
    if (!date) return "-";
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
  }, []);

  const handleCopyErrorMessage = useCallback(() => {
    if (log?.message) {
      navigator.clipboard.writeText(log.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [log]);

  const getBadgeContent = useCallback((severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.HIGH:
        return "High priority, immediate attention required";
      case SeverityEnum.MEDIUM:
        return "Moderate priority, should be addressed soon";
      case SeverityEnum.LOW:
        return "Low priority, can be addressed when convenient";
      default:
        return "Unknown severity";
    }
  }, []);

  const mockHistory = useMemo(() => {
    if (!log) return [];

    const created = new Date(log.createdAt || new Date());

    return [
      {
        date: created,
        action: "Error Created",
        user: "System",
      },
      {
        date: new Date(created.getTime() + 1000 * 60 * 15),
        action: "Error Detected",
        user: "Monitoring System",
      },
      {
        date: new Date(created.getTime() + 1000 * 60 * 30),
        action: "Under Investigation",
        user: "Tech Support",
      },
      ...(log.status
        ? []
        : [
            {
              date: new Date(log.updatedAt || new Date()),
              action: "Issue Resolved",
              user: "Tech Support",
            },
          ]),
    ];
  }, [log]);

  return {
    severityInfo,
    formatDate,
    handleCopyErrorMessage,
    copied,
    getBadgeContent,
    mockHistory,
    setCopied,
  };
};
