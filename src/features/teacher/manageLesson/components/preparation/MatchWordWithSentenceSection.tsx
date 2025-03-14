import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  EditDialog,
  WordSentenceTable,
  useMatchWordWithSentenceSection,
} from "./matchWordSentence";
import EditModeButtons from "./EditModeButtons";

interface MatchWordWithSentenceSectionProps {
  questions: number[];
}

export default function MatchWordWithSentenceSection({
  questions,
}: MatchWordWithSentenceSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = useMatchWordWithSentenceSection(questions);

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
          Match Word with Sentence
        </Typography>

        <EditModeButtons
          isEditMode={hooks.isEditMode}
          onToggleEditMode={hooks.handleToggleEditMode}
          onSaveChanges={hooks.handleSaveChanges}
          onCancelChanges={hooks.handleCancelChanges}
        />
      </Box>

      <WordSentenceTable
        data={hooks.data}
        isEditMode={hooks.isEditMode}
        onEdit={hooks.handleOpenDialog}
        onDelete={hooks.handleDelete}
      />

      {hooks.isEditMode && (
        <Box>
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
            Add New
          </Button>
        </Box>
      )}

      {/* Using WEDialog instead of Dialog */}
      <EditDialog
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
