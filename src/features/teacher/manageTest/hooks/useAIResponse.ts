import { useState, useCallback, useEffect } from 'react';
import { AIResponse, AIResponseFilter } from 'interfaces';
import { aiResponseService } from 'services/features/aiResponseService';

interface UseAIResponseResult {
  // States
  aiResponses: AIResponse[];
  loading: boolean;
  error: string | null;
  page: number;
  itemsPerPage: number;
  totalPage: number;
  filter: AIResponseFilter;
  selectedResponse: AIResponse | null;
  evaluateDialogOpen: boolean;
  
  // Actions
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  setFilter: (filter: AIResponseFilter) => void;
  openEvaluateDialog: (response: AIResponse) => void;
  closeEvaluateDialog: () => void;
  saveEvaluation: (evaluate: string) => Promise<void>;
  fetchData: () => Promise<void>;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  handleFilterChange: (newFilter: AIResponseFilter) => void;
}

export default function useAIResponse(): UseAIResponseResult {
  // States
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [filter, setFilter] = useState<AIResponseFilter>({});
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);
  const [evaluateDialogOpen, setEvaluateDialogOpen] = useState<boolean>(false);

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await aiResponseService.getAIResponses(page, itemsPerPage, filter);
      
      setAiResponses(result.content || []);
      setTotalPage(result.totalPages || 1);
    } catch (error) {
      console.error("Error fetching AI responses:", error);
      setError("Failed to fetch AI responses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, filter]);

  // Handle page change
  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setPage(1); // Reset to first page when changing items per page
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter: AIResponseFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when changing filter
  }, []);

  // Open evaluate dialog
  const openEvaluateDialog = useCallback((response: AIResponse) => {
    setSelectedResponse(response);
    setEvaluateDialogOpen(true);
  }, []);

  // Close evaluate dialog
  const closeEvaluateDialog = useCallback(() => {
    setEvaluateDialogOpen(false);
    setSelectedResponse(null);
  }, []);

  // Save evaluation
  const saveEvaluation = useCallback(async (evaluate: string) => {
    if (selectedResponse) {
      try {
        await aiResponseService.patch(selectedResponse.id, { 
          evaluate, 
          status: true // Change status to evaluated
        });
        
        // Refresh data after saving
        await fetchData();
        
        // Close dialog
        closeEvaluateDialog();
      } catch (error) {
        console.error("Error updating evaluation:", error);
        setError("Failed to save evaluation. Please try again.");
        throw error; // Re-throw to handle in the component
      }
    }
  }, [selectedResponse, fetchData, closeEvaluateDialog]);

  // Effect to fetch data on component mount and when dependencies change
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
    
    // Actions
    setPage,
    setItemsPerPage,
    setFilter,
    openEvaluateDialog,
    closeEvaluateDialog,
    saveEvaluation,
    fetchData,
    handlePageChange,
    handleItemsPerPageChange,
    handleFilterChange
  };
}