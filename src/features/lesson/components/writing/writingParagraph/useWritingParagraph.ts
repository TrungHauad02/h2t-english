import { useState } from "react";
import { WritingAnswer } from "interfaces";
import {
  createMissingWordMap,
  splitParagraphIntoWords,
} from "features/lesson/utils/writingUtils";

export default function useWritingParagraph(
  paragraph: string,
  writingAnswer: WritingAnswer[]
) {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const words = splitParagraphIntoWords(paragraph);
  const missingWordMap = createMissingWordMap(writingAnswer);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const resetState = () => {
    setUserAnswers({});
    setScore(null);
  };

  const calculateScore = () => {
    let score = 0;
    writingAnswer.forEach((answer) => {
      const userAnswer = userAnswers[answer.missingIndex];
      if (userAnswer?.toLowerCase() === answer.correctAnswer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  const onSubmit = () => {
    const finalScore = calculateScore() + "/" + writingAnswer.length;
    setScore(finalScore);
    setIsShowConfirm(false);
    setIsShowScoreDialog(true);
  };

  const onReset = () => {
    setScore(null);
    setIsShowExplain(false);
    setIsShowConfirm(false);
    setIsShowScoreDialog(false);
    resetState();
  };

  const onShowConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

  const onShowExplain = () => {
    if (isShowExplain) {
      resetState();
    } else {
      showResult();
    }
    setIsShowExplain(!isShowExplain);
  };

  const showResult = () => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      writingAnswer.forEach((answer) => {
        newAnswers[answer.missingIndex] = answer.correctAnswer;
      });
      return newAnswers;
    });
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  const getNumberAnswered = () => {
    return Object.keys(userAnswers).length;
  };

  return {
    words,
    missingWordMap,
    userAnswers,
    score,
    isShowConfirm,
    isShowScoreDialog,
    handleInputChange,
    onSubmit,
    onReset,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
    getNumberAnswered,
  };
}
