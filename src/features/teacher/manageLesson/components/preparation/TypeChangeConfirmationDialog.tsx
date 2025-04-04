import React from "react";
import { PreparationType } from "interfaces";
import { Typography, Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import WarningIcon from "@mui/icons-material/Warning";
import { WEDialog } from "components/display";

interface TypeChangeConfirmationDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  oldType: PreparationType;
  newType: PreparationType;
}

export default function TypeChangeConfirmationDialog({
  open,
  onCancel,
  onConfirm,
  oldType,
  newType,
}: TypeChangeConfirmationDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Warning message for type change
  const WARNING_MESSAGE =
    "Changing the preparation type will delete all previously added questions and content. This action cannot be undone.";

  // Function to get readable type name
  const getTypeName = (type: PreparationType): string => {
    switch (type) {
      case PreparationType.MATCH_WORD_WITH_SENTENCES:
        return "Match Word with Sentences";
      case PreparationType.CLASSIFY:
        return "Classify";
      case PreparationType.WORDS_MAKE_SENTENCES:
        return "Words Make Sentences";
      default:
        return "Unknown Type";
    }
  };

  return (
    <WEDialog
      open={open}
      title="Confirm Type Change"
      onCancel={onCancel}
      onOk={onConfirm}
      sx={{
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isDarkMode
              ? `${color.red700}30`
              : `${color.red200}90`,
            p: 2,
            borderRadius: 1,
            mb: 1,
          }}
        >
          <WarningIcon
            sx={{
              color: isDarkMode ? color.warningDarkMode : color.warning,
              mr: 1,
              fontSize: 28,
            }}
          />
          <Typography
            sx={{
              color: isDarkMode ? color.red300 : color.red700,
              fontWeight: 500,
            }}
          >
            {WARNING_MESSAGE}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray700,
          }}
        >
          You are changing the preparation type:
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray600,
            }}
          >
            From:
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.teal300 : color.teal600,
              p: 1,
              borderRadius: 0.5,
              backgroundColor: isDarkMode
                ? `${color.gray700}80`
                : `${color.gray200}80`,
            }}
          >
            {getTypeName(oldType)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray600,
            }}
          >
            To:
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.emerald300 : color.emerald600,
              p: 1,
              borderRadius: 0.5,
              backgroundColor: isDarkMode
                ? `${color.gray700}80`
                : `${color.gray200}80`,
            }}
          >
            {getTypeName(newType)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray500,
            mt: 1,
            fontStyle: "italic",
          }}
        >
          Are you sure you want to proceed with this change?
        </Typography>
      </Box>
    </WEDialog>
  );
}
