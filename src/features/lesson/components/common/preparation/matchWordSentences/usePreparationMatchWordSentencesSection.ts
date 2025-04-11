import { PreparationMatchWordSentences } from "interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { preparationMatchWordSentencesService } from "services";
import { shuffleArray } from "utils/shuffleArray";

interface SentenceWord {
  id: number;
  word: string | null;
  sentence: string;
}

export default function usePreparationMatchWordSentencesSection(
  questions: number[]
) {
  const [data, setData] = useState<PreparationMatchWordSentences[]>([]);

  const [words, setWords] = useState<string[]>([]);
  const [sentences, setSentences] = useState<SentenceWord[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [numberOfItems, setNumberOfItems] = useState(0);

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (questions.length > 0) {
        try {
          const promises = questions.map((questionId) =>
            preparationMatchWordSentencesService.findById(questionId)
          );
          const responses = await Promise.all(promises);

          const validData = responses
            .filter(
              (response) => response.status === "SUCCESS" && response.data
            )
            .map((response) => response.data);
          setData(validData);
        } catch (error) {
          toast.error("Error fetching preparation data");
        }
      }
    };
    fetchData();
  }, [questions]);

  useEffect(() => {
    resetState();
    setNumberOfItems(data.length);
  }, [data]);

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
