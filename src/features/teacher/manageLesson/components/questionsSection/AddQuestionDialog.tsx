import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useState } from "react";
import { LessonQuestion, LessonAnswer } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AnswersSection, QuestionDetailsSection } from "./editMode";
import { WESaveChangeButtons } from "components/input";

interface AddQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  lessonId: number;
  onQuestionAdded: (newQuestion: LessonQuestion) => void;
}

export default function AddQuestionDialog({
  open,
  onClose,
  lessonId,
  onQuestionAdded,
}: AddQuestionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const [newQuestion, setNewQuestion] = useState<LessonQuestion>({
    id: Date.now(),
    content: "",
    serial: 0,
    explanation: "",
    lessonId: lessonId,
    status: true,
    answers: [
      {
        id: Date.now(),
        content: "",
        correct: false,
        questionId: Date.now(),
        status: true,
      },
    ],
  });

  const handleQuestionChange = (field: keyof LessonQuestion, value: any) => {
    setNewQuestion({ ...newQuestion, [field]: value });
  };

  const handleAnswerChange = (
    index: number,
    field: keyof LessonAnswer,
    value: any
  ) => {
    const newAnswers = [...newQuestion.answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setNewQuestion({ ...newQuestion, answers: newAnswers });
  };

  const addNewAnswer = () => {
    const newAnswer: LessonAnswer = {
      id: Date.now(),
      content: "",
      correct: false,
      questionId: newQuestion.id,
      status: true,
    };
    setNewQuestion({
      ...newQuestion,
      answers: [...newQuestion.answers, newAnswer],
    });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = [...newQuestion.answers];
    newAnswers.splice(index, 1);
    setNewQuestion({ ...newQuestion, answers: newAnswers });
  };

  const handleSave = () => {
    // TODO: Save question
    onQuestionAdded(newQuestion);
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewQuestion({
      id: Date.now(),
      content: "",
      serial: 0,
      explanation: "",
      lessonId: lessonId,
      status: true,
      answers: [
        {
          id: Date.now(),
          content: "",
          correct: false,
          questionId: Date.now(),
          status: true,
        },
      ],
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "1rem",
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: "medium",
          color: isDarkMode ? color.gray100 : color.gray900,
          pt: 3,
          pb: 2,
        }}
      >
        Add New Question
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <Box sx={{ p: 1 }}>
          <QuestionDetailsSection
            editData={newQuestion}
            handleQuestionChange={handleQuestionChange}
            accentColor={accentColor}
            handleSave={handleSave}
          />
          <AnswersSection
            editData={newQuestion}
            handleAnswerChange={handleAnswerChange}
            handleAddAnswer={addNewAnswer}
            handleRemoveAnswer={removeAnswer}
            accentColor={accentColor}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <WESaveChangeButtons
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      </DialogActions>
    </Dialog>
  );
}
