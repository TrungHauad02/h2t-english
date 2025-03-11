import { useState, useEffect } from "react";
import { ListenAndWriteAWord } from "interfaces";
import { listenAndWriteAWordService } from "../../../services/listenAndWriteAWordService";

interface FormValues {
  id?: number;
  audio: string;
  serial: number;
  sentence: string;
  missingIndex: number;
  correctAnswer: string;
  status: boolean;
}

const defaultFormValues: FormValues = {
  audio: "",
  serial: 1,
  sentence: "",
  missingIndex: 0,
  correctAnswer: "",
  status: true,
};

export function useListenAndWriteExercises(listeningId: number) {
  const [data, setData] = useState<ListenAndWriteAWord[]>([]);
  const [selectedItem, setSelectedItem] =
    useState<FormValues>(defaultFormValues);

  const loadData = () => {
    const fetchedData =
      listenAndWriteAWordService.getListenAndWriteAWordByListeningId(
        listeningId
      );
    setData(fetchedData);
  };

  useEffect(() => {
    loadData();
  }, [listeningId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle numeric inputs
    if (name === "serial" || name === "missingIndex") {
      setSelectedItem({
        ...selectedItem,
        [name]: parseInt(value) || 0,
      });
    } else {
      setSelectedItem({
        ...selectedItem,
        [name]: value,
      });
    }
  };

  const handleAudioChange = (base64: string) => {
    setSelectedItem({
      ...selectedItem,
      audio: base64,
    });
  };

  const resetSelectedItem = () => {
    setSelectedItem(defaultFormValues);
  };

  const handleSaveItem = (isNewItem: boolean, listeningId: number) => {
    if (isNewItem) {
      // Add new item
      const newItem: ListenAndWriteAWord = {
        id: Math.max(...data.map((item) => item.id), 0) + 1,
        status: true,
        audio: selectedItem.audio,
        serial: selectedItem.serial,
        sentence: selectedItem.sentence,
        missingIndex: selectedItem.missingIndex,
        correctAnswer: selectedItem.correctAnswer,
        listeningId: listeningId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // TODO: Save new item to database
      setData([...data, newItem]);
    } else {
      // Update existing item
      const updatedData = data.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              audio: selectedItem.audio,
              serial: selectedItem.serial,
              sentence: selectedItem.sentence,
              missingIndex: selectedItem.missingIndex,
              correctAnswer: selectedItem.correctAnswer,
              updatedAt: new Date(),
            }
          : item
      );

      // TODO: Update item in database
      setData(updatedData);
    }
  };

  const handleDeleteItem = (id: number) => {
    // TODO: Delete item from database
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleMoveUp = (id: number) => {
    const index = data.findIndex((item) => item.id === id);
    if (index <= 0) return;

    const newData = [...data];
    [newData[index], newData[index - 1]] = [newData[index - 1], newData[index]];
    const updatedData = newData.map((item, idx) => ({
      ...item,
      serial: idx + 1,
    }));
    setData(updatedData);
  };

  const handleMoveDown = (id: number) => {
    const index = data.findIndex((item) => item.id === id);
    if (index >= data.length - 1) return;

    const newData = [...data];
    [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
    const updatedData = newData.map((item, idx) => ({
      ...item,
      serial: idx + 1,
    }));
    setData(updatedData);
  };

  return {
    data,
    selectedItem,
    setSelectedItem,
    handleSaveItem,
    handleDeleteItem,
    handleInputChange,
    handleAudioChange,
    resetSelectedItem,
    loadData,
    handleMoveUp,
    handleMoveDown,
  };
}
