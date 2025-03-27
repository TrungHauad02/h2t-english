import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ErrorPanelHeaderProps {
  errorCount: number;
  onClearAll: () => void;
  onClose: () => void;
}

export default function ErrorPanelHeader({
  errorCount,
  onClearAll,
  onClose,
}: ErrorPanelHeaderProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: isDarkMode ? colors.gray800 : colors.gray100,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: isDarkMode ? colors.gray200 : colors.gray800 }}
        >
          {errorCount === 0 ? "No Errors" : `Errors (${errorCount})`}
        </Typography>
        <Box>
          {errorCount > 0 && (
            <IconButton
              size="small"
              onClick={onClearAll}
              sx={{
                mr: 1,
                color: isDarkMode ? colors.gray400 : colors.gray600,
              }}
            >
              <DeleteSweepIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider
        sx={{
          backgroundColor: isDarkMode ? colors.gray700 : colors.gray300,
        }}
      />
    </>
  );
}
