import { useState } from "react";
import { AIResponse } from "interfaces";
import { formatDistanceToNow, format } from "date-fns";

export function useTableState(onRefresh: () => void) {
  // State for expanded row
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  
  // State for selected response
  const [selectedResponse, setSelectedResponse] = useState<AIResponse | null>(null);

  // Toggle expanded row
  const handleToggleRow = (id: number) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  // Format date for display
  const formatDate = (date: string | Date | undefined) => {
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
  };

  return {
    openRowId,
    selectedResponse,
    setSelectedResponse,
    handleToggleRow,
    formatDate
  };
}