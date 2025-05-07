import React from "react";
import {
  Box,
  Paper,
  Typography,
  Skeleton,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  alpha,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ErrorLog, SeverityEnum } from "interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface RecentErrorLogsProps {
  logs: ErrorLog[];
  isLoading: boolean;
}

export default function RecentErrorLogs({
  logs,
  isLoading,
}: RecentErrorLogsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const getSeverityColor = (severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.LOW:
        return {
          bg: isDarkMode ? alpha(color.green500, 0.2) : color.green100,
          text: isDarkMode ? color.green300 : color.green700,
        };
      case SeverityEnum.MEDIUM:
        return {
          bg: isDarkMode ? alpha(color.warning, 0.2) : color.yellow,
          text: isDarkMode ? color.warning : color.warning,
        };
      case SeverityEnum.HIGH:
        return {
          bg: isDarkMode ? alpha(color.error, 0.2) : color.red100,
          text: isDarkMode ? color.errorDarkMode : color.error,
        };
      default:
        return {
          bg: isDarkMode ? color.gray700 : color.gray200,
          text: isDarkMode ? color.gray300 : color.gray700,
        };
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/admin/error-log/${id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          borderBottom: `2px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
        >
          Recent Error Logs
        </Typography>
        <Tooltip title="View All Error Logs">
          <IconButton
            size="small"
            onClick={() => navigate("/admin/error-log")}
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {isLoading ? (
        <Box sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ mb: 2 }}>
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{
                  borderRadius: 2,
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          ))}
        </Box>
      ) : logs.length === 0 ? (
        <Box
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            No recent error logs found
          </Typography>
        </Box>
      ) : (
        logs.map((log, index) => {
          const severityColor = getSeverityColor(log.severity);

          return (
            <React.Fragment key={log.id}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "0.75rem",
                  backgroundColor: isDarkMode
                    ? alpha(color.gray700, 0.5)
                    : alpha(color.gray100, 0.5),
                  mb: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                    backgroundColor: isDarkMode
                      ? alpha(color.gray700, 0.8)
                      : alpha(color.gray100, 0.8),
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Chip
                        label={log.severity}
                        size="small"
                        sx={{
                          backgroundColor: severityColor.bg,
                          color: severityColor.text,
                          fontWeight: "bold",
                          mr: 1,
                        }}
                      />
                      <Chip
                        label={log.errorCode}
                        size="small"
                        sx={{
                          backgroundColor: isDarkMode
                            ? color.gray700
                            : color.gray200,
                          color: isDarkMode ? color.gray300 : color.gray700,
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: isDarkMode ? color.gray300 : color.gray700,
                        fontWeight: "medium",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {log.message}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(log.id)}
                      sx={{
                        color: isDarkMode ? color.teal400 : color.teal600,
                        backgroundColor: isDarkMode
                          ? alpha(color.teal900, 0.5)
                          : alpha(color.teal100, 0.8),
                        "&:hover": {
                          backgroundColor: isDarkMode
                            ? alpha(color.teal800, 0.8)
                            : alpha(color.teal200, 0.8),
                        },
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    mt: 1,
                  }}
                >
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{
                      color: isDarkMode ? color.gray500 : color.gray500,
                      mr: 0.5,
                      fontSize: 14,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
                  >
                    {log.createdAt
                      ? formatDistanceToNow(new Date(log.createdAt), {
                          addSuffix: true,
                        })
                      : "Unknown time"}
                  </Typography>
                </Box>
              </Box>
              {index < logs.length - 1 && (
                <Divider
                  sx={{
                    borderStyle: "dashed",
                    borderColor: isDarkMode ? color.gray700 : color.gray300,
                    my: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })
      )}
    </Paper>
  );
}
