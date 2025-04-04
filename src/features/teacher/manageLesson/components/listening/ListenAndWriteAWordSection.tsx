import { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { ListenAndWriteAWord, ServiceResponse } from "interfaces";
import { listeningExercisesService } from "services/lesson/listeningExercisesService";
import {
  EmptyState,
  ExerciseList,
  SectionHeader,
  ExerciseDialog,
} from "./listenAndWriteAWord";
import { WEConfirmDelete } from "components/display";
import { useParams } from "react-router-dom";

export default function ListenAndWriteAWordSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const { id } = useParams();

  const [exercises, setExercises] = useState<ListenAndWriteAWord[]>([]);
  const [originalExercises, setOriginalExercises] = useState<
    ListenAndWriteAWord[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currentExercise, setCurrentExercise] =
    useState<ListenAndWriteAWord | null>(null);
  const [exerciseToDelete, setExerciseToDelete] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasSerialChanges, setHasSerialChanges] = useState<boolean>(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const resData = await listeningExercisesService.findByListeningId(
          parseInt(id || "")
        );

        if (resData.status === "SUCCESS") {
          setExercises(resData.data);
          setOriginalExercises(JSON.parse(JSON.stringify(resData.data)));
        }
      } catch (error) {
        showError({
          message: "Error fetching listening exercises",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [id]);

  // Check if serials have changed compared to original
  useEffect(() => {
    if (originalExercises.length === 0) return;

    const hasChanges = exercises.some((ex) => {
      const original = originalExercises.find((o) => o.id === ex.id);
      return original && original.serial !== ex.serial;
    });

    setHasSerialChanges(hasChanges);
  }, [exercises, originalExercises]);

  const handleToggleEditMode = () => {
    if (isEditMode && hasSerialChanges) {
      // If exiting edit mode with unsaved changes, reset to original
      setExercises(JSON.parse(JSON.stringify(originalExercises)));
      setHasSerialChanges(false);
    }
    setIsEditMode(!isEditMode);
  };

  const handleAddExercise = () => {
    // Create a new empty exercise with default values and next serial number
    const newSerial =
      exercises.length > 0
        ? Math.max(...exercises.map((ex) => ex.serial)) + 1
        : 1;

    setCurrentExercise({
      id: 0,
      status: true,
      serial: newSerial,
      audio: "",
      sentence: "",
      missingIndex: 0,
      correctAnswer: "",
      listeningId: parseInt(id || ""),
    });
    setOpenDialog(true);
  };

  const handleEditExercise = (exercise: ListenAndWriteAWord) => {
    setCurrentExercise(exercise);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentExercise(null);
  };

  const handleDeleteClick = (id: number) => {
    setExerciseToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setExerciseToDelete(null);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;

    const sortedExercises = [...exercises].sort((a, b) => a.serial - b.serial);
    const currentItem = sortedExercises[index];
    const prevItem = sortedExercises[index - 1];

    // Swap serial numbers
    const updatedExercises = exercises.map((ex) => {
      if (ex.id === currentItem.id) {
        return { ...ex, serial: prevItem.serial };
      }
      if (ex.id === prevItem.id) {
        return { ...ex, serial: currentItem.serial };
      }
      return ex;
    });

    setExercises(updatedExercises);
  };

  const handleMoveDown = (index: number) => {
    const sortedExercises = [...exercises].sort((a, b) => a.serial - b.serial);
    if (index >= sortedExercises.length - 1) return;

    const currentItem = sortedExercises[index];
    const nextItem = sortedExercises[index + 1];

    // Swap serial numbers
    const updatedExercises = exercises.map((ex) => {
      if (ex.id === currentItem.id) {
        return { ...ex, serial: nextItem.serial };
      }
      if (ex.id === nextItem.id) {
        return { ...ex, serial: currentItem.serial };
      }
      return ex;
    });

    setExercises(updatedExercises);
  };

  const handleSaveSerialChanges = async () => {
    if (!hasSerialChanges) return;

    try {
      setIsSaving(true);

      // Find exercises with changed serials
      const changedExercises = exercises.filter((ex) => {
        const original = originalExercises.find((o) => o.id === ex.id);
        return original && original.serial !== ex.serial;
      });

      // Create patch requests for each changed exercise
      const updatePromises = changedExercises.map((exercise) => {
        return listeningExercisesService.patch(exercise.id, {
          serial: exercise.serial,
        });
      });

      const results = await Promise.all(updatePromises);

      // Check if all updates were successful
      const allSuccessful = results.every((res) => res.status === "SUCCESS");

      if (allSuccessful) {
        // Update original exercises to match current state
        setOriginalExercises(JSON.parse(JSON.stringify(exercises)));
        setHasSerialChanges(false);
      } else {
        throw new Error("Some updates failed");
      }
    } catch (error) {
      showError({
        message: "Error updating exercise order",
        severity: "error",
        details: extractErrorMessages(error),
      });
      // Reset to original state on error
      setExercises(JSON.parse(JSON.stringify(originalExercises)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveExercise = async (exercise: ListenAndWriteAWord) => {
    try {
      let response: ServiceResponse<ListenAndWriteAWord>;

      if (exercise.id === 0) {
        // Create new exercise
        response = await listeningExercisesService.create(exercise);
        if (response.status === "SUCCESS" && response.data) {
          const updatedExercises = [...exercises, response.data];
          setExercises(updatedExercises);
          setOriginalExercises(JSON.parse(JSON.stringify(updatedExercises)));
        } else {
          throw new Error(response.message || "Failed to create exercise");
        }
      } else {
        // Update existing exercise
        response = await listeningExercisesService.update(
          exercise.id,
          exercise
        );
        if (response.status === "SUCCESS" && response.data) {
          const updatedExercises = exercises.map((ex) =>
            ex.id === response.data.id ? response.data : ex
          );
          setExercises(updatedExercises);
          setOriginalExercises(JSON.parse(JSON.stringify(updatedExercises)));
        } else {
          throw new Error(response.message || "Failed to update exercise");
        }
      }

      // Close dialog and refresh list
      setOpenDialog(false);
      setCurrentExercise(null);
    } catch (error) {
      showError({
        message: "Error saving listening exercise",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  const handleDeleteExercise = async () => {
    if (exerciseToDelete === null) return;

    try {
      const response = await listeningExercisesService.remove(exerciseToDelete);
      if (response.status === "SUCCESS") {
        const updatedExercises = exercises.filter(
          (ex) => ex.id !== exerciseToDelete
        );
        setExercises(updatedExercises);
        setOriginalExercises(JSON.parse(JSON.stringify(updatedExercises)));
        handleCloseDeleteDialog();
      } else {
        throw new Error(response.message || "Failed to delete exercise");
      }
    } catch (error) {
      showError({
        message: "Error deleting listening exercise",
        severity: "error",
        details: extractErrorMessages(error),
      });
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        mt: 4,
        mb: 4,
        p: 3,
        borderRadius: "16px",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        transition: "background-color 0.3s ease",
      }}
    >
      <SectionHeader
        title="Listen And Write A Word Exercises"
        subtitle="Practice listening by filling in missing words from sentences"
        icon="🔤"
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
        onSave={handleSaveSerialChanges}
        isSaving={isSaving}
        hasChanges={hasSerialChanges}
      />

      <Divider sx={{ my: 2 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Typography>Loading exercises...</Typography>
        </Box>
      ) : exercises.length === 0 ? (
        <EmptyState onAddClick={handleAddExercise} isEditMode={isEditMode} />
      ) : (
        <Box sx={{ mt: 3 }}>
          <ExerciseList
            exercises={exercises}
            isEditMode={isEditMode}
            onEdit={handleEditExercise}
            onDelete={handleDeleteClick}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />

          {isEditMode && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddExercise}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: color.teal600,
                  "&:hover": {
                    backgroundColor: color.teal700,
                  },
                }}
              >
                Add New Exercise
              </Button>
            </Stack>
          )}
        </Box>
      )}

      {openDialog && currentExercise && (
        <ExerciseDialog
          open={openDialog}
          exercise={currentExercise}
          onClose={handleCloseDialog}
          onSave={handleSaveExercise}
        />
      )}

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteExercise}
        resourceName={`Exercise #${
          exercises.find((ex) => ex.id === exerciseToDelete)?.serial || ""
        }`}
        title="Delete Exercise"
        description="Are you sure you want to delete this exercise? This action cannot be undone."
      />
    </Box>
  );
}
