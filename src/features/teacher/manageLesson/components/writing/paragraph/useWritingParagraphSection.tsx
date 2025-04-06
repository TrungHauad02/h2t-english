import { useState, useEffect } from "react";
import { Writing, WritingAnswer } from "interfaces";
import { writingAnswerService, writingService } from "services";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { useErrors } from "hooks/useErrors";

interface UseWritingParagraphSectionProps {
  editData: Writing | null;
}

export default function useWritingParagraphSection({
  editData,
}: UseWritingParagraphSectionProps) {
  const { showError } = useErrors();
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

  const fetchAnswers = async () => {
    if (editData) {
      try {
        if (editData.id) {
          const response = await writingAnswerService.findByWritingId(
            editData.id
          );
          setAnswers(response.data);
          setOriginalData({
            paragraph: editData.paragraph || "",
            answers: [...response.data],
          });
        }
      } catch (error) {
        showError({
          message: "Error fetching writing answers",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    }
  };

  useEffect(() => {
    if (editData) setParagraph(editData.paragraph || "");
    fetchAnswers();
  }, [editData]);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = async () => {
    if (editData) {
      const resData = await writingService.patch(editData.id, {
        paragraph,
      });
      setParagraph(resData.data.paragraph);

      // Save each answer to API
      try {
        // For existing answers, update them
        for (const answer of answers) {
          if (answer.id > 0) {
            await writingAnswerService.update(answer.id, answer);
          } else {
            // For new answers, create them
            await writingAnswerService.create(answer);
          }
        }

        // Handle deleted answers (answers in originalData but not in current answers)
        const currentAnswerIds = answers.map((a) => a.id);
        const originalAnswerIds = originalData.answers.map((a) => a.id);
        const deletedAnswerIds = originalAnswerIds.filter(
          (id) => !currentAnswerIds.includes(id)
        );

        for (const id of deletedAnswerIds) {
          if (id > 0) {
            await writingAnswerService.remove(id);
          }
        }

        setOriginalData({
          paragraph,
          answers: [...answers],
        });

        fetchAnswers();
        setIsEditMode(false);
      } catch (error) {
        showError({
          message: "Error saving writing answers",
          severity: "error",
          details: extractErrorMessages(error),
        });
      }
    }
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
      id: 0,
      status: true,
      missingIndex: newMissingIndex,
      correctAnswer: "",
      writingId: editData?.id || 0,
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
