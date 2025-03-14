import { PreparationClassify } from "interfaces";
import { useEffect, useState } from "react";

const mockData: PreparationClassify[] = [
  {
    id: 1,
    groupName: "Fruits",
    members: [
      "Apple",
      "Banana",
      "Orange",
      "Grapes",
      "Strawberry",
      "Pineapple",
      "Watermelon",
      "Mango",
      "Kiwi",
    ],
    status: true,
  },
  {
    id: 2,
    groupName: "Vegetables",
    members: [
      "Carrot",
      "Broccoli",
      "Spinach",
      "Tomato",
      "Cucumber",
      "Bell Pepper",
      "Potato",
      "Onion",
      "Lettuce",
      "Zucchini",
    ],
    status: true,
  },
];

export default function useClassifySection(questionIds: number[]) {
  const [data, setData] = useState<PreparationClassify[]>([]);
  const [editItem, setEditItem] = useState<PreparationClassify | null>(null);
  const [tempItem, setTempItem] = useState<PreparationClassify>({
    id: 0,
    groupName: "",
    members: [],
    status: true,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleOpenDialog = (item?: PreparationClassify) => {
    setIsDialogOpen(true);
    if (item) {
      setEditItem(item);
      setTempItem({
        id: item.id,
        groupName: item.groupName,
        members: item.members,
        status: item.status,
      });
    } else {
      setEditItem(null);
      setTempItem({
        id: 0,
        groupName: "",
        members: [],
        status: true,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTempItem({
      id: 0,
      groupName: "",
      members: [],
      status: true,
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
    if (!tempItem.groupName || !tempItem.members) return;

    if (editItem) {
      const updatedData = data.map((item) =>
        item.id === editItem.id
          ? {
              ...item,
              groupName: tempItem.groupName,
              members: tempItem.members,
              status: tempItem.status,
            }
          : item
      );
      setData(updatedData);
    } else {
      const newItem: PreparationClassify = {
        id: Math.max(...data.map((item) => item.id), 0) + 1,
        groupName: tempItem.groupName,
        members: tempItem.members,
        status: tempItem.status,
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
