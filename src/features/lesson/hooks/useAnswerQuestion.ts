import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers } from "../../../redux/slices/aqSlice";
import { LessonQuestion, QuestionSupportType, RouteNodeEnum } from "interfaces";
import { RootState } from "../../../redux/type";
import { aqService } from "services";
import { completeRouteNode } from "utils/updateProcess";
import useAuth from "hooks/useAuth";

const VALID_TYPES: QuestionSupportType[] = [
  "topics",
  "grammars",
  "listenings",
  "readings",
];

export default function useAnswerQuestion() {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const [listAQ, setListAQ] = useState<LessonQuestion[]>([]);
  const selectedAnswers = useSelector(
    (state: RootState) => state.aq.selectedAnswers
  );
  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (id && type && VALID_TYPES.includes(type as QuestionSupportType)) {
        try {
          const resData = await aqService.findByLessonId(
            parseInt(id),
            type as QuestionSupportType,
            true
          );
          setListAQ(resData.data);
        } catch (error) {
          console.error("Error fetching topics");
        }
      }
    };
    fetchData();
  }, [id, type]);

  useEffect(() => {
    dispatch(clearAnswers());
  }, [dispatch, id, type]);

  const getNumberAnswered = () => {
    return selectedAnswers.length;
  };

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

  const onCompleteRouteNode = async () => {
    if (userId && id && type) {
      let routeNodeType: RouteNodeEnum | null;
      switch (type) {
        case "topics":
          routeNodeType = RouteNodeEnum.VOCABULARY;
          break;
        case "grammars":
          routeNodeType = RouteNodeEnum.GRAMMAR;
          break;
        case "listenings":
          routeNodeType = RouteNodeEnum.LISTENING;
          break;
        case "readings":
          routeNodeType = RouteNodeEnum.READING;
          break;
        default:
          routeNodeType = null;
      }

      if (routeNodeType)
        completeRouteNode(Number(id), Number(userId), routeNodeType);
    }
  };

  const onSubmit = () => {
    const calculatedScore = calculateScore();
    if (calculatedScore === listAQ.length) onCompleteRouteNode();
    const finalScore = calculatedScore + "/" + listAQ.length;
    setScore(finalScore);
    setIsShowConfirm(false);
    setIsShowScoreDialog(true);
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

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  return {
    listAQ,
    score,
    isShowExplain,
    isShowConfirm,
    isShowScoreDialog,
    onSubmit,
    onReset,
    onShowExplain,
    onShowConfirm,
    onCloseScoreDialog,
    getNumberAnswered,
    calculateScore,
  };
}
