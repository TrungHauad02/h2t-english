import { Box, Container, Alert, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WEPaginationSelect } from "components/pagination";
import { ResponseHeader,
  SearchSection,
  ResponseTable,
  EvaluateDialog,
  DetailDialog } from "../components";
import useAIResponse from "../hooks/useAIResponse";

export default function AIResponseTeacherPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // Use custom hook for AI response management
  const {
    aiResponses,
    loading,
    error,
    page,
    totalPage,
    itemsPerPage,
    evaluateDialogOpen,
    detailDialogOpen,
    selectedResponse,
    handlePageChange,
    handleItemsPerPageChange,
    handleFilterChange,
    openEvaluateDialog,
    closeEvaluateDialog,
    openDetailDialog,
    closeDetailDialog,
    saveEvaluation,
    fetchData
  } = useAIResponse();

  const backgroundGradient = isDarkMode
    ? `linear-gradient(135deg, ${color.gray900}, ${color.gray800})`
    : `linear-gradient(135deg, ${color.emerald50}, ${color.teal50})`;

  // Show pagination only if there are items
  const showPagination = !loading && aiResponses.length > 0 && totalPage > 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <ResponseHeader />
        
        {error && (
          <Fade in={!!error}>
            <Alert 
              severity="error"
              sx={{ 
                mt: 2,
                backgroundColor: isDarkMode ? `${color.red900}40` : `${color.red100}`,
                color: isDarkMode ? color.red200 : color.red800,
                '& .MuiAlert-icon': {
                  color: isDarkMode ? color.red300 : color.red700,
                }
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}
        
        <Box sx={{ mt: 4 }}>
          <SearchSection onFilterChange={handleFilterChange} />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <ResponseTable 
            data={aiResponses} 
            loading={loading} 
            error={error}
            onEvaluate={openEvaluateDialog}
            onViewDetail={openDetailDialog}
            onRefresh={fetchData}
          />
        </Box>
        
        {showPagination && (
          <WEPaginationSelect
            page={page}
            totalPage={totalPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </Container>

      {/* Evaluate Dialog */}
      {selectedResponse && (
        <EvaluateDialog
          open={evaluateDialogOpen}
          response={selectedResponse}
          onClose={closeEvaluateDialog}
          onSave={saveEvaluation}
        />
      )}

      {/* Detail Dialog */}
      {selectedResponse && (
        <DetailDialog
          open={detailDialogOpen}
          response={selectedResponse}
          onClose={closeDetailDialog}
          onEvaluate={openEvaluateDialog}
        />
      )}
    </Box>
  );
}