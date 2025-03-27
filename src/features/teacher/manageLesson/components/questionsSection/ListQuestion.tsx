import React, { useState } from "react";
import { Stack, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { LessonQuestion } from "interfaces";
import useColor from "theme/useColor";
import { QuestionEditMode } from "./QuestionEditMode";
import { QuestionViewMode } from "./QuestionViewMode";
import { aqService } from "../../services/aqService";
import { useErrors } from "hooks/useErrors";

interface ListQuestionProps {
  isEditMode: boolean;
  data: LessonQuestion[];
  fetchData: () => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export default function ListQuestion({
  isEditMode,
  data,
  fetchData,
  onMoveUp,
  onMoveDown,
}: ListQuestionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<LessonQuestion | null>(null);
  const { showError } = useErrors();

  // Validate the question before saving
  const validateQuestion = (question: LessonQuestion): boolean => {
    // Check if there's exactly one correct answer
    const correctAnswersCount = question.answers.filter(
      (answer) => answer.correct === true
    ).length;

    if (correctAnswersCount !== 1) {
      showError({
        message: "Question must have exactly 1 correct answer",
        severity: "error",
        details: `Found ${correctAnswersCount} correct answers. Please mark exactly one answer as correct for question: "${question.content.substring(
          0,
          50
        )}${question.content.length > 50 ? "..." : ""}"`,
      });
      return false;
    }

    return true;
  };

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
      if (!validateQuestion(editData)) {
        return; // Stop save process if validation fails
      }

      try {
        // Save question, answer info
        await aqService.updateQuestion(editData.id, editData);
        fetchData();

        // Clear edit state
        setEditMode(null);
        setEditData(null);
      } catch (error) {
        // Display error using our error component
        showError({
          message: "Error updating question",
          severity: "error",
          details: error instanceof Error ? error.message : String(error),
        });
        console.error("Error updating question:", error);
      }
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
              total={data.length}
            />
          )}
        </Card>
      ))}
    </Stack>
  );
}
