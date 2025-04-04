import { useState, useEffect } from "react";
import { PreparationClassify } from "interfaces";
import { preparationClassifyService } from "services";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { preparationService } from "services";

interface ServiceResponse {
  status: string;
  data: PreparationClassify;
  message: string;
}

export default function useClassifySection(
  questionIds: number[],
  preparationId: number,
  fetchPreparationData: () => void
) {
  const [data, setData] = useState<PreparationClassify[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState<PreparationClassify | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempItem, setTempItem] = useState<PreparationClassify>({
    id: 0,
    groupName: "",
    members: [],
    status: true,
  });

  const { showError } = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = questionIds.map((questionId) =>
          preparationClassifyService.findById(questionId)
        );

        const responses = (await Promise.all(promises)) as ServiceResponse[];

        // Lọc các response thành công và trích xuất data
        const validData = responses
          .filter((response) => response.status === "SUCCESS" && response.data)
          .map((response) => response.data);

        setData(validData);
      } catch (error) {
        console.error("Error fetching classification data:", error);
        showError({
          message: "Error fetching classification data",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setLoading(false);
      }
    };

    if (questionIds.length > 0) {
      fetchData();
    }
  }, [questionIds]);

  // Hàm cập nhật trường questions của preparation
  const updatePreparationQuestions = async (newQuestionIds: number[]) => {
    try {
      await preparationService.patch(preparationId, {
        questions: newQuestionIds,
      });
      fetchPreparationData();
    } catch (error) {
      console.error("Error updating preparation questions:", error);
      showError({
        message: "Error updating preparation questions",
        severity: "error",
        details: extractErrorMessages(error),
      });
      throw error; // Ném lỗi để xử lý ở hàm gọi
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleOpenDialog = (item?: PreparationClassify) => {
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
    setIsDialogOpen(true);
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

  const handleSaveItem = async () => {
    if (!tempItem.groupName || !tempItem.members.length) return;

    setLoading(true);
    try {
      if (editItem) {
        // Cập nhật item đã tồn tại
        const updatedItem = {
          ...editItem,
          groupName: tempItem.groupName,
          members: tempItem.members,
          status: tempItem.status,
        };

        const response = await preparationClassifyService.update(
          editItem.id,
          updatedItem
        );

        if (response.status === "SUCCESS") {
          const updatedData = data.map((item) =>
            item.id === editItem.id ? response.data : item
          );
          setData(updatedData);
        }
      } else {
        // Tạo item mới
        const newItem: PreparationClassify = {
          id: 0, // ID sẽ được tạo bởi server
          groupName: tempItem.groupName,
          members: tempItem.members,
          status: tempItem.status,
        };

        const response = await preparationClassifyService.create(newItem);

        if (response.status === "SUCCESS") {
          const newData = [...data, response.data];
          setData(newData);

          // Cập nhật trường questions của preparation
          const newQuestionIds = [...questionIds, response.data.id];
          await updatePreparationQuestions(newQuestionIds);
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving item:", error);
      showError({
        message: editItem ? "Error updating item" : "Error creating item",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setLoading(false);
      handleCloseDialog();
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await preparationClassifyService.remove(id);

      if (response.status === "SUCCESS") {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);

        // Cập nhật trường questions của preparation
        const updatedQuestionIds = questionIds.filter(
          (questionId) => questionId !== id
        );
        await updatePreparationQuestions(updatedQuestionIds);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      showError({
        message: "Error deleting item",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Lưu tất cả các thay đổi
      const updatePromises = data.map((item) =>
        preparationClassifyService.update(item.id, item)
      );

      await Promise.all(updatePromises);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      showError({
        message: "Error saving changes",
        severity: "error",
        details: extractErrorMessages(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelChanges = () => {
    // Fetch lại data từ server để bỏ các thay đổi cục bộ
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = questionIds.map((questionId) =>
          preparationClassifyService.findById(questionId)
        );

        const responses = (await Promise.all(promises)) as ServiceResponse[];

        const validData = responses
          .filter((response) => response.status === "SUCCESS" && response.data)
          .map((response) => response.data);

        setData(validData);
      } catch (error) {
        console.error("Error fetching classification data:", error);
        showError({
          message: "Error refreshing data",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setLoading(false);
      }
    };

    if (questionIds.length > 0) {
      fetchData();
    }

    setIsEditMode(false);
  };

  return {
    data,
    loading,
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
