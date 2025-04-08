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
  Stack,
  Chip,
  Tabs,
  Tab
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useManageCompetitionsPage from "../hooks/useManageCompetitionsPage";
import { CompetitionTest } from "interfaces";
import { formatDate } from "utils/format";

function CompetitionCard({ competition }: { competition: CompetitionTest }) {
  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {competition.title}
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          <Chip
            size="small"
            label={competition.status ? "Active" : "Inactive"}
            color={competition.status ? "success" : "error"}
          />
          <Chip
            size="small"
            label={`${competition.totalQuestions || 0} Questions`}
            color="primary"
          />
          <Chip
            size="small"
            label={`${competition.duration} min`}
            color="secondary"
          />
        </Stack>
      </Box>
      <Box>
        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Start: {formatDate(competition.startTime)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              End: {formatDate(competition.endTime)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}

export default function ManageCompetitionsPage() {
  const {
    searchText,
    setSearchText,
    statusFilter,
    handleStatusFilterChange,
    competitions,
    page,
    itemsPerPage,
    handleSearch,
    handleChangePage,
    handleItemsPerPageChange,
    totalPages,
    displayedCompetitions,
    upcomingCompetitions,
    activeCompetitions,
    pastCompetitions
  } = useManageCompetitionsPage();

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box py={4}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Manage Competitions
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
                value={statusFilter}
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
              Create New Competition
            </Button>
          </Grid>
        </Grid>

        <Box mb={3}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`All (${competitions.length})`} />
            <Tab label={`Active (${activeCompetitions.length})`} />
            <Tab label={`Upcoming (${upcomingCompetitions.length})`} />
            <Tab label={`Past (${pastCompetitions.length})`} />
          </Tabs>
        </Box>

        {/* Competition cards */}
        <Box mb={4}>
          <Grid container spacing={3}>
            {displayedCompetitions.length > 0 ? (
              displayedCompetitions.map((competition) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={competition.id}>
                  <CompetitionCard competition={competition} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  p={4}
                >
                  <Typography variant="h6" color="textSecondary">
                    No competitions found matching your filters
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Box>

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