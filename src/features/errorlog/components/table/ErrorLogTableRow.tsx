import {
  TableCell,
  TableRow,
  Tooltip,
  IconButton,
  Box,
  alpha,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";
import {
  SeverityChip,
  StatusChip,
  ErrorCodeDisplay,
  FormattedDate,
} from "./rowComponents";

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

  return (
    <TableRow
      hover
      sx={{
        backgroundColor:
          log.severity.toString() === "HIGH" && log.status
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
      <TableCell>
        <ErrorCodeDisplay errorCode={log.errorCode} />
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
        <SeverityChip severity={log.severity.toString()} />
      </TableCell>

      <TableCell>
        <StatusChip status={log.status} />
      </TableCell>

      <TableCell>
        <FormattedDate date={log.createdAt} />
      </TableCell>

      <TableCell>
        <FormattedDate date={log.updatedAt} />
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
