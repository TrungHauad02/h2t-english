import {
  Typography,
  Grid,
  Box,
  Paper,
  alpha,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";
import { useState } from "react";

interface ErrorStatusSectionProps {
  log: ErrorLog;
  formatDate: (date: string | Date | null | undefined) => string;
}

export default function ErrorStatusSection({
  log,
  formatDate,
}: ErrorStatusSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopyCreatedAt = () => {
    if (log.createdAt) {
      let dateStr: string;

      const createdAtStr =
        typeof log.createdAt === "object" && log.createdAt instanceof Date
          ? log.createdAt.toISOString()
          : String(log.createdAt);

      dateStr = createdAtStr.replace(/T/, " ");

      const parts = dateStr.split(".");
      if (parts.length > 1) {
        const milliseconds = parts[1];
        if (milliseconds.length < 6) {
          dateStr = `${parts[0]}.${milliseconds.padEnd(6, "0")}`;
        }
      }

      navigator.clipboard.writeText(dateStr);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: isDarkMode ? color.gray200 : color.gray800,
          mb: 1.5,
        }}
      >
        Status & Timestamps
      </Typography>

      <Grid container spacing={2}>
        {/* Created At */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: isDarkMode ? color.gray800 : color.gray100,
              borderRadius: "0.75rem",
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <AccessTimeIcon
              sx={{
                color: isDarkMode ? color.teal400 : color.teal600,
                fontSize: "1.5rem",
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  display: "block",
                }}
              >
                Created At
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontWeight: 500,
                }}
              >
                {formatDate(log.createdAt)}
              </Typography>
            </Box>
            <Tooltip title="Copy timestamp">
              <IconButton
                size="small"
                onClick={handleCopyCreatedAt}
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? alpha(color.teal500, 0.1)
                      : alpha(color.teal200, 0.5),
                  },
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grid>

        {/* Updated At */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: "100%",
              backgroundColor: isDarkMode ? color.gray800 : color.gray100,
              borderRadius: "0.75rem",
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <UpdateIcon
              sx={{
                color: isDarkMode ? color.teal400 : color.teal600,
                fontSize: "1.5rem",
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  display: "block",
                }}
              >
                Updated At
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontWeight: 500,
                }}
              >
                {formatDate(log.updatedAt)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Status */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: isDarkMode
                ? log.status
                  ? alpha(color.error, 0.1)
                  : alpha(color.success, 0.1)
                : log.status
                ? alpha(color.red100, 0.5)
                : alpha(color.green100, 0.5),
              borderRadius: "0.75rem",
              border: `1px solid ${
                log.status
                  ? isDarkMode
                    ? alpha(color.error, 0.3)
                    : color.red200
                  : isDarkMode
                  ? alpha(color.success, 0.3)
                  : color.green200
              }`,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {log.status ? (
              <ErrorOutlineIcon
                sx={{
                  color: isDarkMode ? color.errorDarkMode : color.error,
                  fontSize: "1.5rem",
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                sx={{
                  color: isDarkMode ? color.successDarkMode : color.success,
                  fontSize: "1.5rem",
                }}
              />
            )}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  display: "block",
                }}
              >
                Current Status
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: log.status
                    ? isDarkMode
                      ? color.errorDarkMode
                      : color.error
                    : isDarkMode
                    ? color.successDarkMode
                    : color.success,
                  fontWeight: 600,
                }}
              >
                {log.status ? "Active Error" : "Resolved"}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar thông báo khi copy thành công */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Timestamp copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: isDarkMode ? color.gray700 : color.gray800,
            color: color.white,
          },
        }}
      />
    </Box>
  );
}
