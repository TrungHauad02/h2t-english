import { useState } from "react";
import { useParams } from "react-router-dom";
import { aqService } from "../services/aqService";

export default function useAnswerQuestion() {
  const { id, type } = useParams();
  const listAQ = aqService.getQuestionByLessonId(id ?? "", type ?? "");
  const [score, setScore] = useState<number | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const onSubmit = () => {
    setScore(10);
    setIsShowConfirm(false);
  };

  const onReset = () => {
    setScore(null);
    setIsShowExplain(false);
  };

  const onShowExplain = () => {
    setIsShowExplain(!isShowExplain);
  };

  const onShowConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

  return {
    listAQ,
    score,
    isShowExplain,
    isShowConfirm,
    onSubmit,
    onReset,
    onShowExplain,
    onShowConfirm,
  };
}
