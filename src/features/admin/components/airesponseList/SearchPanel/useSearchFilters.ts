import { useState, useEffect, useCallback } from "react";
import { AIResponseFilter } from "interfaces";

interface UseSearchFiltersProps {
  initialFilters: AIResponseFilter;
  onFilterChange: (filters: AIResponseFilter) => void;
  onFilterReset: () => void;
  debounceDelay?: number;
}

export function useSearchFilters({
  initialFilters,
  onFilterChange,
  onFilterReset,
  debounceDelay = 500
}: UseSearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<AIResponseFilter>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<AIResponseFilter>(initialFilters);

  // Sync local filters when initialFilters changes
  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  // Debounce effect for filters
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(localFilters);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [localFilters, debounceDelay]);

  // Apply filters when debounced value changes
  useEffect(() => {
    if (JSON.stringify(debouncedFilters) !== JSON.stringify(initialFilters)) {
      onFilterChange(debouncedFilters);
    }
  }, [debouncedFilters, initialFilters, onFilterChange]);

  // Handle individual filter field changes
  const handleFilterChange = useCallback((field: keyof AIResponseFilter, value: any) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  }, []);

  // Reset all filters to empty/null values explicitly
  const handleResetFilters = useCallback(() => {
    // Tạo một đối tượng filter mới với tất cả các giá trị là null/undefined
    const emptyFilter: AIResponseFilter = {
      status: null,
      userId: undefined,
      sortBy: undefined,
      startCreatedAt: undefined,
      endCreatedAt: undefined,
      startUpdatedAt: undefined,
      endUpdatedAt: undefined
    };
    
    // Cập nhật state local
    setLocalFilters(emptyFilter);
    setDebouncedFilters(emptyFilter);
    
    // Gọi hàm reset từ component cha
    onFilterReset();
  }, [onFilterReset]);

  return {
    localFilters,
    setLocalFilters, // Thêm hàm này để có thể set trực tiếp từ bên ngoài
    handleFilterChange,
    handleResetFilters
  };
}