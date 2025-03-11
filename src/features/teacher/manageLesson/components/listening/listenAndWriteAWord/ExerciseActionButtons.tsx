import React from "react";
import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ExerciseActionButtonsProps {
  isEditMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAdd?: () => void;
  showAddButton?: boolean;
}

export default function ExerciseActionButtons({
  isEditMode,
  onEdit,
  onSave,
  onCancel,
  onAdd,
  showAddButton = false,
}: ExerciseActionButtonsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (isEditMode) {
    return (
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        alignItems={"center"}
      >
        {showAddButton && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              mr: 1,
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
              },
            }}
          >
            Add Exercise
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          sx={{
            bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
            color: "white",
            mr: 1,
            "&:hover": {
              bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
            },
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={onCancel}
          sx={{
            borderColor: isDarkMode ? color.red400 : color.red600,
            color: isDarkMode ? color.red400 : color.red600,
            "&:hover": {
              borderColor: isDarkMode ? color.red500 : color.red700,
              bgcolor: "rgba(220, 38, 38, 0.04)",
            },
          }}
        >
          Cancel
        </Button>
      </Stack>
    );
  }

  return (
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      onClick={onEdit}
      sx={{
        bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
        color: "white",
        "&:hover": {
          bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
        },
      }}
    >
      Edit Exercises
    </Button>
  );
}
