import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { AIResponse } from "interfaces";
import { AIResponseFilter } from "interfaces";
import { aiResponseService } from "services/features/aiResponseService";
import { WEPaginationSelect } from "components/pagination";
import { 
  AIResponseSearchPanel, 
  AIResponseTable,
  AIResponseHeader
} from "../components/airesponseList";

export default function AIResponsePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Data states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState<AIResponseFilter>({});

  // Cập nhật hàm fetchData để xử lý dữ liệu và bắt lỗi tốt hơn

const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    console.log("Fetching data with:", { page, itemsPerPage, filters });
    
    const result = await aiResponseService.getAIResponses(page, itemsPerPage, filters);
    console.log("Fetch result:", result);
    
    // Kiểm tra cấu trúc dữ liệu
    if (result) {
      // Trường hợp 1: API trả về đúng định dạng pagination
      if (Array.isArray(result.content)) {
        setResponses(result.content);
        setTotalPage(result.totalPages || 1);
        setTotalItems(result.totalElements || result.content.length);
      } 
      // Trường hợp 2: API trả về mảng trực tiếp
      else if (Array.isArray(result)) {
        setResponses(result);
        setTotalPage(1);
        setTotalItems(result.length);
      }
      // Trường hợp 3: Định dạng không đúng
      else {
        console.error("Unexpected data format:", result);
        setError("Unexpected data format received from the server.");
        setResponses([]);
      }
    } else {
      setResponses([]);
      setTotalPage(1);
      setTotalItems(0);
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
    setFilters(newFilters);
    setPage(1); // Reset to first page when applying filters
  };

  const handleFilterReset = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <Stack spacing={3} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header Section */}
      <AIResponseHeader />
      
      {/* Search Panel */}
      <AIResponseSearchPanel 
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
          <Alert severity="error" sx={{ mb: 2 }}>
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
          <AIResponseTable 
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