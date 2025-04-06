import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Divider,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ErrorLog, SeverityEnum, BaseFilter } from "interfaces";
import {
  ErrorLogTable,
  ErrorLogSearchBar,
  ErrorLogFilterSection,
} from "../components";
import { mockErrorLogs } from "../services/mockData";

export default function ErrorLogPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [filteredErrorLogs, setFilteredErrorLogs] = useState<ErrorLog[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<BaseFilter & {
    severity?: SeverityEnum | null;
    errorCode?: string;
  }>({
    status: null,
    sortBy: "-createdAt",
    severity: null,
    errorCode: "",
  });

  const itemsPerPage = 10;

  useEffect(() => {
    // In a real app, this would be an API call
    setErrorLogs(mockErrorLogs);
  }, []);

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
    if (filters.status !== null) {
      result = result.filter((log) => log.status === filters.status);
    }

    if (filters.severity !== null) {
      result = result.filter((log) => log.severity === filters.severity);
    }

    if (filters.errorCode) {
      result = result.filter((log) =>
        log.errorCode.toLowerCase().includes(filters.errorCode!.toLowerCase())
      );
    }

    if (filters.startCreatedAt) {
      result = result.filter(
        (log) =>
          log.createdAt &&
          new Date(log.createdAt) >= new Date(filters.startCreatedAt!)
      );
    }

    if (filters.endCreatedAt) {
      result = result.filter(
        (log) =>
          log.createdAt &&
          new Date(log.createdAt) <= new Date(filters.endCreatedAt!)
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      const sortField = filters.sortBy.startsWith("-")
        ? filters.sortBy.substring(1)
        : filters.sortBy;
      const sortDirection = filters.sortBy.startsWith("-") ? -1 : 1;

      result.sort((a, b) => {
        if (!a[sortField as keyof ErrorLog] || !b[sortField as keyof ErrorLog]) {
          return 0;
        }
        
        if (sortField === "createdAt" || sortField === "updatedAt") {
          return sortDirection * (new Date(a[sortField] as Date).getTime() - 
                                 new Date(b[sortField] as Date).getTime());
        }
        
        return 0;
      });
    }

    setFilteredErrorLogs(result);
    setPage(1); // Reset to first page when filters change
  }, [errorLogs, searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredErrorLogs.length / itemsPerPage);
  const paginatedLogs = filteredErrorLogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Count errors by severity for summary
  const errorCounts = {
    [SeverityEnum.LOW]: errorLogs.filter(
      (log) => log.severity === SeverityEnum.LOW
    ).length,
    [SeverityEnum.MEDIUM]: errorLogs.filter(
      (log) => log.severity === SeverityEnum.MEDIUM
    ).length,
    [SeverityEnum.HIGH]: errorLogs.filter(
      (log) => log.severity === SeverityEnum.HIGH
    ).length,
  };

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          transition: "background-color 0.3s ease",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.teal300 : color.teal700,
              mb: 1,
            }}
          >
            System Error Logs
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
          >
            Monitoring and tracking system errors
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            <Chip
              label={`All Errors: ${errorLogs.length}`}
              sx={{
                bgcolor: isDarkMode ? color.gray700 : color.gray200,
                color: isDarkMode ? color.white : color.gray800,
                fontWeight: 500,
              }}
            />
            <Chip
              label={`High: ${errorCounts[SeverityEnum.HIGH]}`}
              sx={{
                bgcolor: isDarkMode ? color.red700 : color.red100,
                color: isDarkMode ? color.white : color.red900,
                fontWeight: 500,
              }}
            />
            <Chip
              label={`Medium: ${errorCounts[SeverityEnum.MEDIUM]}`}
              sx={{
                bgcolor: isDarkMode ? color.warning : color.warning,
                color: isDarkMode ? color.black : color.black,
                fontWeight: 500,
              }}
              style={{ opacity: isDarkMode ? 0.9 : 0.7 }}
            />
            <Chip
              label={`Low: ${errorCounts[SeverityEnum.LOW]}`}
              sx={{
                bgcolor: isDarkMode ? color.teal700 : color.teal100,
                color: isDarkMode ? color.white : color.teal900,
                fontWeight: 500,
              }}
            />
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <ErrorLogSearchBar onSearch={handleSearchChange} />
        
        <ErrorLogFilterSection 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        <ErrorLogTable errorLogs={paginatedLogs} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${
              isDarkMode ? color.gray700 : color.gray200
            }`,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            Showing {paginatedLogs.length} of {filteredErrorLogs.length} errors
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: isDarkMode ? color.gray300 : color.gray700,
              },
              "& .Mui-selected": {
                backgroundColor: isDarkMode
                  ? `${color.teal700} !important`
                  : `${color.teal500} !important`,
                color: "white !important",
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}