import { SelectChangeEvent } from "@mui/material";
import React from "react";

export default function useErrorLogFilter(onFilterChange: (f: any) => void) {
  const handleSeverityChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onFilterChange({ severity: value === "all" ? null : value });
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onFilterChange({ status: value === "all" ? null : value === "true" });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onFilterChange({ sortBy: event.target.value });
  };

  const handleErrorCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({ errorCode: event.target.value });
  };

  const handleResetFilters = () => {
    onFilterChange({
      status: null,
      sortBy: "-createdAt",
      severity: null,
      errorCode: "",
      startCreatedAt: null,
      endCreatedAt: null,
    });
  };

  return {
    handleSeverityChange,
    handleStatusChange,
    handleSortChange,
    handleErrorCodeChange,
    handleResetFilters,
  };
}
