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
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog, SeverityEnum } from "interfaces";
import {
  ErrorLogTableHead,
  ErrorLogTableRow,
  ErrorLogDetailsDialog,
  ErrorLogEmptyState,
} from "./table";
import useErrorLog from "./useErrorLogTable";
import { useState } from "react";
import DeleteResolvedLogsDialog from "./DeleteResolvedLogsDialog";
import { errorLogService } from "services";

interface ErrorLogTableProps {
  errorLogs: ErrorLog[];
  onRefresh: () => void;
}

export default function ErrorLogTable({
  errorLogs,
  onRefresh,
}: ErrorLogTableProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const hooks = useErrorLog(onRefresh);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async (selectedSeverities: SeverityEnum[]) => {
    try {
      await errorLogService.bulkDelete(selectedSeverities);
      onRefresh();
    } catch (error) {
      console.error("Error deleting resolved logs:", error);
    }
  };

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
                gap: 2,
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
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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

                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={handleDeleteDialogOpen}
                  size="small"
                  sx={{
                    borderColor: isDarkMode ? color.red700 : color.red300,
                    color: isDarkMode ? color.red300 : color.red700,
                    "&:hover": {
                      borderColor: isDarkMode ? color.red600 : color.red400,
                      backgroundColor: isDarkMode
                        ? `${color.red900}50`
                        : `${color.red50}80`,
                    },
                  }}
                >
                  Delete resolved logs
                </Button>
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
                    onViewDetails={() => hooks.handleViewDetails(log)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Error Log Details Dialog */}
        <ErrorLogDetailsDialog
          open={hooks.openDialog}
          log={hooks.selectedLog}
          onClose={hooks.handleCloseDialog}
          onMarkResolved={hooks.handleMarkResolved}
          onDeleteLog={hooks.handleDeleteLog}
        />

        {/* Delete Resolved Logs Dialog */}
        <DeleteResolvedLogsDialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          onConfirm={handleConfirmDelete}
        />
      </Card>
    </Fade>
  );
}
