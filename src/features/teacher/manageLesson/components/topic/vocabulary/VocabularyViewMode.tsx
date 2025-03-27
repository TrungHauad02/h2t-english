import { Card, Stack, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";
import VocabularyImageSection from "./VocabularyImageSection";
import VocabularyContentSection from "./VocabularyContentSection";
import { useState } from "react";
import { WEConfirmDelete } from "components/display";
import { useErrors } from "hooks/useErrors";
import { vocabService } from "features/teacher/manageLesson/services/vocabService";
import { toast } from "react-toastify";
import { extractErrorMessages } from "utils/extractErrorMessages";

interface VocabularyViewModeProps {
  vocabulary: Vocabulary;
  isEditMode: boolean;
  handleEdit: (id: number) => void;
  fetchData: () => void;
}

export default function VocabularyViewMode({
  vocabulary,
  isEditMode,
  handleEdit,
  fetchData,
}: VocabularyViewModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { showError } = useErrors();

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    // Remove in db
    try {
      setIsDeleting(true);
      await vocabService.deleteVocab(vocabulary.id);
      fetchData();
      toast.success("Vocab deleted successfully");
    } catch (error) {
      // Display error
      showError({
        message: "Error deleting vocab",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting vocab");
    } finally {
      setIsDeleting(false);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <Card
      sx={{
        bgcolor: isDarkMode ? color.gray800 : color.gray50,
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.2)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
      }}
    >
      {/* Image section */}
      <VocabularyImageSection
        image={vocabulary.image}
        word={vocabulary.word}
        wordType={vocabulary.wordType}
        status={vocabulary.status}
      />

      {/* Content section */}
      <Stack spacing={2} sx={{ p: 1, flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 1 }}
        >
          <Typography variant="h6" fontWeight="bold">
            {vocabulary.word}
          </Typography>
          {isEditMode && (
            <Stack direction={"row"} spacing={1}>
              <IconButton
                onClick={handleOpenDeleteDialog}
                sx={{
                  color: isDarkMode ? color.red400 : color.red600,
                  mt: 1,
                  bgcolor: isDarkMode ? color.gray600 : color.gray100,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray500 : color.gray300,
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => handleEdit(vocabulary.id)}
                sx={{
                  color: accentColor,
                  bgcolor: isDarkMode ? color.gray600 : color.gray100,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.gray500 : color.gray300,
                  },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        <VocabularyContentSection
          phonetic={vocabulary.phonetic}
          meaning={vocabulary.meaning}
          example={vocabulary.example}
        />
      </Stack>

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={vocabulary.word}
      />
    </Card>
  );
}
