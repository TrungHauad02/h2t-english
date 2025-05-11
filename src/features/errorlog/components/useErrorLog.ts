import { ErrorLog, ErrorLogFilter, SeverityEnum } from "interfaces";
import { useEffect, useState } from "react";
import { errorLogService } from "services/features/errorLogService";

export default function useErrorLog() {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [errorCounts, setErrorCounts] = useState({
    [SeverityEnum.LOW]: 0,
    [SeverityEnum.MEDIUM]: 0,
    [SeverityEnum.HIGH]: 0,
  });

  const [filters, setFilters] = useState<ErrorLogFilter>({
    sortBy: "-createdAt",
  });

  const fetchErrorCountsBySeverity = async () => {
    try {
      const severities = [
        SeverityEnum.LOW,
        SeverityEnum.MEDIUM,
        SeverityEnum.HIGH,
      ];

      const countPromises = severities.map(async (severity) => {
        const response = await errorLogService.getErrorLogs(1, 1, {
          ...filters,
          severity: severity,
        });
        return {
          severity,
          count: response.data.totalElements,
        };
      });

      const counts = await Promise.all(countPromises);

      const newErrorCounts = counts.reduce(
        (acc, curr) => {
          acc[curr.severity] = curr.count;
          return acc;
        },
        {
          [SeverityEnum.LOW]: 0,
          [SeverityEnum.MEDIUM]: 0,
          [SeverityEnum.HIGH]: 0,
        }
      );

      setErrorCounts(newErrorCounts);
    } catch (error) {
      console.error("Failed to fetch error counts", error);
      setErrorCounts({
        [SeverityEnum.LOW]: 0,
        [SeverityEnum.MEDIUM]: 0,
        [SeverityEnum.HIGH]: 0,
      });
    }
  };

  const fetchLogs = async () => {
    try {
      const apiFilter: ErrorLogFilter = {
        ...filters,
      };

      if (searchQuery) {
        apiFilter.message = searchQuery;
      }

      const response = await errorLogService.getErrorLogs(
        page,
        itemsPerPage,
        apiFilter
      );

      setErrorLogs(response.data.content);
      setTotalItems(response.data.totalElements);
      fetchErrorCountsBySeverity();
    } catch (error) {
      console.error("Failed to fetch error logs", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, itemsPerPage, filters, searchQuery]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onRefresh = () => {
    setFilters({
      sortBy: "-createdAt",
    });
    setSearchQuery("");
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Partial<ErrorLogFilter>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setPage(1);
  };

  return {
    errorLogs,
    page,
    itemsPerPage,
    filters,
    searchQuery,
    totalPages,
    setPage,
    setItemsPerPage,
    setSearchQuery,
    setFilters,
    errorCounts,
    onRefresh,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleFilterChange,
    totalItems,
    fetchLogs,
  };
}
