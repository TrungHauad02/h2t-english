import { useState } from "react";
import { useParams } from "react-router-dom";
import { aqService } from "../services/aqService";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers } from "../../../redux/slices/aqSlice";
import { Question } from "interfaces";
import { RootState } from "../../../redux/type";

export default function useAnswerQuestion() {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const listAQ: Question[] = aqService.getQuestionByLessonId(
    id ?? "",
    type ?? ""
  );
  const selectedAnswers = useSelector(
    (state: RootState) => state.aq.selectedAnswers
  );
  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const calculateScore = () => {
    let score = 0;
    listAQ.forEach((item) => {
      const selectedAnswer = selectedAnswers.find(
        (answer) => answer.questionId === item.id
      );
      const correctAnswer = item.answers.find((ans) => ans.correct);
      if (selectedAnswer && selectedAnswer.answerId === correctAnswer?.id) {
        score += 1;
      }
    });
    return score;
  };

  const onSubmit = () => {
    setScore(calculateScore() + "/" + listAQ.length);
    alert("Your score is: " + calculateScore() + "/" + listAQ.length);
    setIsShowConfirm(false);
  };

  const onReset = () => {
    setScore(null);
    setIsShowExplain(false);
    dispatch(clearAnswers());
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
