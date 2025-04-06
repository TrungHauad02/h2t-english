import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
  Grid,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  alpha,
  Tab,
  Tabs,
  Paper,
  Tooltip,
  Collapse,
  Fade,
  Stack,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HistoryIcon from "@mui/icons-material/History";
import BuildIcon from "@mui/icons-material/Build";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CodeIcon from "@mui/icons-material/Code";
import { format } from "date-fns";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog, SeverityEnum } from "interfaces";

interface ErrorLogDetailsDialogProps {
  open: boolean;
  log: ErrorLog | null;
  onClose: () => void;
}

export default function ErrorLogDetailsDialog({
  open,
  log,
  onClose,
}: ErrorLogDetailsDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  if (!log) return null;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCopyErrorMessage = () => {
    navigator.clipboard.writeText(log.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityInfo = (severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.HIGH:
        return {
          bg: isDarkMode ? alpha(color.red700, 0.4) : alpha(color.red100, 0.7),
          text: isDarkMode ? color.red100 : color.red900,
          borderColor: isDarkMode ? color.red600 : color.red300,
          label: "High",
          color: isDarkMode ? color.red400 : color.red700,
          icon: (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.red700, 0.5)
                  : alpha(color.red100, 0.9),
                border: `1px solid ${
                  isDarkMode ? color.red500 : color.red300
                }`,
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  color: isDarkMode ? color.red300 : color.red800,
                  fontSize: 20,
                }}
              />
            </Box>
          ),
          progressColor: isDarkMode ? color.red500 : color.red600,
        };
      case SeverityEnum.MEDIUM:
        return {
          bg: isDarkMode
            ? alpha(color.warningDarkMode, 0.3)
            : alpha(color.warning, 0.15),
          text: isDarkMode ? color.warning : color.black,
          borderColor: isDarkMode ? alpha(color.warning, 0.6) : color.warning,
          label: "Medium",
          color: isDarkMode ? color.warningDarkMode : color.warning,
          icon: (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.warningDarkMode, 0.3)
                  : alpha(color.warning, 0.15),
                border: `1px solid ${
                  isDarkMode
                    ? alpha(color.warningDarkMode, 0.6)
                    : color.warning
                }`,
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  color: isDarkMode ? color.warning : color.black,
                  fontSize: 20,
                }}
              />
            </Box>
          ),
          progressColor: isDarkMode ? color.warningDarkMode : color.warning,
        };
      case SeverityEnum.LOW:
        return {
          bg: isDarkMode
            ? alpha(color.teal700, 0.4)
            : alpha(color.teal100, 0.7),
          text: isDarkMode ? color.teal100 : color.teal900,
          borderColor: isDarkMode ? color.teal600 : color.teal300,
          label: "Low",
          color: isDarkMode ? color.teal400 : color.teal700,
          icon: (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.teal700, 0.4)
                  : alpha(color.teal100, 0.7),
                border: `1px solid ${
                  isDarkMode ? color.teal600 : color.teal300
                }`,
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  color: isDarkMode ? color.teal100 : color.teal900,
                  fontSize: 20,
                }}
              />
            </Box>
          ),
          progressColor: isDarkMode ? color.teal500 : color.teal600,
        };
      default:
        return {
          bg: isDarkMode
            ? alpha(color.gray700, 0.4)
            : alpha(color.gray200, 0.7),
          text: isDarkMode ? color.gray200 : color.gray800,
          borderColor: isDarkMode ? color.gray600 : color.gray300,
          label: "Unknown",
          color: isDarkMode ? color.gray400 : color.gray700,
          icon: (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.gray700, 0.4)
                  : alpha(color.gray200, 0.7),
                border: `1px solid ${
                  isDarkMode ? color.gray600 : color.gray300
                }`,
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  fontSize: 20,
                }}
              />
            </Box>
          ),
          progressColor: isDarkMode ? color.gray500 : color.gray600,
        };
    }
  };

  const severityInfo = getSeverityInfo(log.severity);

  const formatDate = (date?: Date | string) => {
    if (!date) return "-";
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
  };

  // Mock history data for the Timeline tab
  const mockHistory = [
    {
      date: new Date(log.createdAt || new Date()),
      action: "Error Created",
      user: "System",
    },
    {
      date: new Date(
        (log.createdAt || new Date()).getTime() + 1000 * 60 * 15
      ),
      action: "Error Detected",
      user: "Monitoring System",
    },
    {
      date: new Date(
        (log.createdAt || new Date()).getTime() + 1000 * 60 * 30
      ),
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

  const getBadgeContent = (severity: SeverityEnum) => {
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
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? color.gray900 : color.white,
          borderRadius: isMobile ? 0 : "1rem",
          backgroundImage: isDarkMode
            ? `radial-gradient(at 100% 0%, ${alpha(
                color.teal900,
                0.15
              )} 0px, transparent 50%),
               radial-gradient(at 0% 100%, ${alpha(
                 color.emerald900,
                 0.1
               )} 0px, transparent 50%)`
            : `radial-gradient(at 100% 0%, ${alpha(
                color.teal100,
                0.3
              )} 0px, transparent 50%),
               radial-gradient(at 0% 100%, ${alpha(
                 color.emerald100,
                 0.2
               )} 0px, transparent 50%)`,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Fade in={open} timeout={500}>
        <Box>
          <Box
            sx={{
              position: "relative",
              padding: 0,
              backgroundColor: isDarkMode ? color.gray800 : color.gray50,
              overflow: "hidden",
            }}
          >
            {/* Progress indicator by severity */}
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: isDarkMode
                  ? alpha(color.gray700, 0.5)
                  : alpha(color.gray200, 0.5),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: severityInfo.progressColor,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                pt: 3,
                px: 3,
                pb: 1,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                {severityInfo.icon}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: isDarkMode ? color.gray100 : color.gray900,
                      }}
                    >
                      Error Log Details
                    </Typography>
                    <Chip
                      label={severityInfo.label}
                      size="small"
                      sx={{
                        backgroundColor: severityInfo.bg,
                        color: severityInfo.text,
                        fontWeight: 600,
                        height: "20px",
                        fontSize: "0.7rem",
                        border: `1px solid ${severityInfo.borderColor}`,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                    }}
                  >
                    {getBadgeContent(log.severity)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Previous Error">
                  <IconButton
                    size="small"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? alpha(color.gray700, 0.7)
                          : alpha(color.gray200, 0.7),
                      },
                    }}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Next Error">
                  <IconButton
                    size="small"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? alpha(color.gray700, 0.7)
                          : alpha(color.gray200, 0.7),
                      },
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="More Options">
                  <IconButton
                    size="small"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? alpha(color.gray700, 0.7)
                          : alpha(color.gray200, 0.7),
                      },
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton
                    edge="end"
                    onClick={onClose}
                    size="small"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? alpha(color.gray700, 0.7)
                          : alpha(color.gray200, 0.7),
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: severityInfo.color,
                  height: 3,
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  color: isDarkMode ? color.gray400 : color.gray600,
                  "&.Mui-selected": {
                    color: severityInfo.color,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Tab
                icon={
                  <InfoOutlinedIcon
                    sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }}
                  />
                }
                label="Overview"
                iconPosition="start"
              />
              
            </Tabs>
          </Box>
        </Box>
      </Fade>

      <DialogContent
        sx={{
          padding: 0,
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isDarkMode ? color.gray700 : color.gray300,
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          },
        }}
      >
        {/* Overview Tab */}
        <Collapse in={activeTab === 0} timeout={500} mountOnEnter unmountOnExit>
          <Box sx={{ p: 3 }}>
            {/* Error Code Section */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: "0.75rem",
                backgroundColor: isDarkMode
                  ? alpha(color.gray800, 0.7)
                  : alpha(color.gray50, 0.7),
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                  Error Code
                </Typography>
                <Tooltip title="Copy Error Code">
                  <IconButton
                    size="small"
                    onClick={() => {
                      navigator.clipboard.writeText(log.errorCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    sx={{
                      color: isDarkMode ? color.gray500 : color.gray500,
                      padding: "2px",
                    }}
                  >
                    {copied ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{
                          color: isDarkMode ? color.green400 : color.green500,
                        }}
                      />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  borderRadius: "0.5rem",
                  p: 1.5,
                  border: `1px solid ${
                    isDarkMode ? color.gray700 : color.gray200
                  }`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: isDarkMode ? color.teal300 : color.teal700,
                  }}
                >
                  {log.errorCode}
                </Typography>
              </Box>
            </Paper>

            {/* Error Message Section */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: "0.75rem",
                backgroundColor: isDarkMode
                  ? alpha(color.gray800, 0.7)
                  : alpha(color.gray50, 0.7),
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                  Error Message
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy Message"}>
                  <IconButton
                    size="small"
                    onClick={handleCopyErrorMessage}
                    sx={{
                      color: isDarkMode ? color.gray500 : color.gray500,
                      padding: "2px",
                    }}
                  >
                    {copied ? (
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{
                          color: isDarkMode ? color.green400 : color.green500,
                        }}
                      />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  borderRadius: "0.5rem",
                  p: 1.5,
                  border: `1px solid ${
                    isDarkMode ? color.gray700 : color.gray200
                  }`,
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    whiteSpace: "pre-wrap",
                    color: isDarkMode ? color.gray200 : color.gray800,
                    lineHeight: 1.6,
                  }}
                >
                  {log.message}
                </Typography>
              </Box>
            </Paper>

            {/* Timestamps & Status Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: "0.75rem",
                    backgroundColor: isDarkMode
                      ? alpha(color.gray800, 0.7)
                      : alpha(color.gray50, 0.7),
                    border: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                      mb: 2,
                    }}
                  >
                    Timestamps
                  </Typography>

                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isDarkMode
                            ? alpha(color.gray700, 0.5)
                            : alpha(color.gray200, 0.5),
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                        }}
                      >
                        <ScheduleIcon
                          sx={{
                            fontSize: 16,
                            color: isDarkMode ? color.gray300 : color.gray600,
                          }}
                        />
                      </Box>
                      <Box>
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
                            fontFamily: "monospace",
                          }}
                        >
                          {formatDate(log.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isDarkMode
                            ? alpha(color.gray700, 0.5)
                            : alpha(color.gray200, 0.5),
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                        }}
                      >
                        <UpdateIcon
                          sx={{
                            fontSize: 16,
                            color: isDarkMode ? color.gray300 : color.gray600,
                          }}
                        />
                      </Box>
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
                            fontFamily: "monospace",
                          }}
                        >
                          {formatDate(log.updatedAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: "0.75rem",
                    backgroundColor: isDarkMode
                      ? alpha(
                          log.status ? color.teal900 : color.gray800,
                          log.status ? 0.2 : 0.7
                        )
                      : alpha(
                          log.status ? color.teal50 : color.gray50,
                          log.status ? 0.7 : 0.7
                        ),
                    border: `1px solid ${
                      isDarkMode
                        ? log.status
                          ? color.teal800
                          : color.gray700
                        : log.status
                        ? color.teal200
                        : color.gray200
                    }`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                      mb: 2,
                    }}
                  >
                    Status
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isDarkMode
                          ? alpha(
                              log.status ? color.teal700 : color.gray700,
                              0.3
                            )
                          : alpha(
                              log.status ? color.teal100 : color.gray200,
                              0.5
                            ),
                        border: `1px solid ${
                          isDarkMode
                            ? log.status
                              ? color.teal600
                              : color.gray600
                            : log.status
                            ? color.teal300
                            : color.gray300
                        }`,
                        mb: 2,
                      }}
                    >
                      {log.status ? (
                        <ErrorOutlineIcon
                          sx={{
                            fontSize: 30,
                            color: isDarkMode
                              ? color.teal300
                              : color.teal700,
                          }}
                        />
                      ) : (
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: 30,
                            color: isDarkMode
                              ? color.gray300
                              : color.gray700,
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: "absolute",
                          top: -3,
                          right: -3,
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: log.status
                            ? isDarkMode
                              ? color.green400
                              : color.green500
                            : isDarkMode
                            ? color.gray500
                            : color.gray400,
                          border: `2px solid ${
                            isDarkMode ? color.gray900 : color.white
                          }`,
                          boxShadow: log.status
                            ? `0 0 8px ${
                                isDarkMode ? color.green400 : color.green500
                              }`
                            : "none",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: log.status
                          ? isDarkMode
                            ? color.teal200
                            : color.teal800
                          : isDarkMode
                          ? color.gray300
                          : color.gray700,
                        textAlign: "center",
                      }}
                    >
                      {log.status ? "Active" : "Resolved"}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray600,
                        textAlign: "center",
                        mt: 0.5,
                      }}
                    >
                      {log.status
                        ? "This error is currently active and needs attention"
                        : "This error has been resolved successfully"}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Recommended Actions Section */}
            {log.status && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: "0.75rem",
                  backgroundColor: isDarkMode
                    ? alpha(color.teal900, 0.1)
                    : alpha(color.teal50, 0.7),
                  border: `1px solid ${
                    isDarkMode ? color.teal800 : color.teal200
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <BuildIcon
                    sx={{
                      color: isDarkMode ? color.teal300 : color.teal700,
                      mt: 0.5,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: isDarkMode ? color.teal100 : color.teal900,
                        mb: 1,
                      }}
                    >
                      Recommended Actions
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray300 : color.gray700,
                        mb: 2,
                      }}
                    >
                      Based on the error pattern, we recommend the following
                      steps to resolve this issue:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 0, mb: 1 }}>
                      <Typography
                        component="li"
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray300 : color.gray700,
                          mb: 1,
                        }}
                      >
                        Check the API connection and verify endpoint
                        availability.
                      </Typography>
                      <Typography
                        component="li"
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray300 : color.gray700,
                          mb: 1,
                        }}
                      >
                        Validate request parameters against the API
                        documentation.
                      </Typography>
                      <Typography
                        component="li"
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray300 : color.gray700,
                        }}
                      >
                        Review authentication credentials and ensure they are up
                        to date.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            )}

          </Box>
        </Collapse>

      </DialogContent>

      <DialogActions
        sx={{
          padding: 2,
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray300 : color.gray700,
            "&:hover": {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              backgroundColor: isDarkMode
                ? alpha(color.gray700, 0.5)
                : alpha(color.gray100, 0.5),
            },
          }}
        >
          Close
        </Button>

        {log.status && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: isDarkMode ? color.teal700 : color.teal600,
              color: color.white,
              "&:hover": {
                backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              },
            }}
          >
            Mark as Resolved
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}