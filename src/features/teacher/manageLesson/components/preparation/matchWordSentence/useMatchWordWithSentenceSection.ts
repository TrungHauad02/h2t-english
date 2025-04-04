import React, { useState, useEffect } from "react";
import { PreparationMatchWordSentences } from "interfaces";
import { preparationMatchWordSentencesService } from "services/preparation/preparationMatchWordSentences";
import { useErrors } from "hooks/useErrors";
import { extractErrorMessages } from "utils/extractErrorMessages";
import { preparationService } from "services";

interface ServiceResponse {
  status: string;
  data: PreparationMatchWordSentences;
  message: string;
}

export default function useMatchWordWithSentenceSection(
  questions: number[],
  preparationId: number,
  fetchPreparationData: () => void
) {
  const [data, setData] = useState<PreparationMatchWordSentences[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const { showError } = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = questions.map((questionId) =>
          preparationMatchWordSentencesService.findById(questionId)
        );

        const responses = (await Promise.all(promises)) as ServiceResponse[];

        // Lọc các response thành công và trích xuất data
        const validData = responses
          .filter((response) => response.status === "SUCCESS" && response.data)
          .map((response) => response.data);

        setData(validData);
      } catch (error) {
        console.error("Error fetching match word sentences:", error);
        showError({
          message: "Error fetching match word sentences",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setLoading(false);
      }
    };

    if (questions.length > 0) {
      fetchData();
    }
  }, [questions]);

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
        message: "Error updating preparation references",
        severity: "error",
        details: extractErrorMessages(error),
      });
      throw error; // Ném lỗi để xử lý ở hàm gọi
    }
  };

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

  const handleToggleStatus = (value: boolean) => {
    setTempItem({
      ...tempItem,
      status: value,
    });
  };

  const handleSaveItem = async () => {
    if (!tempItem.word || !tempItem.sentence) return;

    setLoading(true);
    try {
      if (editItem) {
        // Cập nhật item đã tồn tại
        const updatedItem = {
          ...editItem,
          word: tempItem.word!,
          sentence: tempItem.sentence!,
          status: tempItem.status ?? true,
        };

        const response = await preparationMatchWordSentencesService.update(
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
        const newItem: PreparationMatchWordSentences = {
          id: 0, // ID sẽ được tạo bởi server
          word: tempItem.word!,
          sentence: tempItem.sentence!,
          status: tempItem.status ?? true,
        };

        const response = await preparationMatchWordSentencesService.create(
          newItem
        );

        if (response.status === "SUCCESS") {
          const newData = [...data, response.data];
          setData(newData);

          // Cập nhật trường questions của preparation
          const newQuestionIds = [...questions, response.data.id];
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
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await preparationMatchWordSentencesService.remove(id);

      if (response.status === "SUCCESS") {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);

        // Cập nhật trường questions của preparation
        const updatedQuestionIds = questions.filter(
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
        preparationMatchWordSentencesService.update(item.id, item)
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
        const promises = questions.map((questionId) =>
          preparationMatchWordSentencesService.findById(questionId)
        );

        const responses = (await Promise.all(promises)) as ServiceResponse[];

        const validData = responses
          .filter((response) => response.status === "SUCCESS" && response.data)
          .map((response) => response.data);

        setData(validData);
      } catch (error) {
        console.error("Error fetching match word sentences:", error);
        showError({
          message: "Error refreshing data",
          severity: "error",
          details: extractErrorMessages(error),
        });
      } finally {
        setLoading(false);
      }
    };

    if (questions.length > 0) {
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
    handleToggleEditMode,
    handleOpenDialog,
    handleCloseDialog,
    handleSaveItem,
    handleDelete,
    handleSaveChanges,
    handleCancelChanges,
    handleInputChange,
    handleToggleStatus,
  };
}
