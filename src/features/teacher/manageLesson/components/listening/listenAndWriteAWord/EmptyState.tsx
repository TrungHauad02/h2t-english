import { Box, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface EmptyStateProps {
  onAddClick: () => void;
  isEditMode: boolean;
}

export default function EmptyState({
  onAddClick,
  isEditMode,
}: EmptyStateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 3,
        borderRadius: "12px",
        backgroundColor: isDarkMode ? color.gray700 : color.gray100,
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: isDarkMode ? color.gray600 : color.gray300,
      }}
    >
      <Box
        sx={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: isDarkMode ? color.teal800 : color.teal100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            color: isDarkMode ? color.teal200 : color.teal700,
          }}
        >
          🎧
        </Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: isDarkMode ? color.white : color.gray900,
        }}
      >
        No Listen and Write Exercises Yet
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{
          mb: 4,
          maxWidth: 500,
          color: isDarkMode ? color.gray400 : color.gray600,
        }}
      >
        These exercises help students practice listening comprehension by
        identifying missing words in sentences.
      </Typography>

      {isEditMode && (
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onAddClick}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: color.teal600,
            "&:hover": {
              backgroundColor: color.teal700,
            },
            px: 3,
            py: 1,
          }}
        >
          Add First Exercise
        </Button>
      )}
    </Box>
  );
}
