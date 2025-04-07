import { Stack, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Question } from "interfaces";
import useColor from "theme/useColor";
import { useState } from "react";
import { QuestionEditMode } from "./QuestionEditMode";
import { QuestionViewMode } from "./QuestionViewMode";

interface ListQuestionProps {
  data: Question[];
  setData: (data: Question[]) => void;
}

export default function ListQuestion({ data, setData }: ListQuestionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editData, setEditData] = useState<Question | null>(null);

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

  const handleSave = () => {
    if (editData) {
      const newData = data.map((q) => (q.id === editData.id ? editData : q));
      setData(newData);
      setEditMode(null);
      setEditData(null);
    }
  };

  return (
    <Stack spacing={3}>
      {data.map((question) => (
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
            <QuestionViewMode question={question} handleEdit={handleEdit} />
          )}
        </Card>
      ))}
    </Stack>
  );
}
