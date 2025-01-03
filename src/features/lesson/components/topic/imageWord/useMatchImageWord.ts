import { lessonService } from "features/lesson/services/lessonService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { shuffleArray } from "utils/shuffleArray";

export interface ImageWord {
  img: string; // Hình ảnh hiện tại
  word: string; // Từ người dùng ghép vào hình ảnh
}

export default function useMatchImageWord() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");

  // Lưu danh sách từ được hiển thị (các từ chưa được ghép vào hình ảnh) và trộn ngẫu nhiên
  const [displayWord, setDisplayWord] = useState<string[]>(
    shuffleArray(listVocab.map((item) => item.word))
  );

  // Lưu trạng thái các từ đã được ghép vào hình ảnh
  const [imgWordState, setImgWordState] = useState<ImageWord[]>([]);

  // Lưu trạng thái từ được chọn
  const [selectedWord, setSelectedWord] = useState<string>("");

  const [score, setScore] = useState<string | null>(null);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isShowScoreDialog, setIsShowScoreDialog] = useState(false);

  const onSelectWord = (word: string) => {
    console.log(word);
    if (score) return;
    setSelectedWord(word);
  };

  const onSelectImage = (img: string) => {
    // Kiểm tra từ đã được ghép vào hình ảnh chưa
    const exists = imgWordState.find((item) => item.img === img);
    if (exists) {
      // Xóa từ đã được ghép vào hình ảnh
      setImgWordState((prev) => prev.filter((item) => item.img !== img));
      // Thêm từ chưa được ghép vào hình ảnh
      setDisplayWord((prev) => [...prev, exists.word]);
    }
    if (selectedWord === "") return;
    // Thêm từ chưa được ghép vào hình ảnh
    setImgWordState((prev) => [...prev, { img, word: selectedWord }]);
    // Xóa từ đã được ghép vào hình ảnh
    setDisplayWord((prev) => prev.filter((item) => item !== selectedWord));
    setSelectedWord("");
  };

  const getWordWithImage = (word: string) => {
    // Tìm từ của hình ảnh hiện tại
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
    setDisplayWord(shuffleArray(listVocab.map((item) => item.word)));
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
