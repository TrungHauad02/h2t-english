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

      // Sử dụng endpoint teacher-view với điều kiện OR được xử lý ở backend
      const result = await aiResponseService.getTeacherViewResponses(
        page,
        itemsPerPage,
        filter
      );

      setAiResponses(result.content || []);
      setTotalPage(result.totalPages || 1);
    } catch (error) {
      console.error("Error fetching AI responses:", error);
      setError("Failed to fetch AI responses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, filter]);

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
    // Loại bỏ status và userId khỏi filter vì backend đã xử lý logic OR
    const { status, userId, ...rest } = newFilter;
    setFilter(rest);
    setPage(1);
  }, []);

  const openEvaluateDialog = useCallback((response: AIResponse) => {
    setSelectedResponse(response);
    setEvaluateDialogOpen(true);
    setDetailDialogOpen(false);
  }, []);

  const closeEvaluateDialog = useCallback(() => {
    setEvaluateDialogOpen(false);
  }, []);

  const openDetailDialog = useCallback((response: AIResponse) => {
    setSelectedResponse(response);
    setDetailDialogOpen(true);
    setEvaluateDialogOpen(false);
  }, []);

  const closeDetailDialog = useCallback(() => {
    setDetailDialogOpen(false);
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

          await fetchData();
          closeEvaluateDialog();
        } catch (error) {
          console.error("Error updating evaluation:", error);
          setError("Failed to save evaluation. Please try again.");
          throw error;
        }
      }
    },
    [selectedResponse, userId, fetchData, closeEvaluateDialog]
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