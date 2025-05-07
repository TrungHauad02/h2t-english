import {
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Stack,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog } from "interfaces";

interface ErrorLogHeaderDetailsDialogProps {
  open: boolean;
  log: ErrorLog;
  onClose: () => void;
  severityInfo: {
    color: string;
    label: string;
    bgColor: string;
  };
}

export default function ErrorLogHeaderDetailsDialog({
  open,
  log,
  onClose,
  severityInfo,
}: ErrorLogHeaderDetailsDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <DialogTitle
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        backgroundColor: isDarkMode
          ? alpha(color.gray800, 0.7)
          : alpha(color.gray50, 0.7),
        backdropFilter: "blur(8px)",
      }}
    >
      <Box sx={{ maxWidth: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.gray100 : color.gray900,
            mb: 1,
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          Error Log Details
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Chip
            size="small"
            label={severityInfo.label}
            sx={{
              backgroundColor: severityInfo.bgColor,
              color: severityInfo.color,
              fontWeight: 500,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />

          <Chip
            size="small"
            label={log.status ? "Active" : "Resolved"}
            sx={{
              backgroundColor: log.status
                ? isDarkMode
                  ? alpha(color.error, 0.2)
                  : color.red100
                : isDarkMode
                ? alpha(color.success, 0.2)
                : color.green100,
              color: log.status
                ? isDarkMode
                  ? color.errorDarkMode
                  : color.error
                : isDarkMode
                ? color.successDarkMode
                : color.success,
              fontWeight: 500,
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Stack>
      </Box>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          color: isDarkMode ? color.gray400 : color.gray500,
          alignSelf: { xs: "flex-end", sm: "flex-start" },
          "&:hover": {
            backgroundColor: isDarkMode
              ? alpha(color.gray700, 0.5)
              : alpha(color.gray200, 0.5),
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}
