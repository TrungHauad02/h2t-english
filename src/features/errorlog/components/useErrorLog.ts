import { BaseFilter, ErrorLog, SeverityEnum } from "interfaces";
import { useEffect, useState } from "react";
import { errorLogService } from "services/features/errorLogService";
export default function useErrorLog(initialItemsPerPage: number) {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [filteredErrorLogs, setFilteredErrorLogs] = useState<ErrorLog[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  }>({
    status: null,
    sortBy: "-createdAt",
    severity: null,
    errorCode: "",
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await errorLogService.getErrorLogs(page, itemsPerPage); 
        setErrorLogs(response.data.content); 
        setTotalItems(response.data.totalElements);
      } catch (error) {
        console.error("Failed to fetch error logs", error);
      }
    };
  
    fetchLogs();
  }, [page, itemsPerPage]);

  useEffect(() => {
    let result = [...errorLogs];

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (log) =>
          log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.errorCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.status !== null) result = result.filter((log) => log.status === filters.status);
    if (filters.severity !== null) result = result.filter((log) => log.severity === filters.severity);
    if (filters.errorCode) result = result.filter((log) =>
      log.errorCode.toLowerCase().includes(filters.errorCode!.toLowerCase())
    );

    if (filters.startCreatedAt) {
      result = result.filter((log) =>
        log.createdAt && new Date(log.createdAt) >= new Date(filters.startCreatedAt!)
      );
    }

    if (filters.endCreatedAt) {
      result = result.filter((log) =>
        log.createdAt && new Date(log.createdAt) <= new Date(filters.endCreatedAt!)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      const sortField = filters.sortBy.startsWith("-") ? filters.sortBy.substring(1) : filters.sortBy;
      const sortDirection = filters.sortBy.startsWith("-") ? -1 : 1;

      result.sort((a, b) => {
        if (!a[sortField as keyof ErrorLog] || !b[sortField as keyof ErrorLog]) return 0;
        if (sortField === "createdAt" || sortField === "updatedAt") {
          return sortDirection * (
            new Date(a[sortField] as Date).getTime() -
            new Date(b[sortField] as Date).getTime()
          );
        }
        return 0;
      });
    }

    setFilteredErrorLogs(result);
  }, [errorLogs, searchQuery, filters]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedLogs = filteredErrorLogs;

  const errorCounts = {
    [SeverityEnum.LOW]: errorLogs.filter((log) => log.severity === SeverityEnum.LOW).length,
    [SeverityEnum.MEDIUM]: errorLogs.filter((log) => log.severity === SeverityEnum.MEDIUM).length,
    [SeverityEnum.HIGH]: errorLogs.filter((log) => log.severity === SeverityEnum.HIGH).length,
  };

  const onRefresh = () => {
    setFilters({
      status: null,
      sortBy: "-createdAt",
      severity: null,
      errorCode: "",
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
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return {
    errorLogs,
    filteredErrorLogs,
    paginatedLogs,
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
    setTotalItems
  };
}
