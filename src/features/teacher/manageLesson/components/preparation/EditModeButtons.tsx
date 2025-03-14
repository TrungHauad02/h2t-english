import React from "react";
import { Box, Button } from "@mui/material";
import { Save, Close, Edit } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface EditModeButtonsProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onSaveChanges: () => void;
  onCancelChanges: () => void;
}

export default function EditModeButtons({
  isEditMode,
  onToggleEditMode,
  onSaveChanges,
  onCancelChanges,
}: EditModeButtonsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return isEditMode ? (
    <Box>
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={onSaveChanges}
        sx={{
          bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
          color: "white",
          mr: 1,
        }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        startIcon={<Close />}
        onClick={onCancelChanges}
        sx={{
          borderColor: isDarkMode ? color.red400 : color.red600,
          color: isDarkMode ? color.red400 : color.red600,
        }}
      >
        Cancel
      </Button>
    </Box>
  ) : (
    <Button
      variant="contained"
      startIcon={<Edit />}
      onClick={onToggleEditMode}
      sx={{
        bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
        color: "white",
      }}
    >
      Edit
    </Button>
  );
}
