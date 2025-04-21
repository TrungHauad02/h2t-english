import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useManageToeicPage from "../hooks/useManageToeicPage";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Toeic } from "interfaces";
import {
  SearchFilterBar,
  ToeicTestCardGrid,
  PaginationControl,
} from "../components/manageToeic";
import CreateToeicDialog from "../components/CreateToeicDialog";
import WEConfirmDelete from "components/display/WEConfirmDelete";
import { useNavigate } from "react-router-dom";
export default function ManageToeicPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [newToeic, setNewToeic] = useState<Toeic>({ id: 1, title: "", duration: 120, status: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<number | null>(null);
  const [testToDeleteName, setTestToDeleteName] = useState<string>("");
  const navigate = useNavigate();
  const {
    searchText,
    setSearchText,
    statusFilter,
    loading,
    page,
    itemsPerPage,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    handleStatusFilterChange,
    deleteToeicTest,
    createToeicTest,
    totalPages,
    displayedToeicTests,
  } = useManageToeicPage();

  const handleViewTest = (testId: number) => {
    navigate(`${testId}`);
  };

  const handleDeleteTest = (testId: number) => {
    const test = displayedToeicTests.find(t => t.id === testId);
    if (test) {
      setTestToDelete(testId);
      setTestToDeleteName(test.title);
      setDeleteConfirmOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (testToDelete === null) return;
    setIsSubmitting(true);
    await deleteToeicTest(testToDelete);
    setIsSubmitting(false);
    setDeleteConfirmOpen(false);
    setTestToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTestToDelete(null);
  };

  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(prev => !prev);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic(prev => ({ ...prev, title: e.target.value }));
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic(prev => ({ ...prev, duration: Number(e.target.value) }));
  };

  const handleCreateToeic = async () => {
    setIsSubmitting(true);
    await createToeicTest(newToeic);
    setIsSubmitting(false);
    handleOpenCreateDialog();
  };

  const backgroundGradient = isDarkMode
    ? `linear-gradient(120deg, ${color.gray900}, ${color.gray800})`
    : `linear-gradient(120deg, ${color.emerald50}, ${color.teal50})`;

  return (
    <Box sx={{ minHeight: "100vh", background: backgroundGradient, pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Paper
            elevation={isDarkMode ? 2 : 1}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              boxShadow: isDarkMode ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: `linear-gradient(90deg, ${color.teal400}, ${color.emerald400})`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                mb: { xs: 3, md: 4 },
                gap: 2,
              }}
            >
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="bold"
                sx={{
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${color.teal300}, ${color.emerald300})`
                    : `linear-gradient(90deg, ${color.teal600}, ${color.emerald600})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                Manage TOEIC Tests
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleOpenCreateDialog}
                disabled={loading || isSubmitting}
                sx={{
                  backgroundColor: color.btnSubmitBg,
                  "&:hover": { backgroundColor: color.btnSubmitHoverBg },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: 600,
                  boxShadow: isDarkMode
                    ? "0 4px 10px rgba(16, 185, 129, 0.3)"
                    : "0 4px 10px rgba(16, 185, 129, 0.2)",
                }}
              >
                Create New Test
              </Button>
            </Box>

            <SearchFilterBar
              searchText={searchText}
              setSearchText={setSearchText}
              statusFilter={statusFilter}
              handleStatusFilterChange={handleStatusFilterChange}
              handleSearch={handleSearch}
            />

            <ToeicTestCardGrid
              loading={loading}
              displayedToeicTests={displayedToeicTests}
              handleViewTest={handleViewTest}
              handleDeleteTest={handleDeleteTest}
            />

            <PaginationControl
              totalPages={totalPages}
              page={page}
              itemsPerPage={itemsPerPage}
              handleChangePage={handleChangePage}
              handleItemsPerPageChange={handleItemsPerPageChange}
              displayedToeicTests={displayedToeicTests}
            />
          </Paper>
        </Fade>
      </Container>

      <CreateToeicDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={newToeic}
        onChangeTitle={handleChangeTitle}
        onChangeDuration={handleChangeDuration}
        onCreateToeic={handleCreateToeic}
      />

      <WEConfirmDelete
        open={deleteConfirmOpen}
        title="Delete TOEIC Test"
        resourceName={testToDeleteName || "this TOEIC test"}
        description="This action cannot be undone. All associated data, questions, and results will be permanently removed."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isSubmitting}
      />

      {isSubmitting && (
        <Backdrop sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
}
