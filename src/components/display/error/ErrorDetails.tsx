import React from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import WEDialog from "../dialog/WEDialog";
import { ErrorItem } from "./types";
import { formatDate } from "utils/format";

interface ErrorDetailsProps {
  error: ErrorItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorDetails({
  error,
  isOpen,
  onClose,
}: ErrorDetailsProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  if (!error) return null;

  // Get icon and color based on severity
  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case "error":
        return {
          icon: <ErrorOutlineIcon />,
          color: isDarkMode ? colors.errorDarkMode : colors.error,
          bgColor: isDarkMode
            ? alpha(colors.errorDarkMode, 0.15)
            : alpha(colors.error, 0.1),
          label: "Error",
        };
      case "warning":
        return {
          icon: <ReportProblemIcon />,
          color: isDarkMode ? colors.warningDarkMode : colors.warning,
          bgColor: isDarkMode
            ? alpha(colors.warningDarkMode, 0.15)
            : alpha(colors.warning, 0.1),
          label: "Warning",
        };
      case "info":
        return {
          icon: <InfoOutlinedIcon />,
          color: isDarkMode ? colors.infoDarkMode : colors.info,
          bgColor: isDarkMode
            ? alpha(colors.infoDarkMode, 0.15)
            : alpha(colors.info, 0.1),
          label: "Info",
        };
      default:
        return {
          icon: <ErrorOutlineIcon />,
          color: isDarkMode ? colors.errorDarkMode : colors.error,
          bgColor: isDarkMode
            ? alpha(colors.errorDarkMode, 0.15)
            : alpha(colors.error, 0.1),
          label: "Error",
        };
    }
  };

  const severityInfo = getSeverityInfo(error.severity);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <WEDialog
      open={isOpen}
      title=""
      onCancel={onClose}
      onOk={onClose}
      sx={{
        "& .MuiPaper-root": {
          overflow: "hidden",
          borderRadius: "12px",
          background: isDarkMode ? colors.gray900 : colors.white,
        },
        "& .MuiDialogContent-root": {
          padding: 0,
        },
      }}
    >
      {/* Header Section with Severity */}
      <Box
        sx={{
          width: "100%",
          p: 3,
          pb: 2,
          background: severityInfo.bgColor,
          borderBottom: `1px solid ${alpha(severityInfo.color, 0.3)}`,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: severityInfo.color,
            color: colors.white,
            "& svg": {
              fontSize: 28,
            },
          }}
        >
          {severityInfo.icon}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: isDarkMode ? colors.gray200 : colors.gray800,
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {error.message}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={severityInfo.label}
              size="small"
              sx={{
                backgroundColor: severityInfo.color,
                color: colors.white,
                fontWeight: 500,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? colors.gray400 : colors.gray600,
                fontStyle: "italic",
              }}
            >
              {formatDate(error.timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Details Section */}
      <Box sx={{ p: 3 }}>
        {/* Message Card */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? colors.teal300 : colors.teal700,
              mb: 1.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Error Message
            <Tooltip title="Copy message">
              <IconButton
                size="small"
                onClick={() => handleCopyToClipboard(error.message)}
                sx={{
                  ml: 1,
                  color: isDarkMode ? colors.gray400 : colors.gray600,
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>

          <Card
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: isDarkMode ? colors.gray700 : colors.gray300,
              backgroundColor: isDarkMode
                ? alpha(colors.gray800, 0.7)
                : alpha(colors.gray100, 0.7),
              boxShadow: `inset 0 0 0 1px ${
                isDarkMode
                  ? alpha(colors.gray700, 0.5)
                  : alpha(colors.gray300, 0.5)
              }`,
            }}
          >
            <CardContent
              sx={{
                py: 2,
                "&:last-child": { pb: 2 },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? colors.gray200 : colors.gray800,
                  wordBreak: "break-word",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {error.message}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Details Accordion (if details exist) */}
        {error.details && (
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              mb: 2,
              borderRadius: 2,
              overflow: "hidden",
              border: `1px solid ${
                isDarkMode ? colors.gray700 : colors.gray300
              }`,
              backgroundColor: "transparent",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
                />
              }
              sx={{
                backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
                borderBottom: `1px solid ${
                  isDarkMode ? colors.gray700 : colors.gray300
                }`,
                minHeight: "48px",
                "&.Mui-expanded": {
                  minHeight: "48px",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: isDarkMode ? colors.teal300 : colors.teal700,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Technical Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: isDarkMode
                  ? alpha(colors.gray800, 0.7)
                  : alpha(colors.gray100, 0.5),
                p: 0,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  maxHeight: "300px",
                  overflow: "auto",
                  p: 2,
                }}
              >
                <Tooltip title="Copy details">
                  <IconButton
                    size="small"
                    onClick={() => handleCopyToClipboard(error.details || "")}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: isDarkMode ? colors.gray400 : colors.gray600,
                      backgroundColor: isDarkMode
                        ? alpha(colors.gray900, 0.6)
                        : alpha(colors.white, 0.6),
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? alpha(colors.gray900, 0.8)
                          : alpha(colors.white, 0.8),
                      },
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    color: isDarkMode ? colors.gray200 : colors.gray800,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  {error.details}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Additional Information */}
        <Box sx={{ mt: 3 }}>
          <Divider
            sx={{
              my: 2,
              borderColor: isDarkMode
                ? alpha(colors.gray700, 0.5)
                : alpha(colors.gray300, 0.5),
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? colors.gray400 : colors.gray600,
                    fontWeight: 500,
                  }}
                >
                  OCCURRENCE TIME
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? colors.gray200 : colors.gray800,
                    fontWeight: 500,
                  }}
                >
                  {formatDate(error.timestamp)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? colors.gray400 : colors.gray600,
                    fontWeight: 500,
                  }}
                >
                  ERROR TYPE
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? colors.gray200 : colors.gray800,
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {error.severity}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </WEDialog>
  );
}
