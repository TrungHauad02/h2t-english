import { Box, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EditModeButtons from "./EditModeButtons";
import {
  ClassifyGroupCard,
  EditClassifyDialog,
  useClassifySection,
} from "./classify";

interface ClassifySectionProps {
  questions: number[];
  preparationId: number;
  fetchPreparationData: () => void;
}

export default function ClassifySection({
  questions,
  preparationId,
  fetchPreparationData,
}: ClassifySectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useClassifySection(
    questions,
    preparationId,
    fetchPreparationData
  );

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontWeight: "bold",
          }}
        >
          Classification Groups
        </Typography>
        <EditModeButtons
          isEditMode={hooks.isEditMode}
          onToggleEditMode={hooks.handleToggleEditMode}
          onSaveChanges={hooks.handleSaveChanges}
          onCancelChanges={hooks.handleCancelChanges}
        />
      </Box>

      <Grid container spacing={2}>
        {hooks.data.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <ClassifyGroupCard
              item={item}
              isEditMode={hooks.isEditMode}
              onEdit={() => hooks.handleOpenDialog(item)}
              onDelete={() => hooks.handleDelete(item.id)}
            />
          </Grid>
        ))}
      </Grid>

      {hooks.isEditMode && (
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => hooks.handleOpenDialog()}
            sx={{
              backgroundColor: isDarkMode ? color.teal500 : color.teal600,
              color: color.white,
              "&:hover": {
                backgroundColor: isDarkMode ? color.teal600 : color.teal700,
              },
            }}
          >
            Add New Group
          </Button>
        </Box>
      )}

      <EditClassifyDialog
        isDialogOpen={hooks.isDialogOpen}
        editItem={hooks.editItem}
        tempItem={hooks.tempItem}
        setTempItem={hooks.setTempItem}
        handleCloseDialog={hooks.handleCloseDialog}
        handleSaveItem={hooks.handleSaveItem}
        handleInputChange={hooks.handleInputChange}
      />
    </Box>
  );
}
