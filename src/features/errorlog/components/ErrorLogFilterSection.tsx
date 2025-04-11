import React from "react";
import { Box } from "@mui/material";
import { SeverityEnum, BaseFilter } from "interfaces";
import useErrorLogFilter from "./filter/useErrorLogFilters";
import { ShowFilter, BoxFilter, ActiveFilter } from "./filter";

interface ErrorLogFilterSectionProps {
  filters: BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function ErrorLogFilterSection({
  filters,
  onFilterChange,
}: ErrorLogFilterSectionProps) {
  const [showFilters, setShowFilters] = React.useState(false);
  const hooks = useErrorLogFilter(onFilterChange);
  const toggleFilters = () => { setShowFilters(!showFilters); };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status !== null) count++;
    if (filters.severity !== null) count++;
    if (filters.errorCode) count++;
    if (filters.startCreatedAt) count++;
    if (filters.endCreatedAt) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Box sx={{ mb: 4 }}>
      <ShowFilter
        activeFilterCount={activeFilterCount}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        handleSortChange={hooks.handleSortChange}
        filters={filters}
      />
      <BoxFilter
        filters={filters}
        showFilters={showFilters}
        handleSeverityChange={hooks.handleSeverityChange}
        handleStatusChange={hooks.handleStatusChange}
        handleResetFilters={hooks.handleResetFilters}
        handleErrorCodeChange={hooks.handleErrorCodeChange}
        onFilterChange={onFilterChange}
      />
      {activeFilterCount > 0 && (
        <ActiveFilter
          filters={filters}
          onFilterChange={onFilterChange}
        />
      )};
    </Box>
  );
}