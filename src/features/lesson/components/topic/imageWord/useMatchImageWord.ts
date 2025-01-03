import { lessonService } from "features/lesson/services/lessonService";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface ImageWord {
  img: string; // Hinh anh hien tai
  word: string; // Tu nguoi dung ghep vao hinh anh
}

export default function useMatchImageWord() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");
  // Luu danh sach tu duoc hien thi (cac tu chua duoc ghep vao hinh anh)
  const [displayWord, setDisplayWord] = useState(
    listVocab.map((item) => item.word)
  );
  // Luu trang thai cac tu da duoc ghep vao hinh anh
  const [imgWordState, setImgWordState] = useState<ImageWord[]>([]);
  // Luu trang thai tu duoc chon
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  const onSelectWord = (word: string) => {
    if (score) return;
    setSelectedWord(word);
  };

  const onSelectImage = (img: string) => {
    // check tu da duoc ghep vao hinh anh chua
    const exits = imgWordState.find((item) => item.img === img);
    if (exits) {
      // xoa tu da duoc ghep vao hinh anh
      setImgWordState((prev) => prev.filter((item) => item.img !== img));
      // them tu chua duoc ghep vao hinh anh
      setDisplayWord((prev) => [...prev, exits.word]);
    }
    if (selectedWord === "") return;
    // them tu chua duoc ghep vao hinh anh
    setImgWordState((prev) => [...prev, { img, word: selectedWord }]);
    // xoa tu chua duoc ghep vao hinh anh
    setDisplayWord((prev) => prev.filter((item) => item !== selectedWord));
    setSelectedWord("");
  };

  const getWordWithImage = (word: string) => {
    // tim tu cua hinh anh hien tai
    return imgWordState.find((item) => item.img === word);
  };

  const getNumberAnswered = () => {
    return imgWordState.length;
  };

  const calculateScore = () => {
    let score = 0;
    imgWordState.forEach((item) => {
      if (item.word === item.img) {
        score += 1;
      }
    });
    return score;
  };

  const onSubmit = () => {
    const finalScore = calculateScore() + "/" + listVocab.length;
    setScore(finalScore);
    setIsShowConfirm(false);
    setIsShowScoreDialog(true);
  };

  const resetState = () => {
    setSelectedWord("");
    setDisplayWord(listVocab.map((item) => item.word));
    setImgWordState([]);
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
    resetState();
    setIsShowExplain(!isShowExplain);
  };

  const onCloseScoreDialog = () => {
    setIsShowScoreDialog(false);
  };

  return {
    score,
    listVocab,
    displayWord,
    imgWordState,
    selectedWord,
    isShowExplain,
    isShowConfirm,
    isShowScoreDialog,
    setDisplayWord,
    setImgWordState,
    setSelectedWord,
    onSelectWord,
    onSelectImage,
    getWordWithImage,
    onSubmit,
    onReset,
    onShowConfirm,
    onShowExplain,
    onCloseScoreDialog,
    getNumberAnswered,
  };
}
