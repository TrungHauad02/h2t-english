import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TopicActionsProps {
  status: boolean;
  isEditMode: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function TopicActions({
  status,
  isEditMode,
  onSave,
  onCancel,
}: TopicActionsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 3,
        gap: 2,
      }}
    >
      {isEditMode ? (
        <>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={onSave}
            sx={{
              backgroundColor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? color.emerald500
                  : color.emerald700,
              },
            }}
          >
            Save Changes
          </Button>
          <Button
            startIcon={<CancelIcon />}
            variant="outlined"
            onClick={onCancel}
            sx={{
              borderColor: isDarkMode ? color.gray400 : color.gray500,
              color: isDarkMode ? color.gray400 : color.gray500,
              "&:hover": {
                borderColor: isDarkMode ? color.errorDarkMode : color.error,
                color: isDarkMode ? color.errorDarkMode : color.error,
              },
            }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          startIcon={status ? <WarningAmberIcon /> : <VerifiedIcon />}
          variant="contained"
          sx={{
            backgroundColor: status
              ? isDarkMode
                ? color.gray600
                : color.gray500
              : isDarkMode
              ? color.emerald400
              : color.emerald600,
            color: "white",
            "&:hover": {
              backgroundColor: status
                ? isDarkMode
                  ? color.gray700
                  : color.gray600
                : isDarkMode
                ? color.emerald500
                : color.emerald700,
            },
          }}
        >
          {status ? "Deactivate" : "Activate"}
        </Button>
      )}
    </Box>
  );
}
