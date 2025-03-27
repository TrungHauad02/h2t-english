import React, { useState } from "react";
import { Stack, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { LessonQuestion, QuestionSupportType } from "interfaces";
import useColor from "theme/useColor";
import { QuestionEditMode } from "./QuestionEditMode";
import { QuestionViewMode } from "./QuestionViewMode";
import { aqService } from "../../services/aqService";
import { useErrors } from "hooks/useErrors";
import { validateQuestion } from "./validateQuestion";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { WEConfirmDelete } from "components/display";
import { useParams } from "react-router-dom";
import { topicService } from "../../services/topicService";
import { toast } from "react-toastify";

interface ListQuestionProps {
  questions: number[];
  type: QuestionSupportType;
  isEditMode: boolean;
  data: LessonQuestion[];
  fetchData: () => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export default function ListQuestion({
  questions,
  type,
  isEditMode,
  data,
  fetchData,
  onMoveUp,
  onMoveDown,
}: ListQuestionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<LessonQuestion | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showError } = useErrors();

  const handleEdit = (questionId: number) => {
    const question = data.find((q) => q.id === questionId);
    if (question) {
      setEditData({ ...question, answers: [...question.answers] });
      setEditMode(questionId);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditData(null);
  };

  const handleSave = async () => {
    if (editData) {
      // Validate before saving
      if (!validateQuestion(editData, showError)) {
        return; // Stop save process if validation fails
      }

      try {
        // Save question, answer info
        await aqService.updateQuestion(editData.id, editData);
        fetchData();
        toast.success("Question updated successfully");

        // Clear edit state
        setEditMode(null);
        setEditData(null);
      } catch (error) {
        // Display error using our error component
        showError({
          message: "Error updating question",
          severity: "error",
          details: extractErrorMessages(error),
        });
        console.error("Error updating question:", error);
      }
    }
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Delete id:", deleteId);
      await aqService.deleteQuestion(deleteId!);
      switch (type) {
        case "topics":
          await topicService.patchTopic(id ? parseInt(id) : 0, {
            questions: questions.filter((id) => id !== deleteId),
          });
          break;
        // TODO: Handle other types
        default:
          break;
      }
      setDeleteId(null);
      fetchData();
    } catch (error) {
      showError({
        message: "Error deleting question",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error deleting question:", error);
    } finally {
      handleCloseDeleteDialog();
      setIsDeleting(false);
    }
  };

  return (
    <Stack spacing={3}>
      {data.map((question, index) => (
        <Card
          key={question.id}
          sx={{
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
            borderRadius: "1rem",
            overflow: "visible",
            boxShadow: isDarkMode
              ? "0 4px 8px rgba(0,0,0,0.2)"
              : "0 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          {editMode === question.id ? (
            <QuestionEditMode
              editData={editData!}
              setEditData={setEditData}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <QuestionViewMode
              index={index}
              question={question}
              handleEdit={handleEdit}
              isEditMode={isEditMode}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              handleDeleteDialog={handleOpenDeleteDialog}
              total={data.length}
            />
          )}
        </Card>
      ))}
      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        resourceName={data.find((q) => q.id === deleteId)?.content}
      />
    </Stack>
  );
}
