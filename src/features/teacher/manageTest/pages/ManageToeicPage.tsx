import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import useManageToeicPage from "../hooks/useManageToeicPage";
import { Toeic } from "interfaces";

function ToeicTestCard({ test, onView, onEdit, onDelete }: { test: Toeic, onView: () => void, onEdit: () => void, onDelete: () => void }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" component="div" fontWeight="bold" sx={{ mb: 1 }}>
            {test.title}
          </Typography>
          <Chip
            label={test.status ? "Published" : "Draft"}
            color={test.status ? "success" : "default"}
            size="small"
          />
        </Box>
        
        <Stack spacing={1.5}>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Duration: {test.duration} minutes
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
            <QuizIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Questions: {test.totalQuestions}
            </Typography>
          </Box>
   
        </Stack>
      </CardContent>
      
      <Divider />
      
      <CardActions>
        <Button size="small" onClick={onView}>View</Button>
        <Button size="small" color="primary" onClick={onEdit}>Edit</Button>
        <Button size="small" color="error" onClick={onDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}



export default function ManageToeicPage() {
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

  const handleDeleteTest = (testId: number) => {
    if (window.confirm("Are you sure you want to delete this TOEIC test?")) {
      deleteToeicTest(testId);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Manage TOEIC Tests
        </Typography>
  

        {/* Search and filter controls */}
        <Grid container spacing={2} mb={4} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <SearchIcon color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter === undefined ? "all" : statusFilter ? "published" : "draft"}
                label="Status"
                onChange={(e) => handleStatusFilterChange(e.target.value as string)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth
            >
              Create New TOEIC Test
            </Button>
          </Grid>
        </Grid>

        {/* TOEIC test cards */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            {displayedToeicTests.length > 0 ? (
              <Grid container spacing={3} mb={4}>
                {displayedToeicTests.map((test) => (
                  <Grid item xs={12} sm={6} md={4} key={test.id}>
                    <ToeicTestCard
                      test={test}
                      onView={() => handleViewTest(test.id)}
                      onEdit={() => handleEditTest(test.id)}
                      onDelete={() => handleDeleteTest(test.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={200}
                mb={4}
              >
                <Typography variant="h6" color="text.secondary">
                  No TOEIC tests found matching your criteria
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Pagination */}
        {displayedToeicTests.length > 0 && (
          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Items per page */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Items per page</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              label="Items per page"
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
}