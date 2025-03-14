import { PreparationMakeSentences } from "interfaces";
import { useEffect, useState } from "react";

const mockData: PreparationMakeSentences[] = [
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

export default function useWordsMakeSentencesSection(questionIds: number[]) {
  const [data, setData] = useState<PreparationMakeSentences[]>([]);
  const [editItem, setEditItem] = useState<PreparationMakeSentences | null>(
    null
  );
  const [tempItem, setTempItem] = useState<PreparationMakeSentences>({
    id: 0,
    status: true,
    sentences: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleOpenDialog = (item?: PreparationMakeSentences) => {
    if (item) {
      setEditItem(item);
      setTempItem({
        id: item.id,
        status: item.status,
        sentences: item.sentences,
      });
    } else {
      setEditItem(null);
      setTempItem({
        id: 0,
        status: true,
        sentences: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTempItem({
      id: 0,
      status: true,
      sentences: [],
    });
    setEditItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setTempItem({
      ...tempItem,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSaveItem = () => {
    if (!tempItem.sentences) return;

    if (editItem) {
      const updatedData = data.map((item) =>
        item.id === editItem.id
          ? { ...item, sentences: tempItem.sentences }
          : item
      );
      setData(updatedData);
    } else {
      const newItem: PreparationMakeSentences = {
        id: Math.max(...data.map((item) => item.id), 0) + 1,
        status: tempItem.status,
        sentences: tempItem.sentences,
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
