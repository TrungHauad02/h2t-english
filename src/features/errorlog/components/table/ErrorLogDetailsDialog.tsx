import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  alpha,
  Collapse,
} from "@mui/material";

import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";
import { ErrorLogHeaderDetailsDialog, useLogTable, ErrorCodeSection, ErrorMessageSection, ErrorStatusSection, ErrorRecommentSection } from ".";

interface ErrorLogDetailsDialogProps {
  open: boolean;
  log: ErrorLog | null;
  onClose: () => void;
  onMarkResolved?: (log: ErrorLog) => void;
}

export default function ErrorLogDetailsDialog({ open, log, onClose, onMarkResolved }: ErrorLogDetailsDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState<number>(0);
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useLogTable(log);

  if (!log) return null;

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
      <ErrorLogHeaderDetailsDialog
        open={open}
        onClose={onClose}
        log={log}
        severityInfo={hooks.severityInfo}
        getBadgeContent={hooks.getBadgeContent}
      />

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
            <ErrorCodeSection
              log={log}
              copied={hooks.copied}
              setCopied={hooks.setCopied}
            />

            {/* Error Message Section */}
            <ErrorMessageSection
              log={log}
              copied={hooks.copied}
              handleCopyErrorMessage={hooks.handleCopyErrorMessage}
            />

            {/* Timestamps & Status Section */}
            <ErrorStatusSection log={log} formatDate={hooks.formatDate} />

            {/* Recommended Actions Section */}
            {log.status && (
              <ErrorRecommentSection />
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
            onClick={() => {
              if (onMarkResolved && log) {
                onMarkResolved(log);
              }
            }}
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