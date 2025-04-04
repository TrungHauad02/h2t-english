import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  EditSentenceDialog,
  SentenceView,
  useWordsMakeSentencesSection,
} from "./makeSentence";
import EditModeButtons from "./EditModeButtons";

interface WordsMakeSentencesSectionProps {
  questions: number[];
  preparationId: number;
  fetchPreparationData: () => void;
}

export default function WordsMakeSentencesSection({
  questions,
  preparationId,
  fetchPreparationData,
}: WordsMakeSentencesSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = useWordsMakeSentencesSection(
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
          Make sentence from words
        </Typography>
        <EditModeButtons
          isEditMode={hooks.isEditMode}
          onToggleEditMode={hooks.handleToggleEditMode}
          onSaveChanges={hooks.handleSaveChanges}
          onCancelChanges={hooks.handleCancelChanges}
        />
      </Box>
      <SentenceView
        data={hooks.data}
        isEditMode={hooks.isEditMode}
        onEdit={hooks.handleOpenDialog}
        onDelete={hooks.handleDelete}
      />

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
            Add New Sentence
          </Button>
        </Box>
      )}

      {/* Using WEDialog instead of Dialog */}
      <EditSentenceDialog
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
