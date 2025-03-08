import { Box } from "@mui/material";
import { LessonQuestion, LessonAnswer } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AnswersSection, QuestionDetailsSection } from "./editMode";
import { WESaveChangeButtons } from "components/input";

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

  const handleQuestionChange = (field: keyof LessonQuestion, value: any) => {
    setEditData({ ...editData, [field]: value });
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
      id: Date.now(),
      content: "",
      correct: false,
      questionId: editData.id,
      status: true,
    };
    setEditData({ ...editData, answers: [...editData.answers, newAnswer] });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = [...editData.answers];
    newAnswers.splice(index, 1);
    setEditData({ ...editData, answers: newAnswers });
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
        handleRemoveAnswer={removeAnswer}
        accentColor={accentColor}
      />

      <WESaveChangeButtons
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </Box>
  );
}
