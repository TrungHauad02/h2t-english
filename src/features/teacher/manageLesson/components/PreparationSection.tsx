import { useState, useEffect } from "react";
import { Box, Divider, Paper, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import QuizIcon from "@mui/icons-material/Quiz";
import SectionHeader from "./common/SectionHeader";
import {
  PreparationDetailsView,
  PreparationEditForm,
  TypeChangeConfirmationDialog,
} from "./preparation";
import usePreparationSection from "../hooks/usePreparationSection";
import { PreparationType } from "interfaces";
import { toast } from "react-toastify";

interface PreparationSectionProps {
  preparationId: number | null;
  type: "readings" | "speakings" | "listenings" | "writings";
}

export default function PreparationSection({
  preparationId,
  type,
}: PreparationSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const hooks = usePreparationSection(preparationId, type);

  const [showTypeChangeDialog, setShowTypeChangeDialog] =
    useState<boolean>(false);
  const [originalType, setOriginalType] = useState<PreparationType | null>(
    null
  );
  const [newType, setNewType] = useState<PreparationType | null>(null);
  const [lastTypeChange, setLastTypeChange] = useState<PreparationType | null>(
    null
  );

  // Effect to capture original type when data is loaded
  useEffect(() => {
    if (hooks.data && hooks.data.type) {
      setOriginalType(hooks.data.type);
    }
  }, [hooks.data]);

  // Effect to show notification when type changes
  useEffect(() => {
    if (hooks.editData && lastTypeChange !== hooks.editData.type) {
      if (lastTypeChange !== null && hooks.editData.type !== lastTypeChange) {
        toast.info(
          "Title and tip have been updated to match the new preparation type"
        );
      }
      setLastTypeChange(hooks.editData.type);
    }
  }, [hooks.editData?.type, lastTypeChange]);

  // Handler for saving changes with type change detection
  const handleSaveWithTypeCheck = () => {
    if (!hooks.editData || !hooks.data) return;

    // Check if type has changed
    if (
      originalType !== null &&
      hooks.editData.type !== originalType &&
      hooks.data.questions &&
      hooks.data.questions.length > 0
    ) {
      // Show confirmation dialog if type changed and there are existing questions
      setNewType(hooks.editData.type);
      setShowTypeChangeDialog(true);
    } else {
      // No type change or no questions, proceed with save
      hooks.handleSaveChanges();
    }
  };

  // Handler for confirmed type change
  const handleConfirmTypeChange = () => {
    setShowTypeChangeDialog(false);
    hooks.handleSaveChanges();
  };

  // Handler for canceled type change
  const handleCancelTypeChange = () => {
    setShowTypeChangeDialog(false);
    // Revert type change in edit data
    if (hooks.editData && originalType !== null) {
      hooks.handleInputChange("type", originalType);
    }
  };

  // Show loading state
  if (hooks.isLoading) {
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
          }}
        />
      </Box>
    );
  }

  if (!hooks.data) {
    return <></>;
  }

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mt: 4,
        position: "relative",
      }}
    >
      {/* Type change confirmation dialog */}
      {originalType !== null && newType !== null && (
        <TypeChangeConfirmationDialog
          open={showTypeChangeDialog}
          onCancel={handleCancelTypeChange}
          onConfirm={handleConfirmTypeChange}
          oldType={originalType}
          newType={newType}
        />
      )}

      {/* Loading overlay */}
      {hooks.isSaving && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            borderRadius: "1rem",
          }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: isDarkMode ? color.teal300 : color.teal600,
            }}
          />
        </Box>
      )}

      <SectionHeader
        icon={<QuizIcon />}
        title={preparationId ? "Preparation Section" : "New Preparation"}
        isEditMode={hooks.isEditMode}
        handleSaveChanges={handleSaveWithTypeCheck}
        handleEditMode={hooks.handleEditMode}
        handleCancelEdit={hooks.handleCancelEdit}
      />

      {hooks.isEditMode ? (
        <PreparationEditForm
          editData={hooks.editData}
          handleInputChange={hooks.handleInputChange}
        />
      ) : (
        <PreparationDetailsView data={hooks.data} />
      )}

      <Divider />
      {hooks.renderPreparation()}
    </Box>
  );
}
