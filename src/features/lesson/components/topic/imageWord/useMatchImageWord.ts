import { lessonService } from "features/lesson/services/lessonService";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useMatchImageWord() {
  const { id } = useParams();
  const listVocab = lessonService.getVocabularyByTopicId(id ?? "");
  // Luu danh sach tu duoc hien thi (cac tu chua duoc ghep vao hinh anh)
  const [displayWord, setDisplayWord] = useState(
    listVocab.map((item) => item.word)
  );
  // Luu trang thai cac tu da duoc ghep vao hinh anh
  const [imgWordState, setImgWordState] = useState([{ img: "", word: "" }]);
  // Luu trang thai tu duoc chon
  const [selectedWord, setSelectedWord] = useState<string>("");

  const onSelectWord = (word: string) => {
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

  return {
    listVocab,
    displayWord,
    imgWordState,
    selectedWord,
    setDisplayWord,
    setImgWordState,
    setSelectedWord,
    onSelectWord,
    onSelectImage,
    getWordWithImage,
  };
}
