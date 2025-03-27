import React from "react";
import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import WEDialog from "../dialog/WEDialog";
import { ErrorItem } from "../../../redux/slices/errorSlice";
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

  return (
    <WEDialog
      open={isOpen}
      title={`Error Details: ${error.severity.toUpperCase()}`}
      onCancel={onClose}
      onOk={onClose}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "600px",
          width: "100%",
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? colors.gray200 : colors.gray800,
            mb: 1,
          }}
        >
          Message:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
            p: 2,
            borderRadius: 1,
            color: isDarkMode ? colors.gray200 : colors.gray800,
            wordBreak: "break-word",
          }}
        >
          {error.message}
        </Typography>
      </Box>

      {error.details && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? colors.gray200 : colors.gray800,
              mb: 1,
            }}
          >
            Details:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{
              backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
              p: 2,
              borderRadius: 1,
              overflowX: "auto",
              color: isDarkMode ? colors.gray200 : colors.gray800,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "monospace",
            }}
          >
            {error.details}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? colors.gray200 : colors.gray800,
            mb: 1,
          }}
        >
          Timestamp:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
          }}
        >
          {formatDate(error.timestamp)}
        </Typography>
      </Box>
    </WEDialog>
  );
}
