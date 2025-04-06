import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";
import {
  ErrorLogTableHead,
  ErrorLogTableRow,
  ErrorLogDetailsDialog,
  ErrorLogEmptyState,
} from "./table";

interface ErrorLogTableProps {
  errorLogs: ErrorLog[];
  onRefresh?: () => void;
}

export default function ErrorLogTable({
  errorLogs,
  onRefresh,
}: ErrorLogTableProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State for the details dialog
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Handler for opening the details dialog
  const handleViewDetails = (log: ErrorLog) => {
    setSelectedLog(log);
    setOpenDialog(true);
  };

  // Handler for closing the details dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Get high severity error count
  const highSeverityCount = errorLogs.filter(
    (log) => log.severity === 2 && log.status
  ).length;

  return (
    <Fade in={true} timeout={800}>
      <Card
        elevation={0}
        sx={{
          backgroundColor: isDarkMode ? color.gray900 : color.white,
          border: `1px solid ${isDarkMode ? color.gray800 : color.gray200}`,
          borderRadius: "1rem",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: isDarkMode
              ? "0 8px 24px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: isDarkMode ? color.gray100 : color.gray800,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                System Error Logs
                {highSeverityCount > 0 && (
                  <Alert
                    severity="error"
                    icon={false}
                    sx={{
                      py: 0,
                      px: 1,
                      backgroundColor: isDarkMode
                        ? `${color.red800}90`
                        : `${color.red100}90`,
                      color: isDarkMode ? color.red200 : color.red800,
                      border: `1px solid ${
                        isDarkMode ? color.red700 : color.red300
                      }`,
                      borderRadius: "4px",
                      "& .MuiAlert-message": {
                        padding: "2px 0",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      },
                    }}
                  >
                    {highSeverityCount} active high severity issue
                    {highSeverityCount > 1 ? "s" : ""}
                  </Alert>
                )}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Filter logs">
                  <IconButton
                    size="small"
                    sx={{
                      backgroundColor: isDarkMode
                        ? color.gray800
                        : color.gray100,
                      color: isDarkMode ? color.gray300 : color.gray700,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.gray700
                          : color.gray200,
                      },
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh logs">
                  <IconButton
                    size="small"
                    onClick={onRefresh}
                    sx={{
                      backgroundColor: isDarkMode
                        ? color.teal800
                        : color.teal50,
                      color: isDarkMode ? color.teal200 : color.teal700,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.teal700
                          : color.teal100,
                      },
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          }
          sx={{
            backgroundColor: isDarkMode ? color.gray800 : color.gray50,
            px: 3,
            py: 2,
            borderBottom: `1px solid ${
              isDarkMode ? color.gray700 : color.gray200
            }`,
          }}
        />
        <Divider />
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            maxHeight: isMobile ? "60vh" : "none",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              tableLayout: "fixed",
              "& .MuiTableCell-root": {
                borderColor: isDarkMode ? color.gray800 : color.gray200,
              },
            }}
          >
            <ErrorLogTableHead />
            <TableBody>
              {errorLogs.length === 0 ? (
                <ErrorLogEmptyState />
              ) : (
                errorLogs.map((log) => (
                  <ErrorLogTableRow
                    key={log.id}
                    log={log}
                    onViewDetails={() => handleViewDetails(log)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Error Log Details Dialog */}
        <ErrorLogDetailsDialog
          open={openDialog}
          log={selectedLog}
          onClose={handleCloseDialog}
        />
      </Card>
    </Fade>
  );
}