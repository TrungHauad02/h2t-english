import { Box } from "@mui/material";
import { LessonQuestion, LessonAnswer } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AnswersSection, QuestionDetailsSection } from "./editMode";
import { WESaveChangeButtons } from "components/input";
import { useState } from "react";
import { WEConfirmDelete } from "components/display";

interface QuestionEditModeProps {
  editData: LessonQuestion;
  setEditData: (data: LessonQuestion) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export function QuestionEditMode({
  editData,
  setEditData,
  handleSave,
  handleCancel,
}: QuestionEditModeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleQuestionChange = (field: keyof LessonQuestion, value: any) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleOpenDeleteDialog = (index: number) => {
    const id = editData.answers[index].id;
    if (id === -1) {
      handleDelete();
      return;
    }
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleAnswerChange = (
    index: number,
    field: keyof LessonAnswer,
    value: any
  ) => {
    const newAnswers = [...editData.answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setEditData({ ...editData, answers: newAnswers });
  };

  const addNewAnswer = () => {
    const newAnswer: LessonAnswer = {
      id: -1,
      content: "",
      correct: false,
      questionId: editData.id,
      status: true,
    };
    setEditData({ ...editData, answers: [...editData.answers, newAnswer] });
  };

  const handleDelete = () => {
    // TODO: Remove in db
    const newAnswers = [...editData.answers];
    newAnswers.splice(
      newAnswers.findIndex((a) => a.id === deleteId),
      1
    );
    setEditData({ ...editData, answers: newAnswers });
    setOpenDeleteDialog(false);
    setDeleteId(null);
    setIsDeleting(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <QuestionDetailsSection
        editData={editData}
        handleQuestionChange={handleQuestionChange}
        accentColor={accentColor}
        handleSave={handleSave}
      />

      <AnswersSection
        editData={editData}
        handleAnswerChange={handleAnswerChange}
        handleAddAnswer={addNewAnswer}
        handleRemoveAnswer={handleOpenDeleteDialog}
        accentColor={accentColor}
      />

      <WESaveChangeButtons
        handleSave={handleSave}
        handleCancel={handleCancel}
      />

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={editData.answers.find((a) => a.id === deleteId)?.content}
      />
    </Box>
  );
}
