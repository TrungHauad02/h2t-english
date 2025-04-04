import { useState, useEffect } from "react";
import { ListenAndWriteAWord } from "interfaces";
import { listeningExercisesService } from "services/lesson/listeningExercisesService";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] =
    useState<FormValues>(defaultFormValues);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedData = await listeningExercisesService.findByListeningId(
        listeningId
      );
      setData(fetchedData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load exercises. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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

  const handleSaveItem = async (isNewItem: boolean, listeningId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isNewItem) {
        // Add new item
        const newItem: ListenAndWriteAWord = {
          id:
            Math.max(
              ...(data.length > 0 ? data.map((item) => item.id || 0) : [0])
            ) + 1,
          status: selectedItem.status,
          audio: selectedItem.audio,
          serial: selectedItem.serial,
          sentence: selectedItem.sentence,
          missingIndex: selectedItem.missingIndex,
          correctAnswer: selectedItem.correctAnswer,
          listeningId: listeningId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Save new item to database
        const createdItem = await listeningExercisesService.create(newItem);
        setData([...data, createdItem]);
      } else {
        // Update existing item
        if (!selectedItem.id) return;

        const updatedItem: ListenAndWriteAWord = {
          id: selectedItem.id,
          audio: selectedItem.audio,
          serial: selectedItem.serial,
          sentence: selectedItem.sentence,
          missingIndex: selectedItem.missingIndex,
          correctAnswer: selectedItem.correctAnswer,
          status: selectedItem.status,
          listeningId: listeningId,
          updatedAt: new Date(),
          createdAt:
            data.find((item) => item.id === selectedItem.id)?.createdAt ||
            new Date(),
        };

        // Update item in database
        await listeningExercisesService.update(selectedItem.id, updatedItem);

        const updatedData = data.map((item) =>
          item.id === selectedItem.id ? updatedItem : item
        );

        setData(updatedData);
      }
    } catch (err) {
      console.error("Failed to save item:", err);
      setError("Failed to save exercise. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Delete item from database
      await listeningExercisesService.remove(id);

      // Update local state
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete exercise. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSerialNumbers = async (updatedData: ListenAndWriteAWord[]) => {
    try {
      // Update all items with new serial numbers
      for (const item of updatedData) {
        await listeningExercisesService.patch(item.id || 0, {
          serial: item.serial,
        });
      }
    } catch (err) {
      console.error("Failed to update serial numbers:", err);
      setError("Failed to reorder exercises. Please try again later.");
    }
  };

  const handleMoveUp = async (id: number) => {
    const index = data.findIndex((item) => item.id === id);
    if (index <= 0) return;

    try {
      setIsLoading(true);
      setError(null);

      const newData = [...data];
      [newData[index], newData[index - 1]] = [
        newData[index - 1],
        newData[index],
      ];

      const updatedData = newData.map((item, idx) => ({
        ...item,
        serial: idx + 1,
      }));

      setData(updatedData);
      await updateSerialNumbers(updatedData);
    } catch (err) {
      // If error occurs, reload original data
      loadData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoveDown = async (id: number) => {
    const index = data.findIndex((item) => item.id === id);
    if (index >= data.length - 1) return;

    try {
      setIsLoading(true);
      setError(null);

      const newData = [...data];
      [newData[index], newData[index + 1]] = [
        newData[index + 1],
        newData[index],
      ];

      const updatedData = newData.map((item, idx) => ({
        ...item,
        serial: idx + 1,
      }));

      setData(updatedData);
      await updateSerialNumbers(updatedData);
    } catch (err) {
      // If error occurs, reload original data
      loadData();
    } finally {
      setIsLoading(false);
    }
  };

  const saveAllChanges = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Update all items with their current state
      for (const item of data) {
        await listeningExercisesService.update(item.id || 0, item);
      }

      return true;
    } catch (err) {
      console.error("Failed to save all changes:", err);
      setError("Failed to save all changes. Please try again later.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
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
    saveAllChanges,
  };
}
