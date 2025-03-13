import { Box, Typography, Button, Grid } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface HeaderSectionProps {
  isEditMode: boolean;
  handleEditMode: () => void;
  handleSaveChanges: () => void;
  handleCancelEdit: () => void;
}

export function HeaderSection({
  isEditMode,
  handleEditMode,
  handleSaveChanges,
  handleCancelEdit,
}: HeaderSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  return (
    <Grid container spacing={3} justifyContent="space-between">
      <Grid item xs={12} sm={8}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DescriptionIcon sx={{ mr: 1.5, color: accentColor, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="medium" color={textColor}>
            Writing Paragraph
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        {isEditMode ? (
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              sx={{
                bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
                color: "white",
                mr: 1,
                "&:hover": {
                  bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCancelEdit}
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
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditMode}
            sx={{
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
              },
            }}
          >
            Edit Paragraph
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
