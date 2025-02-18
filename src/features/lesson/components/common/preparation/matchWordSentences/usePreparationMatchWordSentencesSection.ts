import { PreparationMatchWordSentences } from "interfaces";
import { useEffect, useState } from "react";
import { shuffleArray } from "utils/shuffleArray";

interface SentenceWord {
  id: number;
  word: string | null;
  sentence: string;
}

export default function usePreparationMatchWordSentencesSection() {
  const data: PreparationMatchWordSentences[] = [
    {
      id: 1,
      status: true,
      word: "apple",
      sentence: "I like to eat an apple a day.",
    },
    {
      id: 2,
      status: true,
      word: "banana",
      sentence: "I like to eat a banana a day.",
    },
    {
      id: 3,
      status: true,
      word: "cherry",
      sentence: "I like to eat a cherry a day.",
    },
    {
      id: 4,
      status: true,
      word: "date",
      sentence: "I like to eat a date a day.",
    },
    {
      id: 5,
      status: true,
      word: "elderberry",
      sentence: "I like to eat an elderberry a day.",
    },
    {
      id: 6,
      status: true,
      word: "fig",
      sentence: "I like to eat a fig a day.",
    },
    {
      id: 7,
      status: true,
      word: "grape",
      sentence: "I like to eat a grape a day.",
    },
    {
      id: 8,
      status: true,
      word: "honeydew",
      sentence: "I like to eat a honeydew a day.",
    },
    {
      id: 9,
      status: true,
      word: "kiwi",
      sentence: "I like to eat a kiwi a day.",
    },
  ];

  const [words, setWords] = useState<string[]>([]);
  const [sentences, setSentences] = useState<SentenceWord[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [numberOfItems, setNumberOfItems] = useState(0);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  useEffect(() => {
    resetState();
    setNumberOfItems(data.length);
  }, []);

  const onSelectItem = (item: string) => {
    if (item === selectedItem) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
  };

  const onSelectSentence = (sentence: SentenceWord) => {
    const updatedSentences = sentences.map((item) => {
      if (item.id === sentence.id) {
        // TH đang có item trong ô
        let updatedWords = [...words];
        if (item.word) {
          updatedWords.push(item.word);
          setWords(updatedWords);
        }
        // TH đang chọn 1 item
        if (selectedItem) {
          updatedWords = updatedWords.filter((item) => item !== selectedItem);
          setWords(updatedWords);
          setSelectedItem(null);
          return {
            ...item,
            word: selectedItem,
          };
        }
        return {
          ...item,
          word: null,
        };
      }
      return item;
    });
    setSentences(updatedSentences);
  };

  const calculateScore = () => {
    const itemMap = new Map(data.map((item) => [item.id, item.word]));

    let score = 0;
    sentences.forEach((sentence) => {
      const item = itemMap.get(sentence.id);
      if (item && sentence.word === item) {
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

  const resetState = () => {
    setWords(shuffleArray(data.map((item) => item.word)));
    const newSentences = data.map((item) => ({
      id: item.id,
      word: null,
      sentence: item.sentence,
    }));
    setSentences(newSentences);
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
    const newSentences = data.map((item) => ({
      id: item.id,
      word: item.word,
      sentence: item.sentence,
    }));
    setWords([]);
    setSentences(newSentences);
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  const getNumberAnswered = () => {
    return data.length - words.length;
  };

  return {
    words,
    sentences,
    selectedItem,
    score,
    isShowConfirm,
    isShowScoreDialog,
    numberOfItems,
    onSelectItem,
    onSelectSentence,
    onSubmit,
    onReset,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
    getNumberAnswered,
  };
}
