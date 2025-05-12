import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse, AIResponseFilter } from "interfaces";
import { aiResponseService } from "services/features/aiResponseService";
import { 
  SearchPanel, 
  ResponseTable,
  SystemHeader
} from "../components/airesponseList";
import { WEPaginationSelect } from "components/pagination";
export default function AIResponsePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Data states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  
  // Filter states - bắt đầu với một đối tượng rỗng
  const [filters, setFilters] = useState<AIResponseFilter>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching with filters:", filters);
      const result = await aiResponseService.getAIResponses(page, itemsPerPage, filters);
      console.log("API Result:", result);
      
      // API trả về cấu trúc { content, totalPages, totalElements, ... }
      if (result && result.content) {
        setResponses(result.content);
        setTotalPage(result.totalPages);
        setTotalItems(result.totalElements);
      } else {
        // Trường hợp không có dữ liệu
        setResponses([]);
        setTotalPage(0);
        setTotalItems(0);
        console.error("Unexpected data format:", result);
        setError("Unexpected data format received from the server.");
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch AI responses";
      setError(errorMessage);
      setResponses([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when page, itemsPerPage, or filters change
  useEffect(() => {
    fetchData();
  }, [page, itemsPerPage, filters]);

  // Handlers
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1); // Reset to first page when changing items per page
  };

  const handleFilterChange = (newFilters: AIResponseFilter) => {
    console.log("Filter changed to:", newFilters);
    setFilters(newFilters);
    setPage(1); // Reset to first page when applying filters
  };

  const handleFilterReset = () => {
    console.log("Resetting filters");
    // Xóa tất cả các filter bằng cách set lại thành object rỗng
    setFilters({});
    setPage(1);
    
    // Thêm một timeout nhỏ để đảm bảo UI cập nhật trước khi gọi lại API
    setTimeout(() => {
      console.log("Fetching data after reset");
      fetchData();
    }, 50);
  };

  return (
    <Stack spacing={3} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Section */}
      <SystemHeader />
      
      {/* Search Panel */}
      <SearchPanel 
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
      />
      
      {/* Results Section */}
      <Box
        component={Paper}
        elevation={3}
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          overflow: "hidden"
        }}
      >
        {/* Status info */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color={isDarkMode ? color.gray300 : color.gray600}>
            {loading ? 'Loading...' : `Showing ${responses.length} of ${totalItems} responses`}
          </Typography>
        </Box>
        
        {/* Error display */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={fetchData}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}
        
        {/* Loading indicator */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress 
              size={40} 
              sx={{ color: isDarkMode ? color.teal400 : color.teal600 }} 
            />
          </Box>
        ) : responses.length === 0 ? (
          <Box 
            sx={{ 
              py: 5, 
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
              borderRadius: "0.5rem",
              textAlign: "center"
            }}
          >
            <Typography variant="body1" color={isDarkMode ? color.gray300 : color.gray600}>
              No AI responses found. Try adjusting your filters.
            </Typography>
          </Box>
        ) : (
          <ResponseTable 
            data={responses} 
            onRefresh={fetchData}
          />
        )}
        
        {/* Pagination */}
        {!loading && responses.length > 0 && (
          <WEPaginationSelect
            page={page}
            totalPage={totalPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </Box>
    </Stack>
  );
}