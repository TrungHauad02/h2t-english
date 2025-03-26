import { useState, useEffect } from "react";
import { Writing, WritingAnswer } from "interfaces";

interface UseWritingParagraphSectionProps {
  editData: Writing | null;
  handleInputChange: (field: keyof Writing, value: any) => void;
  onSave: () => void;
}

export default function useWritingParagraphSection({
  editData,
  handleInputChange,
  onSave,
}: UseWritingParagraphSectionProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [paragraph, setParagraph] = useState<string>("");
  const [answers, setAnswers] = useState<WritingAnswer[]>([]);
  const [originalData, setOriginalData] = useState<{
    paragraph: string;
    answers: WritingAnswer[];
  }>({
    paragraph: "",
    answers: [],
  });

  useEffect(() => {
    if (editData) {
      setParagraph(editData.paragraph || "");
      const fetchedAnswers = editData.questions.map((questionId) => {
        const answerData = {
          id: questionId,
          status: true,
          missingIndex: 0,
          correctAnswer: "",
          writingId: editData.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as WritingAnswer;

        if (questionId === 1) {
          answerData.missingIndex = 3;
          answerData.correctAnswer = "fox";
        } else if (questionId === 2) {
          answerData.missingIndex = 17;
          answerData.correctAnswer = "alphabet";
        }

        return answerData;
      });

      setAnswers(fetchedAnswers);
      setOriginalData({
        paragraph: editData.paragraph || "",
        answers: [...fetchedAnswers],
      });
    }
  }, [editData]);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = () => {
    if (editData) {
      handleInputChange("paragraph", paragraph);
      const questionIds = answers.map((answer) => answer.id);
      handleInputChange("questions", questionIds);
    }

    setOriginalData({
      paragraph,
      answers: [...answers],
    });

    onSave();
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setParagraph(originalData.paragraph);
    setAnswers([...originalData.answers]);
    setIsEditMode(false);
  };

  const handleAddAnswer = () => {
    const words = paragraph.split(" ");
    // Tính toán chỉ số missingIndex cho câu trả lời mới
    let newMissingIndex = words.length;
    const newAnswer: WritingAnswer = {
      id: Date.now(),
      status: true,
      missingIndex: newMissingIndex,
      correctAnswer: "",
      writingId: editData?.id || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Đảm bảo không có chỉ số trùng lặp
    while (answers.some((answer) => answer.missingIndex === newMissingIndex)) {
      newMissingIndex++;
    }

    newAnswer.missingIndex = newMissingIndex;
    setAnswers([...answers, newAnswer]);
  };

  const handleAnswerChange = (
    index: number,
    field: keyof WritingAnswer,
    value: any
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      [field]: field === "missingIndex" ? parseInt(value) : value,
      updatedAt: new Date(),
    };

    const missingIndex = updatedAnswers[index].missingIndex;
    const words = paragraph.split(" ");

    if (missingIndex < 0 || missingIndex > words.length) {
      updatedAnswers[index].missingIndex = Math.max(
        0,
        Math.min(missingIndex, words.length)
      );
    }

    while (
      updatedAnswers.some(
        (answer, idx) =>
          idx !== index &&
          answer.missingIndex === updatedAnswers[index].missingIndex
      )
    ) {
      updatedAnswers[index].missingIndex++;
    }

    setAnswers(updatedAnswers);
  };

  const handleDeleteAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const renderParagraphPreview = () => {
    if (!paragraph) return null;

    const words = paragraph.split(" ");
    const sortedAnswers = [...answers].sort(
      (a, b) => a.missingIndex - b.missingIndex
    );

    let modifiedWords = [...words];
    const highlightPositions: { [key: number]: boolean } = {};
    let offset = 0;

    sortedAnswers.forEach((answer) => {
      const insertPosition = answer.missingIndex + offset;
      if (insertPosition <= modifiedWords.length && answer.correctAnswer) {
        modifiedWords.splice(insertPosition, 0, answer.correctAnswer);
        highlightPositions[insertPosition] = true;
        offset++;
      }
    });

    return {
      modifiedWords,
      highlightPositions,
    };
  };

  return {
    isEditMode,
    paragraph,
    answers,
    originalData,
    setParagraph,
    handleEditMode,
    handleSaveChanges,
    handleCancelEdit,
    handleAddAnswer,
    handleAnswerChange,
    handleDeleteAnswer,
    renderParagraphPreview,
  };
}
