import React, { useState, useEffect } from "react";
import { PreparationMatchWordSentences } from "interfaces";

const mockData: PreparationMatchWordSentences[] = [
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

export default function useMatchWordWithSentenceSection(questions: number[]) {
  const [data, setData] = useState<PreparationMatchWordSentences[]>([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] =
    useState<PreparationMatchWordSentences | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempItem, setTempItem] = useState<
    Partial<PreparationMatchWordSentences>
  >({
    word: "",
    sentence: "",
    status: true,
  });

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleOpenDialog = (item?: PreparationMatchWordSentences) => {
    if (item) {
      setEditItem(item);
      setTempItem({
        word: item.word,
        sentence: item.sentence,
        status: item.status,
      });
    } else {
      setEditItem(null);
      setTempItem({
        word: "",
        sentence: "",
        status: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTempItem({
      word: "",
      sentence: "",
      status: true,
    });
    setEditItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempItem({
      ...tempItem,
      [name]: value,
    });
  };

  const handleSaveItem = () => {
    if (!tempItem.word || !tempItem.sentence) return;

    if (editItem) {
      const updatedData = data.map((item) =>
        item.id === editItem.id
          ? { ...item, word: tempItem.word!, sentence: tempItem.sentence! }
          : item
      );
      setData(updatedData);
    } else {
      const newItem: PreparationMatchWordSentences = {
        id: Math.max(...data.map((item) => item.id), 0) + 1,
        word: tempItem.word!,
        sentence: tempItem.sentence!,
        status: true,
      };
      setData([...data, newItem]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSaveChanges = () => {
    // TODO: Save changes
    setIsEditMode(false);
  };

  const handleCancelChanges = () => {
    setIsEditMode(false);
  };

  return {
    data,
    isEditMode,
    isDialogOpen,
    tempItem,
    editItem,
    setTempItem,
    handleToggleEditMode,
    handleOpenDialog,
    handleCloseDialog,
    handleSaveItem,
    handleDelete,
    handleSaveChanges,
    handleCancelChanges,
    handleInputChange,
  };
}
