import { useState, useEffect } from "react";
import { WritingAnswer } from "interfaces";

export default function useWritingParagraph(
  paragraph: string,
  writingAnswers: WritingAnswer[]
) {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [isShowExplain, setIsShowExplain] = useState<boolean>(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState<boolean>(false);
  const [score, setScore] = useState<string | null>(null);
  const [sortedAnswers, setSortedAnswers] = useState<WritingAnswer[]>([]);

  useEffect(() => {
    if (writingAnswers?.length > 0) {
      // Sort the answers by missingIndex
      const sorted = [...writingAnswers].sort(
        (a, b) => a.missingIndex - b.missingIndex
      );
      setSortedAnswers(sorted);
    }
  }, [writingAnswers]);

  const handleInputChange = (missingIndex: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [missingIndex]: value,
    }));
  };

  const getNumberAnswered = () => {
    return Object.keys(userAnswers).length;
  };

  const onShowConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

  const onShowExplain = () => {
    setIsShowExplain(!isShowExplain);
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  const onReset = () => {
    setUserAnswers({});
    setScore(null);
    setIsShowExplain(false);
  };

  const onSubmit = () => {
    setIsShowConfirm(false);

    // Calculate score
    let correctCount = 0;
    writingAnswers.forEach((answer) => {
      const userAnswer = userAnswers[answer.missingIndex]?.trim().toLowerCase();
      const correctAnswer = answer.correctAnswer.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        correctCount++;
      }
    });

    // Calculate percentage score
    const totalScore =
      writingAnswers.length > 0
        ? Math.round((correctCount / writingAnswers.length) * 100)
        : 0;

    setScore(totalScore + "/" + writingAnswers.length);
    setIsShowScoreDialog(true);
  };

  const renderParagraphWithBlanks = () => {
    if (!paragraph) return null;

    const words = paragraph.split(" ");
    const displayWords = [...words];
    let offset = 0;

    sortedAnswers.forEach((answer) => {
      const insertPosition = answer.missingIndex + offset;
      if (insertPosition <= displayWords.length) {
        // Insert blank space for missing word
        displayWords.splice(insertPosition, 0, `blank_${answer.missingIndex}`);
        offset++;
      }
    });

    return {
      displayWords,
    };
  };

  return {
    userAnswers,
    sortedAnswers,
    isShowConfirm,
    isShowExplain,
    isShowScoreDialog,
    score,
    handleInputChange,
    getNumberAnswered,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
    onReset,
    onSubmit,
    renderParagraphWithBlanks,
  };
}
