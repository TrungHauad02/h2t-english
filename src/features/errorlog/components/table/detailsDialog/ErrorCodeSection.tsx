import {
  Typography,
  Paper,
  Box,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";

interface ErrorCodeSectionProps {
  log: ErrorLog;
  copied: string;
  setCopied: (value: string) => void;
}

export default function ErrorCodeSection({
  log,
  copied,
  setCopied,
}: ErrorCodeSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleCopyErrorCode = () => {
    if (log.errorCode) {
      navigator.clipboard.writeText(log.errorCode);
      setCopied("errorCode");
      setTimeout(() => setCopied(""), 2000);
    }
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
        Error Code
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          borderRadius: "0.75rem",
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 500,
          }}
        >
          {log.errorCode || "No error code provided"}
        </Typography>

        {log.errorCode && (
          <Tooltip
            title={copied === "errorCode" ? "Copied!" : "Copy Error Code"}
            placement="top"
          >
            <IconButton
              size="small"
              onClick={handleCopyErrorCode}
              sx={{
                color:
                  copied === "errorCode"
                    ? isDarkMode
                      ? color.teal400
                      : color.teal600
                    : isDarkMode
                    ? color.gray400
                    : color.gray500,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? alpha(color.gray700, 0.6)
                    : alpha(color.gray300, 0.3),
                },
              }}
            >
              {copied === "errorCode" ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    </Box>
  );
}
