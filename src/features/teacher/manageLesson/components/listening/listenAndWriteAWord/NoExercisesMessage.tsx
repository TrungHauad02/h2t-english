import React from "react";
import { Box, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface NoExercisesMessageProps {
  isEditMode: boolean;
  onAdd?: () => void;
}

export default function NoExercisesMessage({
  isEditMode,
  onAdd,
}: NoExercisesMessageProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: secondaryBgColor,
        borderRadius: "0.75rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "150px",
      }}
    >
      <AssignmentIcon
        sx={{
          fontSize: 48,
          color: secondaryTextColor,
          mb: 2,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: secondaryTextColor,
          fontWeight: "medium",
          mb: 1,
        }}
      >
        No listening exercises found
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
      >
        {isEditMode
          ? "Click the 'Add Exercise' button to create a new listening exercise."
          : "Click the 'Edit' button to add some exercises."}
      </Typography>
    </Box>
  );
}
