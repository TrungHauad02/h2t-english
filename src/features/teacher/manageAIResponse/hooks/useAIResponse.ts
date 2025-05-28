import { useState, useCallback, useEffect } from "react";
import { AIResponse, AIResponseFilter } from "interfaces";
import { aiResponseService } from "services/features/aiResponseService";
import useAuth from "hooks/useAuth"; 

interface UseAIResponseResult {
  aiResponses: AIResponse[];
  loading: boolean;
  error: string | null;
  page: number;
  itemsPerPage: number;
  totalPage: number;
  filter: AIResponseFilter;
  selectedResponse: AIResponse | null;
  evaluateDialogOpen: boolean;
  detailDialogOpen: boolean;

  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setFilter: (filter: AIResponseFilter) => void;
  openEvaluateDialog: (response: AIResponse) => void;
  closeEvaluateDialog: () => void;
  openDetailDialog: (response: AIResponse) => void;
  closeDetailDialog: () => void;
  saveEvaluation: (evaluate: string) => Promise<void>;
  fetchData: () => Promise<void>;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  handleFilterChange: (newFilter: AIResponseFilter) => void;
}

export default function useAIResponse(): UseAIResponseResult {
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [filter, setFilter] = useState<AIResponseFilter>({});
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);
  const [evaluateDialogOpen, setEvaluateDialogOpen] = useState<boolean>(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const { userId } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Kiểm tra userId
      if (!userId) {
        throw new Error("User ID is required");
      }

      // Sử dụng endpoint teacher-view với teacherId
      console.log("Fetching data with params:", { page, itemsPerPage, filter, teacherId: userId });
      
      const result = await aiResponseService.getTeacherViewResponses(
        page,
        itemsPerPage,
        filter,
        Number(userId) // Truyền userId làm teacherId
      );

      console.log("API Response:", result);
      
      setAiResponses(result.content || []);
      setTotalPage(result.totalPages || 1);
    } catch (error: any) {
      console.error("Error fetching AI responses:", error);
      console.error("Error details:", error.response?.data);
      
      // Hiển thị lỗi chi tiết hơn
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to fetch AI responses. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, filter, userId]);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((newFilter: AIResponseFilter) => {
    // Giữ nguyên filter không loại bỏ gì vì BE đã xử lý logic
    setFilter(newFilter);
    setPage(1);
  }, []);

  const openEvaluateDialog = useCallback((response: AIResponse) => {
    setSelectedResponse(response);
    setEvaluateDialogOpen(true);
    setDetailDialogOpen(false);
  }, []);

  const closeEvaluateDialog = useCallback(() => {
    setEvaluateDialogOpen(false);
    // Don't clear selectedResponse here to allow switching between dialogs
  }, []);

  const openDetailDialog = useCallback((response: AIResponse) => {
    setSelectedResponse(response);
    setDetailDialogOpen(true);
    setEvaluateDialogOpen(false);
  }, []);

  const closeDetailDialog = useCallback(() => {
    setDetailDialogOpen(false);
    // Clear selectedResponse when closing detail dialog completely
    setSelectedResponse(null);
  }, []);

  const saveEvaluation = useCallback(
    async (evaluate: string) => {
      if (selectedResponse) {
        try {
          await aiResponseService.patch(Number(selectedResponse.id), {
            evaluate,
            userId: Number(userId),
            status: true, // Đánh dấu là đã đánh giá
          });

          // Update the selected response immediately for UI
          setSelectedResponse(prev => prev ? { ...prev, evaluate, status: true } : null);
          
          // Refresh data to get latest from server
          await fetchData();
          
          // Close evaluate dialog and return to detail dialog
          setEvaluateDialogOpen(false);
          setDetailDialogOpen(true);
        } catch (error) {
          console.error("Error updating evaluation:", error);
          setError("Failed to save evaluation. Please try again.");
          throw error;
        }
      }
    },
    [selectedResponse, userId, fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    // States
    aiResponses,
    loading,
    error,
    page,
    itemsPerPage,
    totalPage,
    filter,
    selectedResponse,
    evaluateDialogOpen,
    detailDialogOpen,

    // Actions
    setPage,
    setItemsPerPage,
    setFilter,
    openEvaluateDialog,
    closeEvaluateDialog,
    openDetailDialog,
    closeDetailDialog,
    saveEvaluation,
    fetchData,
    handlePageChange,
    handleItemsPerPageChange,
    handleFilterChange,
  };
}