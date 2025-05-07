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

interface ErrorMessageSectionProps {
  log: ErrorLog;
  copied: string;
  handleCopyErrorMessage: () => void;
}

export default function ErrorMessageSection({
  log,
  copied,
  handleCopyErrorMessage,
}: ErrorMessageSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

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
        Error Message
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          borderRadius: "0.75rem",
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          position: "relative",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            color: isDarkMode ? color.gray300 : color.gray700,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            mb: log.message ? 2 : 0,
            pr: 4,
          }}
        >
          {log.message || "No error message provided"}
        </Typography>

        {log.message && (
          <Tooltip
            title={copied === "errorMessage" ? "Copied!" : "Copy Error Message"}
            placement="top"
          >
            <IconButton
              size="small"
              onClick={handleCopyErrorMessage}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color:
                  copied === "errorMessage"
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
              {copied === "errorMessage" ? (
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
