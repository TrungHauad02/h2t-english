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
  Snackbar,
  Alert,
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

export default function ManageToeicPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for create dialog
  const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
  const [newToeic, setNewToeic] = useState<Partial<Toeic>>({
    id: 1,
    title: "",
    duration: 120,
    
    status: true,
  });
  
  // State for notification
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  // State for additional loading indicator (used for CRUD operations)
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log(`View test ${testId}`);
    // Implementation would depend on your navigation setup
  };

  const handleEditTest = (testId: number) => {
    console.log(`Edit test ${testId}`);
    // Implementation would depend on your navigation setup
  };

  const handleDeleteTest = async (testId: number) => {
    if (window.confirm("Are you sure you want to delete this TOEIC test?")) {
      try {
        setIsSubmitting(true);
        await deleteToeicTest(testId);
        showNotification("TOEIC test deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting TOEIC test:", error);
        showNotification("Failed to delete TOEIC test", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  
  const handleOpenCreateDialog = () => {
    setIsOpenCreateDialog(!isOpenCreateDialog);
    if (isOpenCreateDialog) {
      // Reset form when closing
      setNewToeic({
        title: "",
        duration: 120,
        status: true,
      });
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      title: event.target.value,
    });
  };

  const handleChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewToeic({
      ...newToeic,
      duration: Number(event.target.value),
    });
  };

  const handleCreateToeic = async () => {
    // Basic validation
    if (!newToeic.title || !newToeic.duration) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      // Create the TOEIC test
      await createToeicTest(newToeic as Toeic);
      showNotification("TOEIC test created successfully", "success");
      
      // Reset form and close dialog
      setNewToeic({
        title: "",
        duration: 120,
        status: true,
      });
      handleOpenCreateDialog();
    } catch (error) {
      console.error("Error creating TOEIC test:", error);
      showNotification("Failed to create TOEIC test", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  const backgroundGradient = isDarkMode
    ? `linear-gradient(120deg, ${color.gray900}, ${color.gray800})`
    : `linear-gradient(120deg, ${color.emerald50}, ${color.teal50})`;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: backgroundGradient,
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={isDarkMode ? 2 : 1}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "1rem",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.08)",
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
                  "&:hover": {
                    backgroundColor: color.btnSubmitHoverBg,
                  },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: "600",
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
              handleEditTest={handleEditTest}
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

      {/* Create TOEIC Dialog */}
      <CreateToeicDialog
        isOpenCreateDialog={isOpenCreateDialog}
        handleOpenCreateDialog={handleOpenCreateDialog}
        data={newToeic}
        onChangeTitle={handleChangeTitle}
        onChangeDuration={handleChangeDuration}
        onCreateToeic={handleCreateToeic}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Global loading overlay for submissions */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}