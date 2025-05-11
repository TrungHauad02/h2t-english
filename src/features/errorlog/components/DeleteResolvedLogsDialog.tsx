import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  alpha,
  CircularProgress,
  Chip,
  Badge,
  Divider,
  Paper,
  Zoom,
  Fade,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SeverityEnum } from "interfaces";
import { useState, useEffect } from "react";

interface DeleteResolvedLogsDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedSeverities: SeverityEnum[]) => Promise<void>;
}

export default function DeleteResolvedLogsDialog({
  open,
  onClose,
  onConfirm,
}: DeleteResolvedLogsDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeverities, setSelectedSeverities] = useState<SeverityEnum[]>(
    []
  );

  // Reset selections when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedSeverities([]);
    }
  }, [open]);

  const handleSeverityChange = (severity: SeverityEnum) => {
    setSelectedSeverities((prev) => {
      if (prev.includes(severity)) {
        return prev.filter((sev) => sev !== severity);
      } else {
        return [...prev, severity];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedSeverities.length === Object.values(SeverityEnum).length) {
      // If all are selected, deselect all
      setSelectedSeverities([]);
    } else {
      // Select all
      setSelectedSeverities(Object.values(SeverityEnum));
    }
  };

  const handleConfirm = async () => {
    if (selectedSeverities.length === 0) return;

    setIsLoading(true);
    try {
      await onConfirm(selectedSeverities);
      onClose();
    } catch (error) {
      console.error("Error deleting resolved logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.LOW:
        return isDarkMode ? color.teal200 : color.teal700;
      case SeverityEnum.MEDIUM:
        return isDarkMode ? color.warning : color.warning;
      case SeverityEnum.HIGH:
        return isDarkMode ? color.red400 : color.red700;
      default:
        return isDarkMode ? color.gray300 : color.gray700;
    }
  };

  const getSeverityBgColor = (severity: SeverityEnum) => {
    switch (severity) {
      case SeverityEnum.LOW:
        return isDarkMode
          ? alpha(color.teal700, 0.2)
          : alpha(color.teal100, 0.5);
      case SeverityEnum.MEDIUM:
        return isDarkMode
          ? alpha(color.warning, 0.2)
          : alpha(color.warning, 0.1);
      case SeverityEnum.HIGH:
        return isDarkMode ? alpha(color.red700, 0.2) : alpha(color.red100, 0.5);
      default:
        return isDarkMode ? color.gray800 : color.gray100;
    }
  };

  const getSeverityIcon = (severity: SeverityEnum): React.ReactElement => {
    switch (severity) {
      case SeverityEnum.LOW:
        return <InfoOutlinedIcon fontSize="small" />;
      case SeverityEnum.MEDIUM:
        return <WarningAmberIcon fontSize="small" />;
      case SeverityEnum.HIGH:
        return <ErrorOutlineIcon fontSize="small" />;
      default:
        return <InfoOutlinedIcon fontSize="small" />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={300}
      PaperProps={{
        elevation: 24,
        sx: {
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray900 : color.white,
          backgroundImage: "none",
          overflow: "hidden",
          border: `1px solid ${isDarkMode ? color.gray800 : color.gray200}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          py: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <DeleteForeverIcon
          sx={{
            color: isDarkMode ? color.red400 : color.red600,
            fontSize: "1.75rem",
          }}
        />
        <Typography
          variant="h6"
          fontWeight={600}
          color={isDarkMode ? color.gray100 : color.gray900}
        >
          Delete Resolved Logs
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Fade in={true} timeout={400}>
          <Alert
            severity="warning"
            icon={<WarningAmberIcon />}
            sx={{
              mb: 3,
              backgroundColor: isDarkMode
                ? alpha(color.warning, 0.1)
                : alpha(color.warning, 0.08),
              border: `1px solid ${
                isDarkMode
                  ? alpha(color.warning, 0.3)
                  : alpha(color.warning, 0.2)
              }`,
              color: isDarkMode ? color.gray100 : color.gray900,
              "& .MuiAlert-icon": {
                color: isDarkMode ? color.warningDarkMode : color.warning,
              },
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              This action cannot be undone. All resolved logs with selected
              severity levels will be permanently deleted.
            </Typography>
          </Alert>
        </Fade>

        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            color={isDarkMode ? color.gray200 : color.gray800}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FilterAltIcon fontSize="small" />
            Select severity levels:
          </Typography>

          <Badge
            badgeContent={selectedSeverities.length}
            color="primary"
            showZero
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor:
                  selectedSeverities.length > 0
                    ? isDarkMode
                      ? color.teal600
                      : color.teal500
                    : isDarkMode
                    ? color.gray600
                    : color.gray400,
                color: color.white,
                fontWeight: 600,
              },
            }}
          >
            <Button
              size="small"
              variant="text"
              onClick={handleSelectAll}
              sx={{
                fontSize: "0.75rem",
                color: isDarkMode ? color.teal300 : color.teal600,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? alpha(color.teal900, 0.5)
                    : alpha(color.teal50, 0.8),
                },
              }}
            >
              {selectedSeverities.length === Object.values(SeverityEnum).length
                ? "Clear All"
                : "Select All"}
            </Button>
          </Badge>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 0.5,
            backgroundColor: isDarkMode
              ? alpha(color.gray800, 0.5)
              : color.gray50,
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
            borderRadius: "0.75rem",
          }}
        >
          <FormGroup>
            {Object.values(SeverityEnum).map((severity, index) => (
              <Box key={severity}>
                <FormControlLabel
                  sx={{
                    m: 0,
                    p: 1.5,
                    width: "100%",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? alpha(color.gray700, 0.5)
                        : alpha(color.gray100, 0.8),
                    },
                  }}
                  control={
                    <Checkbox
                      checked={selectedSeverities.includes(severity)}
                      onChange={() => handleSeverityChange(severity)}
                      sx={{
                        color: getSeverityColor(severity),
                        "&.Mui-checked": {
                          color: getSeverityColor(severity),
                        },
                      }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: getSeverityColor(severity),
                          }}
                        >
                          {severity}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            ml: 1,
                            color: isDarkMode ? color.gray400 : color.gray600,
                          }}
                        >
                          severity
                        </Typography>
                      </Box>

                      <Chip
                        icon={getSeverityIcon(severity)}
                        label={
                          severity.charAt(0) + severity.slice(1).toLowerCase()
                        }
                        size="small"
                        sx={{
                          ml: 2,
                          backgroundColor: getSeverityBgColor(severity),
                          color: getSeverityColor(severity),
                          fontWeight: 500,
                          border: `1px solid ${alpha(
                            getSeverityColor(severity),
                            0.3
                          )}`,
                          "& .MuiChip-icon": {
                            color: getSeverityColor(severity),
                          },
                        }}
                      />
                    </Box>
                  }
                />
                {index < Object.values(SeverityEnum).length - 1 && (
                  <Divider
                    sx={{
                      backgroundColor: isDarkMode
                        ? color.gray700
                        : color.gray200,
                    }}
                  />
                )}
              </Box>
            ))}
          </FormGroup>
        </Paper>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        <Button
          disabled={isLoading}
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray300 : color.gray700,
            "&:hover": {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              backgroundColor: isDarkMode
                ? alpha(color.gray700, 0.4)
                : alpha(color.gray200, 0.7),
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={selectedSeverities.length === 0 || isLoading}
          onClick={handleConfirm}
          startIcon={
            isLoading ? <CircularProgress size={20} /> : <DeleteForeverIcon />
          }
          sx={{
            backgroundColor: color.red600,
            color: color.white,
            "&:hover": {
              backgroundColor: color.red700,
            },
            "&:disabled": {
              backgroundColor: isDarkMode
                ? alpha(color.red700, 0.4)
                : alpha(color.red200, 0.7),
              color: isDarkMode
                ? alpha(color.red100, 0.5)
                : alpha(color.red600, 0.5),
            },
          }}
        >
          {isLoading
            ? "Deleting..."
            : `Delete ${
                selectedSeverities.length > 0
                  ? `(${selectedSeverities.length})`
                  : ""
              }`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
