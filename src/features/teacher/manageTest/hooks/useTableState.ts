import { useState, useCallback } from "react";
import { AIResponse } from "interfaces";
import { formatDistanceToNow, format } from "date-fns";

export function useTableState(onRefresh?: () => void) {
  // State for expanded row
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  
  // State for selected response
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);

  // Toggle expanded row - sử dụng useCallback để tránh tạo lại hàm mỗi lần render
  const handleToggleRow = useCallback((id: number) => {
    setOpenRowId(prevId => prevId === id ? null : id);
  }, []);

  // Format date for display - sử dụng useCallback để tránh tạo lại hàm mỗi lần render
  const formatDate = useCallback((date: string | Date | undefined) => {
    if (!date) {
      return {
        relative: 'Not available',
        full: 'Not available'
      };
    }
    
    const dateObj = new Date(date);
    return {
      relative: formatDistanceToNow(dateObj, { addSuffix: true }),
      full: format(dateObj, "PPpp") // Mon, Jan 1, 2021, 12:00 PM
    };
  }, []);

  // Tạo một hàm setSelectedResponse bọc bởi useCallback
  const setSelectedResponseMemo = useCallback((response: AIResponse | null) => {
    setSelectedResponse(response);
  }, []);

  return {
    openRowId,
    selectedResponse,
    setSelectedResponse: setSelectedResponseMemo,
    handleToggleRow,
    formatDate
  };
}