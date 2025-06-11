import { useState } from "react";
import { LessonQuestion, LessonAnswer, QuestionSupportType } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AnswersSection, QuestionDetailsSection } from "./editMode";
import { WEDialog } from "components/display";
import { aqService, questionServiceFactory } from "services";
import { validateQuestion } from "./validateQuestion";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { toast } from "react-toastify";

interface AddQuestionDialogProps {
  type: QuestionSupportType;
  questions: number[];
  open: boolean;
  onClose: () => void;
  lessonId: number;
  fetchData: () => void;
}

export default function AddQuestionDialog({
  type,
  questions, // Use to update questions field
  open,
  onClose,
  lessonId,
  fetchData,
}: AddQuestionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  const questionService = questionServiceFactory(type);

  const emptyQuestion: LessonQuestion = {
    id: Date.now(),
    content: "",
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
  };

  const [newQuestion, setNewQuestion] = useState<LessonQuestion>(emptyQuestion);

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

  const handleSave = async () => {
    // Save question
    // Validate before saving
    if (!validateQuestion(newQuestion, showError)) {
      return; // Stop save process if validation fails
    }
    try {
      const resData = await aqService.create(newQuestion);

      const newQuestions = [...questions, resData.data.id];
      await questionService.updateQuestions(lessonId, newQuestions);

      //  Display success
      toast.success("Question updated successfully");
    } catch (error) {
      // Display error using our error component
      showError({
        message: "Error creating question",
        severity: "error",
        details: extractErrorMessages(error),
      });
      console.error("Error creating question:", error);
    }
    fetchData();
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewQuestion(emptyQuestion);
  };

  return (
    <WEDialog
      open={open}
      title="Add New Question"
      onCancel={handleCancel}
      onOk={handleSave}
      sx={{ maxWidth: "md", width: "100%" }}
    >
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
    </WEDialog>
  );
}
