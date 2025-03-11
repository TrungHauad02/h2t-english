import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ListenAndWriteAWord } from "interfaces";
import {
  EditExerciseDialog,
  ExerciseActionButtons,
  ExerciseList,
  NoExercisesMessage,
  useListenAndWriteExercises,
} from "./listenAndWriteAWord";
import QuizIcon from "@mui/icons-material/Quiz";

export default function ListenAndWriteAWordSection() {
  const { id } = useParams();
  const listeningId = parseInt(id ? id : "0");
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  const hooks = useListenAndWriteExercises(listeningId);

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  const handleEditMode = () => setIsEditMode(true);

  const handleSaveMode = () => {
    // TODO: Save all changes to database
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    hooks.loadData();
    setIsEditMode(false);
  };

  const handleOpenDialog = (item?: ListenAndWriteAWord) => {
    if (item) {
      hooks.setSelectedItem({
        id: item.id,
        audio: item.audio,
        serial: item.serial,
        sentence: item.sentence,
        missingIndex: item.missingIndex,
        correctAnswer: item.correctAnswer,
        status: item.status,
      });
      setIsNewItem(false);
    } else {
      // For new item
      hooks.setSelectedItem({
        audio: "",
        serial:
          hooks.data.length > 0
            ? Math.max(...hooks.data.map((item) => item.serial)) + 1
            : 1,
        sentence: "",
        missingIndex: 0,
        correctAnswer: "",
        status: true,
      });
      setIsNewItem(true);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    hooks.resetSelectedItem();
  };

  const handleSave = () => {
    hooks.handleSaveItem(isNewItem, listeningId);
    handleCloseDialog();
  };

  const onMoveUp = (id: number) => {
    hooks.handleMoveUp(id);
  };

  const onMoveDown = (id: number) => {
    hooks.handleMoveDown(id);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: cardBgColor,
        mt: 4,
        border: `1px solid ${borderColor}`,
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <QuizIcon
            sx={{
              mr: 1.5,
              color: isDarkMode ? color.teal300 : color.teal600,
              fontSize: 28,
            }}
          />
          <Typography variant="h5" fontWeight="medium" color={textColor}>
            Listen and Write a Word Exercises
          </Typography>
        </Box>

        <ExerciseActionButtons
          isEditMode={isEditMode}
          onEdit={handleEditMode}
          onAdd={() => handleOpenDialog()}
          onSave={handleSaveMode}
          onCancel={handleCancelEdit}
          showAddButton={isEditMode}
        />
      </Box>

      {hooks.data.length > 0 ? (
        <ExerciseList
          data={hooks.data}
          isEditMode={isEditMode}
          onEdit={handleOpenDialog}
          onDelete={hooks.handleDeleteItem}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ) : (
        <NoExercisesMessage isEditMode={isEditMode} />
      )}

      <EditExerciseDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        isNewItem={isNewItem}
        selectedItem={hooks.selectedItem}
        onInputChange={hooks.handleInputChange}
        onAudioChange={hooks.handleAudioChange}
      />
    </Box>
  );
}
