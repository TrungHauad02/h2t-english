import {
  TableCell,
  TableRow,
  Chip,
  Box,
  Tooltip,
  IconButton,
  alpha,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { format } from "date-fns";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog, SeverityEnum } from "interfaces";

interface ErrorLogTableRowProps {
  log: ErrorLog;
  onViewDetails: () => void;
}

export default function ErrorLogTableRow({
  log,
  onViewDetails,
}: ErrorLogTableRowProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getSeverityInfo = (severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.HIGH:
        return {
          bg: isDarkMode ? alpha(color.red800, 0.6) : alpha(color.red100, 0.8),
          text: isDarkMode ? color.red50 : color.red900,
          borderColor: isDarkMode ? color.red700 : color.red400,
          label: SeverityEnum.HIGH,
        };
      case SeverityEnum.MEDIUM:
        return {
          bg: isDarkMode 
            ? alpha(color.warning, 0.6) 
            : alpha(color.warning, 0.8),
          text: isDarkMode ? color.warning : color.warning,
          borderColor: isDarkMode ? color.warning : color.warning,
          label: SeverityEnum.MEDIUM,
        };
      case SeverityEnum.LOW:
        return {
          bg: isDarkMode ? alpha(color.blue700, 0.6) : alpha(color.blue100, 0.8),
          text: isDarkMode ? color.blue50 : color.blue900,
          borderColor: isDarkMode ? color.blue600 : color.blue300,
          label: SeverityEnum.LOW,
        };
      default:
        return {
          bg: isDarkMode ? alpha(color.gray700, 0.4) : alpha(color.gray200, 0.7),
          text: isDarkMode ? color.gray200 : color.gray800,
          borderColor: isDarkMode ? color.gray600 : color.gray300,
          label: "Unknown",
        };
    }
  };

  const severityInfo = getSeverityInfo(log.severity);

  const getStatusInfo = (status: boolean) => {
    return {
      bg: status
        ? isDarkMode
          ? alpha(color.green700, 0.4)
          : alpha(color.green100, 0.7)
        : isDarkMode
        ? alpha(color.gray700, 0.4)
        : alpha(color.gray200, 0.7),
      text: status
        ? isDarkMode
          ? color.green100
          : color.green800
        : isDarkMode
        ? color.gray300
        : color.gray700,
      borderColor: status
        ? isDarkMode
          ? color.green600
          : color.green300
        : isDarkMode
        ? color.gray600
        : color.gray300,
      label: status ? "Active" : "Resolved",
    };
  };

  const statusInfo = getStatusInfo(log.status);

  const formatDate = (date?: Date | string) => {
    if (!date) return "-";
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <TableRow
      hover
      sx={{
        backgroundColor:
          log.severity === SeverityEnum.HIGH && log.status
            ? isDarkMode
              ? alpha(color.red900, 0.2)
              : alpha(color.red50, 0.7)
            : "transparent",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: isDarkMode
            ? alpha(color.gray800, 0.7)
            : alpha(color.gray100, 0.7),
        },
        "& td": {
          padding: "12px 16px",
          borderBottomWidth: "1px",
        },
        "& td:not(:last-child)": {
          position: "relative",
        },
      }}
    >
      <TableCell
        sx={{
          color: isDarkMode ? color.teal300 : color.teal700,
          fontFamily: "monospace",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
            backgroundColor: isDarkMode
              ? alpha(color.teal700, 0.3)
              : alpha(color.teal50, 0.7),
            border: `1px solid ${
              isDarkMode ? alpha(color.teal600, 0.3) : color.teal100
            }`,
            borderRadius: "4px",
            padding: "2px 6px",
            width: "fit-content",
          }}
        >
          {log.errorCode}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: isDarkMode ? color.gray200 : color.gray800,
          fontSize: "0.875rem",
        }}
      >
        <Tooltip
          title={log.message}
          placement="top"
          arrow
          enterDelay={500}
          leaveDelay={200}
        >
          <Box component="span">{log.message}</Box>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Chip
          label={log.severity}
          size="small"
          sx={{
            backgroundColor: severityInfo.bg,
            color: severityInfo.text,
            fontWeight: 600,
            minWidth: "80px",
            height: "24px",
            border: `1px solid ${severityInfo.borderColor}`,
            boxShadow: isDarkMode ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={statusInfo.label}
          size="small"
          sx={{
            backgroundColor: statusInfo.bg,
            color: statusInfo.text,
            fontWeight: 600,
            minWidth: "80px",
            height: "24px",
            border: `1px solid ${statusInfo.borderColor}`,
            boxShadow: isDarkMode ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            },
          }}
        />
      </TableCell>
      <TableCell
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          fontSize: "0.75rem",
        }}
      >
        {formatDate(log.createdAt)}
      </TableCell>
      <TableCell
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          fontSize: "0.75rem",
        }}
      >
        {formatDate(log.updatedAt)}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="View Details" arrow>
          <IconButton
            size="small"
            onClick={onViewDetails}
            sx={{
              backgroundColor: isDarkMode ? color.gray800 : color.teal50,
              color: isDarkMode ? color.teal400 : color.teal600,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                color: isDarkMode ? color.teal200 : color.teal700,
                transform: "scale(1.1)",
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}