import { PreparationMakeSentences } from "interfaces";
import { useEffect, useState } from "react";
import { shuffleArray } from "utils/shuffleArray";
import { WordsState } from "./type";

export default function usePreparationMakeSentences() {
  const data: PreparationMakeSentences[] = [
    {
      id: 1,
      status: true,
      sentences: ["I'm", "sorry."],
    },
    {
      id: 2,
      status: true,
      sentences: ["I can't", "hear you", "very well."],
    },
    {
      id: 3,
      status: true,
      sentences: ["Could", "you", "say", "that", "again, please?"],
    },
    {
      id: 4,
      status: true,
      sentences: ["I", "don't", "understand."],
    },
    {
      id: 5,
      status: true,
      sentences: ["Can", "you repeat", "that", "more slowly,", "please?"],
    },
    {
      id: 6,
      status: true,
      sentences: ["Do", "you", "mean", "the hammer?"],
    },
  ];

  const [words, setWords] = useState<WordsState[]>([]);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  useEffect(() => {
    resetState();
    setNumberOfQuestions(data.length);
  }, []);

  const resetState = () => {
    const newWords = data.map((item) => ({
      id: item.id,
      words: shuffleArray(item.sentences),
      sentences: generateSentences(item.sentences),
    }));
    setWords(newWords);
  };

  const generateSentences = (arr: string[]) => {
    let sentences: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      sentences.push("");
    }
    return sentences;
  };

  const onNext = () => {
    if (curIndex < words.length - 1) {
      setCurIndex(curIndex + 1);
      setSelectedItem(null);
    }
  };

  const onPrev = () => {
    if (curIndex > 0) {
      setCurIndex(curIndex - 1);
      setSelectedItem(null);
    }
  };

  const onSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  const onSelectSentence = (index: number) => {
    const newWords = [...words];
    if (newWords[curIndex].sentences[index] !== "") {
      newWords[curIndex].words.push(newWords[curIndex].sentences[index]);
      newWords[curIndex].sentences[index] = "";
      setWords(newWords);
    }
    if (selectedItem !== null) {
      newWords[curIndex].sentences[index] = selectedItem;
      newWords[curIndex].words = newWords[curIndex].words.filter(
        (item) => item !== selectedItem
      );
      setWords(newWords);
      setSelectedItem(null);
    }
  };

  const getItemRemain = () => {
    let count = 0;
    words.forEach((item) => {
      if (item.words.length > 0) {
        count += 1;
      }
    });
    return count;
  };

  const calculateScore = () => {
    let score = 0;
    words.forEach((item, index) => {
      if (
        item.sentences.every((item, i) => item === data[index].sentences[i])
      ) {
        score += 1;
      }
    });
    return score;
  };

  const onSubmit = () => {
    const finalScore = calculateScore() + "/" + data.length;
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
    const newWords = [...words];
    for (let i = 0; i < newWords.length; i++) {
      newWords[i].words = [];
      newWords[i].sentences = data[i].sentences;
    }
    setWords(newWords);
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  return {
    words,
    curIndex,
    selectedItem,
    score,
    isShowConfirm,
    isShowScoreDialog,
    numberOfQuestions,
    onNext,
    onPrev,
    onSelectItem,
    onSelectSentence,
    getItemRemain,
    onSubmit,
    onReset,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
  };
}
