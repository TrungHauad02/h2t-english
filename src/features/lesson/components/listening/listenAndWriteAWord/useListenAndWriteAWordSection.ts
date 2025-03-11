import { ListenAndWriteAWord } from "interfaces";
import { useEffect, useState } from "react";

interface Sentence {
  id: number;
  sentence: string[];
  correctAnswer: string;
  userAnswer: string;
  audio: string;
  serial: number;
}

export default function useListenAndWriteAWordSection() {
  const mockData: ListenAndWriteAWord[] = [
    {
      id: 1,
      status: true,
      audio: "/basic_listening.mp3",
      serial: 1,
      sentence: "I to eat an apple a day.",
      missingIndex: 1,
      correctAnswer: "like",
      listeningId: 1,
    },
    {
      id: 2,
      status: true,
      audio: "/basic_listening.mp3",
      serial: 2,
      sentence: "like to eat an apple a day.",
      missingIndex: 0,
      correctAnswer: "I",
      listeningId: 1,
    },
  ];

  const [curIndex, setCurIndex] = useState<number>(0);
  const [stateData, setStateData] = useState<Sentence[]>([]);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    setCurIndex(0);
    mockData.forEach((item) => console.log(item.sentence.split(" ")));
    setStateData(
      mockData.map((item) => ({
        id: item.id,
        sentence: [
          ...item.sentence.split(" ").slice(0, item.missingIndex),
          "",
          ...item.sentence.split(" ").slice(item.missingIndex),
        ],
        correctAnswer: item.correctAnswer,
        userAnswer: "",
        audio: item.audio,
        serial: item.serial,
      }))
    );
  };

  const onChangeAnswer = (answer: string) => {
    setStateData((prevState) => {
      return prevState.map((item, index) => {
        if (index === curIndex) {
          return { ...item, userAnswer: answer };
        }
        return item;
      });
    });
  };

  const onPrev = () => {
    if (curIndex > 0) {
      setCurIndex(curIndex - 1);
    }
  };

  const onNext = () => {
    if (curIndex < stateData.length - 1) {
      setCurIndex(curIndex + 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    stateData.forEach((item) => {
      if (item.userAnswer === item.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const onSubmit = () => {
    const finalScore = calculateScore() + "/" + stateData.length;
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
    setStateData((prevState) => {
      return prevState.map((item, index) => {
        return { ...item, userAnswer: item.correctAnswer };
      });
    });
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  const getItemRemain = () => {
    let count = 0;
    stateData.forEach((item) => {
      if (item.userAnswer.length === 0) {
        count += 1;
      }
    });
    return count;
  };

  return {
    curIndex,
    stateData,
    score,
    isShowConfirm,
    isShowScoreDialog,
    onChangeAnswer,
    onPrev,
    onNext,
    onSubmit,
    onReset,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
    getItemRemain,
  };
}
